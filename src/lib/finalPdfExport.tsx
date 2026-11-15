import React from "react";
import { createRoot } from "react-dom/client";
import jsPDF from "jspdf";
import {
  buildFinalReportData,
  FINAL_REPORT_SECTIONS,
  getRequiredContentAnchors,
  validateFinalReportSourceData,
} from "./finalReportData";
import {
  buildIntegrityReport,
  paginateMeasuredBlocks,
  type MeasuredBlock,
  type PdfIntegrityReport,
} from "./pdfPagination";
import {
  buildFinalPdfBlocks,
  PDF_PALETTE,
  type PdfBlockDef,
} from "@/components/FinalPdfReportBlocks";
import {
  A4_BLOCK_GAP,
  A4_CONTENT_MAX_HEIGHT,
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  ContentA4Page,
  CoverPage,
} from "@/components/FinalPdfReportDocument";

export type ExportStage =
  | "idle"
  | "collecting"
  | "paginating"
  | "verifying"
  | "rendering"
  | "saving"
  | "done"
  | "error";

export interface ExportProgress {
  stage: ExportStage;
  message: string;
  currentPage?: number;
  totalPages?: number;
  integrityReport?: PdfIntegrityReport;
  errorMessage?: string;
}

const FINAL_PDF_FILENAME = "CPF_Final_Project_Report.pdf";
const PAGES_PER_STRIP = 5;
const RENDER_PIXEL_RATIO = 1.5;

function yieldToBrowser(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

function nextAnimationFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += chunkSize) {
    parts.push(String.fromCharCode(...bytes.subarray(i, i + chunkSize)));
  }
  return btoa(parts.join(""));
}

async function extractCompactArabicFontCSS(): Promise<string> {
  const targetRules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSFontFaceRule) {
        const text = rule.cssText;
        const weightMatch = text.match(/font-weight\s*:\s*(\d+)/i);
        if (weightMatch && weightMatch[1] !== "400" && weightMatch[1] !== "700") {
          continue;
        }
        const hasUnicodeRange = /unicode-range\s*:/i.test(text);
        if (hasUnicodeRange && !/U\+06|U\+07|U\+FB|U\+FE|U\+0000-00FF|U\+0-FF/i.test(text)) {
          continue;
        }
        targetRules.push(text);
      }
    }
  }

  const inlined = await Promise.all(
    targetRules.map(async (ruleText) => {
      const urlMatch = ruleText.match(/url\((["']?)([^)"']+)\1\)/);
      if (!urlMatch) return ruleText;
      const rawUrl = urlMatch[2];
      if (rawUrl.startsWith("data:")) return ruleText;
      try {
        const resolved = new URL(rawUrl, window.location.href).href;
        const res = await fetch(resolved);
        if (!res.ok) return "";
        const buf = await res.arrayBuffer();
        const b64 = arrayBufferToBase64(buf);
        const mime = rawUrl.endsWith(".woff2")
          ? "font/woff2"
          : rawUrl.endsWith(".woff")
            ? "font/woff"
            : "font/ttf";
        return ruleText.replace(urlMatch[0], `url("data:${mime};base64,${b64}")`);
      } catch {
        return "";
      }
    }),
  );

  return inlined.filter(Boolean).join("\n");
}

async function rasterizeStripToCanvas(
  stripEl: HTMLElement,
  stripPageCount: number,
  embeddedCss: string,
  stripCanvas: HTMLCanvasElement,
  stripCtx: CanvasRenderingContext2D,
): Promise<void> {
  const stripHeightPx = stripPageCount * A4_HEIGHT_PX;
  const cloned = stripEl.cloneNode(true) as HTMLElement;
  cloned.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  const serializedNode = new XMLSerializer().serializeToString(cloned);

  const svgMarkup = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${A4_WIDTH_PX}" height="${stripHeightPx}" viewBox="0 0 ${A4_WIDTH_PX} ${stripHeightPx}">`,
    `<foreignObject x="0" y="0" width="100%" height="100%">`,
    `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${A4_WIDTH_PX}px;height:${stripHeightPx}px;background:#ffffff;font-family:'IBM Plex Sans Arabic',sans-serif;">`,
    `<style>${embeddedCss}</style>`,
    serializedNode,
    `</div>`,
    `</foreignObject>`,
    `</svg>`,
  ].join("");

  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;

  const img = new Image();
  img.decoding = "sync";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("فشل تحميل شريط صفحات A4 بصيغة SVG."));
    img.src = svgDataUrl;
  });

  const targetW = Math.round(A4_WIDTH_PX * RENDER_PIXEL_RATIO);
  const targetH = Math.round(stripHeightPx * RENDER_PIXEL_RATIO);
  if (stripCanvas.width !== targetW || stripCanvas.height !== targetH) {
    stripCanvas.width = targetW;
    stripCanvas.height = targetH;
  }

  stripCtx.fillStyle = "#ffffff";
  stripCtx.fillRect(0, 0, targetW, targetH);
  stripCtx.drawImage(img, 0, 0, targetW, targetH);
}

