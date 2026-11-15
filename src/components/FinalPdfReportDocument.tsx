import React from "react";
import type { FinalReportData } from "@/lib/finalReportData";
import type { PaginationResult } from "@/lib/pdfPagination";
import { PDF_PALETTE, type PdfBlockDef } from "./FinalPdfReportBlocks";

export const A4_WIDTH_PX = 1123; // 297mm @ 96dpi (Landscape)
export const A4_HEIGHT_PX = 794; // 210mm @ 96dpi (Landscape)
export const A4_CONTENT_MAX_HEIGHT = 648; // safe height: 794 - 56 (header) - 48 (footer) - 28 (padding) - 14 (safety)
export const A4_BLOCK_GAP = 14;

export function CoverPage({
  data,
  pagination,
}: {
  data: FinalReportData;
  pagination: PaginationResult;
}) {
  return (
    <div
      data-pdf-page="1"
      data-pdf-cover="true"
      dir="rtl"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        backgroundColor: PDF_PALETTE.white,
        fontFamily: '"IBM Plex Sans Arabic", sans-serif',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Architectural Green & Gold Masthead */}
      <div
        style={{
          backgroundColor: PDF_PALETTE.greenDark,
          color: PDF_PALETTE.white,
          padding: "28px 48px",
          borderBottom: `5px solid ${PDF_PALETTE.gold}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "38px",
            fontWeight: 700,
            lineHeight: 1.35,
            color: PDF_PALETTE.white,
          }}
        >
          ملف النموذج الأولي{" "}
          <span
            dir="ltr"
            style={{
              unicodeBidi: "isolate",
              display: "inline-block",
              color: "#E8D5AA",
            }}
          >
            {data.projectTitleEn}
          </span>
        </h1>
      </div>

      {/* Middle Body: Key Verified KPIs + 2-Column Table of Contents */}
      <div
        style={{
          padding: "16px 48px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Executive Verified Highlights Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
          }}
        >
          {[
            { label: "نجاح المهام دون مساعدة", value: "88.89%", sub: "8 من 9 (الهدف 80%)" },
            { label: "فائدة الأبعاد السبعة", value: "4.37 / 5", sub: "84.2% تقييم إيجابي" },
            { label: "أهمية مبررات التصنيف", value: "4.16 / 5", sub: "89.5% تقييم إيجابي" },
            { label: "عينة الاستبيان المكتملة", value: "19 مشاركاً", sub: "نسبة إكمال 100%" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                border: `1px solid ${PDF_PALETTE.greenBorder}`,
                backgroundColor: PDF_PALETTE.greenTint,
                borderRadius: "8px",
                padding: "9px 12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted, fontWeight: 600 }}>
                {stat.label}
              </div>
              <div
                dir="ltr"
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: PDF_PALETTE.greenDark,
                  margin: "2px 0",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "13.5px", color: PDF_PALETTE.inkLight }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Table of Contents (2 Columns for Landscape) */}
        <div
          style={{
            border: `1px solid ${PDF_PALETTE.border}`,
            borderRadius: "10px",
            padding: "14px 18px",
            backgroundColor: PDF_PALETTE.surface,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `2px solid ${PDF_PALETTE.greenDark}`,
              paddingBottom: "8px",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontSize: "18.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
              فهرس أقسام التقرير النهائي (الأقسام الثمانية الكاملة)
            </span>
            <span style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.gold }}>
              إجمالي الصفحات: {pagination.totalPdfPages} صفحة A4 أفقية
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 14px",
            }}
          >
            {data.sections.map((sec) => {
              const startPage = pagination.sectionStartPage[sec.index] ?? "—";
              return (
                <div
                  key={sec.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    backgroundColor: PDF_PALETTE.white,
                    border: `1px solid ${PDF_PALETTE.border}`,
                    borderRadius: "7px",
                    fontSize: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "6px",
                        backgroundColor: PDF_PALETTE.greenDark,
                        color: PDF_PALETTE.white,
                        fontSize: "15.5px",
                        fontWeight: 700,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {sec.index}
                    </span>
                    <span style={{ fontWeight: 700, color: PDF_PALETTE.ink }}>
                      قسم {sec.title}
                    </span>
                    <span dir="ltr" style={{ fontSize: "13.5px", color: PDF_PALETTE.inkLight }}>
                      ({sec.enTitle})
                    </span>
                  </div>
                  <span
                    style={{
                      fontWeight: 700,
                      color: PDF_PALETTE.greenDark,
                      fontSize: "15.5px",
                      fontVariantNumeric: "tabular-nums",
                      flexShrink: 0,
                      marginRight: "8px",
                    }}
                  >
                    صفحة {startPage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cover Footer */}
      <div
        style={{
          borderTop: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.surface,
          padding: "13px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "15px",
          color: PDF_PALETTE.inkMuted,
        }}
      >
        <div>
          <b style={{ color: PDF_PALETTE.greenDark }}>Collection Persona Framework™ (CPF)</b>
          <span style={{ margin: "0 8px", color: PDF_PALETTE.gold }}>|</span>
          <span>منهجية التحصيل المصرفي والتحليل السلوكي</span>
        </div>
        <div style={{ fontVariantNumeric: "tabular-nums" }}>
          تاريخ الإصدار: <b style={{ color: PDF_PALETTE.ink }}>{data.generatedAtFormatted}</b> · صفحة 1 من {pagination.totalPdfPages}
        </div>
      </div>
    </div>
  );
}

export function ContentA4Page({
  overallPageNumber,
  totalPdfPages,
  sectionIndex,
  sectionTitle,
  blocks,
}: {
  overallPageNumber: number;
  totalPdfPages: number;
  sectionIndex: number;
  sectionTitle: string;
  blocks: PdfBlockDef[];
}) {
  return (
    <div
      data-pdf-page={overallPageNumber}
      data-pdf-section-index={sectionIndex}
      data-pdf-section-title={sectionTitle}
      dir="rtl"
      style={{
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        backgroundColor: PDF_PALETTE.white,
        fontFamily: '"IBM Plex Sans Arabic", sans-serif',
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Editorial Running Header */}
      <header
        style={{
          height: "56px",
          padding: "0 44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1.5px solid ${PDF_PALETTE.greenBorder}`,
          backgroundColor: PDF_PALETTE.white,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              backgroundColor: PDF_PALETTE.gold,
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
            القسم {sectionIndex}: {sectionTitle}
          </span>
        </div>
        <span dir="ltr" style={{ fontSize: "14.5px", fontWeight: 600, color: PDF_PALETTE.inkLight }}>
          Collection Persona Framework™ (CPF) · Final Project Report
        </span>
      </header>

      {/* Main Content Box */}
      <main
        data-pdf-content-box="true"
        style={{
          flex: 1,
          padding: "14px 44px",
          display: "flex",
          flexDirection: "column",
          gap: `${A4_BLOCK_GAP}px`,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {blocks.map((block) => (
          <div key={block.id} data-pdf-block-id={block.id}>
            {block.render()}
          </div>
        ))}
      </main>

      {/* Editorial Running Footer */}
      <footer
        style={{
          height: "48px",
          padding: "0 44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.surface,
          fontSize: "14px",
          color: PDF_PALETTE.inkMuted,
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>التقرير النهائي لمشروع إطار عمل البرسونا (CPF™) — نسخة معتمدة للطباعة والعرض التنفيذي</span>
        <span style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>
          صفحة {overallPageNumber} من {totalPdfPages}
        </span>
      </footer>
    </div>
  );
}
