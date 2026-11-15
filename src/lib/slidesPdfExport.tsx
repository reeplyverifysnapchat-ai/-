import React from "react";
import { createRoot } from "react-dom/client";
import jsPDF from "jspdf";
import {
  buildPresentationSlidesData,
  SLIDE_HEIGHT_MM,
  SLIDE_HEIGHT_PX,
  SLIDE_WIDTH_MM,
  SLIDE_WIDTH_PX,
  validatePresentationSlidesData,
} from "@/lib/slidesData";
import { PresentationSlidesDocument } from "@/components/PresentationSlidesDocument";

export interface SlidesExportProgress {
  stage: "collecting" | "verifying" | "rendering" | "saving" | "done" | "error";
  message: string;
  currentSlide?: number;
  totalSlides?: number;
  errorMessage?: string;
}

const SLIDES_PDF_FILENAME = "CPF_Presentation_Slides.pdf";
const SLIDE_PIXEL_RATIO = 1.6;

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

async function extractArabicFontCss(): Promise<string> {
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

async function rasterizeSlideToDataUrl(
  slideEl: HTMLElement,
  embeddedCss: string,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): Promise<string> {
  const cloned = slideEl.cloneNode(true) as HTMLElement;
  cloned.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  const serializedNode = new XMLSerializer().serializeToString(cloned);

  const svgMarkup = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SLIDE_WIDTH_PX}" height="${SLIDE_HEIGHT_PX}" viewBox="0 0 ${SLIDE_WIDTH_PX} ${SLIDE_HEIGHT_PX}">`,
    `<foreignObject x="0" y="0" width="100%" height="100%">`,
    `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${SLIDE_WIDTH_PX}px;height:${SLIDE_HEIGHT_PX}px;background:#ffffff;font-family:'IBM Plex Sans Arabic',sans-serif;">`,
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
    img.onerror = () => reject(new Error("فشل تحميل شريحة العرض بصيغة SVG."));
    img.src = svgDataUrl;
  });

  const targetW = Math.round(SLIDE_WIDTH_PX * SLIDE_PIXEL_RATIO);
  const targetH = Math.round(SLIDE_HEIGHT_PX * SLIDE_PIXEL_RATIO);
  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, targetW, targetH);
  ctx.drawImage(img, 0, 0, targetW, targetH);

  return canvas.toDataURL("image/jpeg", 0.95);
}

export async function exportPresentationSlidesPdf(
  onProgress?: (p: SlidesExportProgress) => void,
): Promise<{ totalSlides: number }> {
  onProgress?.({
    stage: "collecting",
    message: "جارٍ تجميع بيانات النقاط الخمس لشرائح العرض...",
  });

  const slidesData = buildPresentationSlidesData();
  const validation = validatePresentationSlidesData(slidesData);
  if (!validation.valid) {
    throw new Error(`فشل التحقق من اكتمال بيانات الشرائح: ${validation.errors.join("، ")}`);
  }

  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.position = "fixed";
  host.style.left = "-100000px";
  host.style.top = "0";
  host.style.width = `${SLIDE_WIDTH_PX}px`;
  host.style.zIndex = "-1";
  host.style.pointerEvents = "none";
  host.style.backgroundColor = "#ffffff";
  document.body.appendChild(host);

  const root = createRoot(host);

  try {
    root.render(<PresentationSlidesDocument data={slidesData} />);
    await nextAnimationFrame();

    onProgress?.({
      stage: "verifying",
      message: "جارٍ التحقق من سلامة الشرائح وحدود العرض...",
    });

    const slideEls = Array.from(host.querySelectorAll("[data-pdf-slide]")) as HTMLElement[];
    if (slideEls.length !== 6) {
      throw new Error(`عدد الشرائح غير مكتمل (${slideEls.length} من 6).`);
    }

    const overflowSlides: number[] = [];
    slideEls.forEach((el) => {
      const slideNum = Number(el.getAttribute("data-pdf-slide") ?? "0");
      const bodyEl = el.querySelector('[data-pdf-slide-body="true"]') as HTMLElement | null;
      if (
        el.scrollWidth > el.clientWidth + 2 ||
        (bodyEl && (bodyEl.scrollHeight > bodyEl.clientHeight + 2 || bodyEl.scrollWidth > bodyEl.clientWidth + 2))
      ) {
        overflowSlides.push(slideNum);
      }
    });

    if (overflowSlides.length > 0) {
      throw new Error(`تجاوز محتوى داخل الشرائح: [${overflowSlides.join(", ")}]`);
    }

    const fontEmbedCss = await extractArabicFontCss();
    const baseResetCss = [
      "* { box-sizing: border-box; }",
      "body, div, span, p, h1, h2, h3 { font-family: 'IBM Plex Sans Arabic', sans-serif; }",
    ].join("\n");
    const embeddedSvgCss = `${fontEmbedCss}\n${baseResetCss}`;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [SLIDE_WIDTH_MM, SLIDE_HEIGHT_MM],
      compress: true,
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("تعذّر تهيئة سياق الرسم لإخراج شرائح العرض.");
    }

    for (let i = 0; i < slideEls.length; i++) {
      onProgress?.({
        stage: "rendering",
        message: `جارٍ إخراج شريحة العرض (${i + 1} من ${slideEls.length})...`,
        currentSlide: i + 1,
        totalSlides: slideEls.length,
      });
      await yieldToBrowser();

      const dataUrl = await rasterizeSlideToDataUrl(slideEls[i], embeddedSvgCss, canvas, ctx);
      if (i > 0) {
        pdf.addPage([SLIDE_WIDTH_MM, SLIDE_HEIGHT_MM], "landscape");
      }
      pdf.addImage(dataUrl, "JPEG", 0, 0, SLIDE_WIDTH_MM, SLIDE_HEIGHT_MM, undefined, "FAST");
    }

    onProgress?.({
      stage: "saving",
      message: `تم التحقق بنجاح! جارٍ تنزيل ${SLIDES_PDF_FILENAME}...`,
      currentSlide: slideEls.length,
      totalSlides: slideEls.length,
    });

    pdf.save(SLIDES_PDF_FILENAME);

    onProgress?.({
      stage: "done",
      message: `تم إنشاء وتنزيل شرائح العرض (${slideEls.length} شرائح عرض واسعة 16:9) بنجاح.`,
      currentSlide: slideEls.length,
      totalSlides: slideEls.length,
    });

    return { totalSlides: slideEls.length };
  } finally {
    root.unmount();
    if (host.parentNode) {
      host.parentNode.removeChild(host);
    }
  }
}