/**
 * Full end-to-end export pipeline:
 * 1. Read live data from all 9 sections
 * 2. Validate source data completeness
 * 3. Measure each atomic editorial block at exact A4 content width
 * 4. Paginate blocks into independent A4 pages (zero split paragraphs/tables, zero orphaned headings)
 * 5. Render Cover Page + all A4 pages & verify DOM integrity, overflow, order, and content anchors
 * 6. Embed Arabic fonts cleanly and render high-DPI A4 portrait pages into CPF_Final_Project_Report.pdf
 */
export async function exportFinalProjectReportPdf(
  onProgress?: (p: ExportProgress) => void,
): Promise<PdfIntegrityReport> {
  const reportData = buildFinalReportData();

  onProgress?.({
    stage: "collecting",
    message: "جارٍ تجميع بيانات الأقسام الثمانية من مصادرها الفعلية...",
  });

  const sourceValidation = validateFinalReportSourceData(reportData);
  if (!sourceValidation.valid) {
    throw new Error(`فشل التحقق من اكتمال بيانات التقرير: ${sourceValidation.errors.join("، ")}`);
  }

  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const allBlocks = buildFinalPdfBlocks(reportData);
  const blockMap = new Map<string, PdfBlockDef>(allBlocks.map((b) => [b.id, b]));

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.position = "fixed";
  host.style.left = "-100000px";
  host.style.top = "0";
  host.style.width = `${A4_WIDTH_PX}px`;
  host.style.zIndex = "-1";
  host.style.pointerEvents = "none";
  host.style.backgroundColor = "#ffffff";
  document.body.appendChild(host);

  const root = createRoot(host);

  try {
    onProgress?.({
      stage: "paginating",
      message: "جارٍ قياس الكتل وتوزيع صفحات A4 وضبط الجداول والفقرات...",
    });

    // Pass 1: Measure every atomic block at exact Landscape A4 inner column width (1123 - 88 = 1035px)
    const measureContentWidth = A4_WIDTH_PX - 88;
    root.render(
      <div
        dir="rtl"
        style={{
          width: `${measureContentWidth}px`,
          fontFamily: '"IBM Plex Sans Arabic", sans-serif',
          backgroundColor: PDF_PALETTE.white,
          display: "flex",
          flexDirection: "column",
          gap: `${A4_BLOCK_GAP}px`,
        }}
      >
        {allBlocks.map((b) => (
          <div key={b.id} data-measure-id={b.id} style={{ width: "100%" }}>
            {b.render()}
          </div>
        ))}
      </div>,
    );

    await nextAnimationFrame();

    const measuredBlocks: MeasuredBlock[] = allBlocks.map((b) => {
      const el = host.querySelector(`[data-measure-id="${b.id}"]`) as HTMLElement | null;
      const height = el ? Math.ceil(el.getBoundingClientRect().height) : 120;
      return {
        id: b.id,
        sectionIndex: b.sectionIndex,
        sectionTitle: b.sectionTitle,
        height,
        keepWithNext: b.keepWithNext,
        startsNewSection: b.startsNewSection,
      };
    });

    const pagination = paginateMeasuredBlocks(
      measuredBlocks,
      A4_CONTENT_MAX_HEIGHT,
      A4_BLOCK_GAP,
      1, // cover page
    );

    type PageRenderSpec =
      | { kind: "cover"; overallPageNumber: number }
      | {
          kind: "content";
          overallPageNumber: number;
          page: (typeof pagination.pages)[number];
        };

    const allPageSpecs: PageRenderSpec[] = [
      { kind: "cover", overallPageNumber: 1 },
      ...pagination.pages.map((p) => ({
        kind: "content" as const,
        overallPageNumber: p.pageNumber + 1,
        page: p,
      })),
    ];

    const strips: PageRenderSpec[][] = [];
    for (let i = 0; i < allPageSpecs.length; i += PAGES_PER_STRIP) {
      strips.push(allPageSpecs.slice(i, i + PAGES_PER_STRIP));
    }

    // Pass 2: Render Cover Page + all discrete A4 Portrait Pages grouped in 3-page strips
    root.render(
      <div
        dir="rtl"
        style={{
          width: `${A4_WIDTH_PX}px`,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {strips.map((strip, stripIdx) => (
          <div
            key={stripIdx}
            data-pdf-strip={stripIdx}
            data-strip-count={strip.length}
            style={{
              width: `${A4_WIDTH_PX}px`,
              height: `${strip.length * A4_HEIGHT_PX}px`,
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {strip.map((spec) =>
              spec.kind === "cover" ? (
                <CoverPage key="cover" data={reportData} pagination={pagination} />
              ) : (
                <ContentA4Page
                  key={spec.page.pageNumber}
                  overallPageNumber={spec.overallPageNumber}
                  totalPdfPages={pagination.totalPdfPages}
                  sectionIndex={spec.page.sectionIndex}
                  sectionTitle={spec.page.sectionTitle}
                  blocks={spec.page.blockIds.map((id) => blockMap.get(id)!).filter(Boolean)}
                />
              ),
            )}
          </div>
        ))}
      </div>,
    );

    await nextAnimationFrame();

    onProgress?.({
      stage: "verifying",
      message: "جارٍ التحقق التلقائي من اكتمال الأقسام الثمانية وسلامة حدود الصفحات...",
    });

    // Automated Pre-Download Quality Verification on rendered A4 pages
    const pageEls = Array.from(host.querySelectorAll("[data-pdf-page]")) as HTMLElement[];
    const emptyPageCount = pageEls.filter((el) => (el.textContent ?? "").trim().length === 0).length;

    const horizontalOverflowPages: number[] = [];
    const verticalOverflowPages: number[] = [];

    pageEls.forEach((pageEl) => {
      const pageNum = Number(pageEl.getAttribute("data-pdf-page") ?? "0");
      if (pageEl.scrollWidth > pageEl.clientWidth + 2) {
        horizontalOverflowPages.push(pageNum);
      }
      const contentBox = pageEl.querySelector('[data-pdf-content-box="true"]') as HTMLElement | null;
      if (contentBox && contentBox.scrollHeight > contentBox.clientHeight + 2) {
        verticalOverflowPages.push(pageNum);
      }
    });

    const seenSectionTitles: string[] = [];
    pageEls.forEach((el) => {
      const title = el.getAttribute("data-pdf-section-title");
      if (title && seenSectionTitles[seenSectionTitles.length - 1] !== title) {
        if (!seenSectionTitles.includes(title)) {
          seenSectionTitles.push(title);
        }
      }
    });

    const fullRenderedText = host.textContent ?? "";
    const requiredAnchors = getRequiredContentAnchors(reportData);
    const missingAnchors = requiredAnchors.filter((anchor) => !fullRenderedText.includes(anchor));

    const integrityReport = buildIntegrityReport({
      sectionCount: seenSectionTitles.length,
      expectedSectionTitles: FINAL_REPORT_SECTIONS.map((s) => s.title),
      renderedSectionTitles: seenSectionTitles,
      totalPdfPages: pageEls.length,
      emptyPageCount,
      horizontalOverflowPages,
      verticalOverflowPages,
      missingAnchors,
    });

    if (!integrityReport.passed) {
      const failedDetails = integrityReport.checks
        .filter((c) => !c.passed)
        .map((c) => `${c.label}: ${c.detail}`)
        .join(" | ");
      throw new Error(`تعذّر اجتياز فحص الجودة التلقائي: ${failedDetails}`);
    }

    const fontEmbedCSS = await extractCompactArabicFontCSS();
    const baseResetCss = [
      "* { box-sizing: border-box; }",
      "body, div, span, p, h1, h2, h3, h4, blockquote, table, th, td { font-family: 'IBM Plex Sans Arabic', sans-serif; }",
      "table { border-collapse: collapse; }",
    ].join("\n");
    const embeddedSvgCss = `${fontEmbedCSS}\n${baseResetCss}`;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const stripEls = Array.from(host.querySelectorAll("[data-pdf-strip]")) as HTMLElement[];
    const pageW = Math.round(A4_WIDTH_PX * RENDER_PIXEL_RATIO);
    const pageH = Math.round(A4_HEIGHT_PX * RENDER_PIXEL_RATIO);

    const stripCanvas = document.createElement("canvas");
    const stripCtx = stripCanvas.getContext("2d");
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = pageW;
    pageCanvas.height = pageH;
    const pageCtx = pageCanvas.getContext("2d");

    if (!stripCtx || !pageCtx) {
      throw new Error("تعذّر تهيئة سياق الرسم الثنائي لإخراج صفحات التقرير.");
    }

    let renderedCount = 0;

    for (let sIdx = 0; sIdx < stripEls.length; sIdx++) {
      const stripEl = stripEls[sIdx];
      const stripPageCount = Number(stripEl.getAttribute("data-strip-count") ?? "1");

      onProgress?.({
        stage: "rendering",
        message: `جارٍ إخراج صفحات التقرير بدقة طباعة احترافية (${Math.min(
          renderedCount + 1,
          pageEls.length,
        )} من ${pageEls.length})...`,
        currentPage: Math.min(renderedCount + 1, pageEls.length),
        totalPages: pageEls.length,
        integrityReport,
      });
      await yieldToBrowser();

      await rasterizeStripToCanvas(
        stripEl,
        stripPageCount,
        embeddedSvgCss,
        stripCanvas,
        stripCtx,
      );

      for (let subIdx = 0; subIdx < stripPageCount; subIdx++) {
        pageCtx.fillStyle = "#ffffff";
        pageCtx.fillRect(0, 0, pageW, pageH);
        pageCtx.drawImage(
          stripCanvas,
          0,
          subIdx * pageH,
          pageW,
          pageH,
          0,
          0,
          pageW,
          pageH,
        );

        const pageDataUrl = pageCanvas.toDataURL("image/jpeg", 0.95);

        if (renderedCount > 0) {
          pdf.addPage("a4", "landscape");
        }
        pdf.addImage(pageDataUrl, "JPEG", 0, 0, 297, 210, undefined, "FAST");
        renderedCount += 1;
      }
    }

    if (pdf.getNumberOfPages() !== pageEls.length) {
      throw new Error("عدم تطابق عدد صفحات ملف PDF الناتج مع صفحات المعاينة.");
    }

    onProgress?.({
      stage: "saving",
      message: `تم التحقق بنجاح! جارٍ تنزيل ${FINAL_PDF_FILENAME}...`,
      currentPage: pageEls.length,
      totalPages: pageEls.length,
      integrityReport,
    });

    pdf.save(FINAL_PDF_FILENAME);

    onProgress?.({
      stage: "done",
      message: `تم إنشاء وتنزيل التقرير النهائي (${pageEls.length} صفحة A4 أفقية) بنجاح.`,
      currentPage: pageEls.length,
      totalPages: pageEls.length,
      integrityReport,
    });

    return integrityReport;
  } finally {
    root.unmount();
    if (host.parentNode) {
      host.parentNode.removeChild(host);
    }
  }
}
