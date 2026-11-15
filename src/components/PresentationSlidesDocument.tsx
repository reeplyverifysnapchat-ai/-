import React from "react";
import { PDF_PALETTE } from "@/components/FinalPdfReportBlocks";
import {
  SLIDE_HEIGHT_PX,
  SLIDE_WIDTH_PX,
  type PresentationSlidesData,
} from "@/lib/slidesData";

const SLIDE_ACCENT_GREEN = "#659B1B";

function SlideShell({
  slideNumber,
  totalSlides,
  pointNum,
  arTitle,
  enTitle,
  children,
}: {
  slideNumber: number;
  totalSlides: number;
  pointNum?: number;
  arTitle: string;
  enTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-pdf-slide={slideNumber}
      dir="rtl"
      style={{
        width: `${SLIDE_WIDTH_PX}px`,
        height: `${SLIDE_HEIGHT_PX}px`,
        backgroundColor: PDF_PALETTE.white,
        fontFamily: '"IBM Plex Sans Arabic", sans-serif',
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Slide Header */}
      <header
        style={{
          height: "86px",
          backgroundColor: PDF_PALETTE.greenDark,
          color: PDF_PALETTE.white,
          borderBottom: `5px solid ${PDF_PALETTE.gold}`,
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          {pointNum !== undefined && (
            <span
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "999px",
                backgroundColor: SLIDE_ACCENT_GREEN,
                color: PDF_PALETTE.white,
                fontSize: "24px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontVariantNumeric: "tabular-nums",
                boxShadow: "0 0 0 3px rgba(255,255,255,0.22)",
              }}
            >
              {pointNum}
            </span>
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: 700,
                color: PDF_PALETTE.white,
                lineHeight: 1.25,
              }}
            >
              {arTitle}
            </h1>
            <span
              dir="ltr"
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#B4E37D",
              }}
            >
              {enTitle}
            </span>
          </div>
        </div>

        <span
          dir={slideNumber === 1 ? "rtl" : "ltr"}
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#E8D5AA",
          }}
        >
          {slideNumber === 1 ? "ملخص تنفيذي · 5 محاور" : "Collection Persona Framework™"}
        </span>
      </header>

      {/* Slide Content Body */}
      <main
        data-pdf-slide-body="true"
        style={{
          flex: 1,
          padding: "20px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "14px",
          overflow: "hidden",
          boxSizing: "border-box",
          backgroundColor: "#FBFCFB",
        }}
      >
        {children}
      </main>

      {/* Slide Footer */}
      <footer
        style={{
          height: "44px",
          padding: "0 48px",
          borderTop: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "14.5px",
          color: PDF_PALETTE.inkMuted,
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>ملف النموذج الأولي · Collection Persona Framework™</span>
        <span style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>
          شريحة {slideNumber} من {totalSlides}
        </span>
      </footer>
    </div>
  );
}

export function PresentationSlidesDocument({ data }: { data: PresentationSlidesData }) {
  const totalSlides = 6;
  const { source } = data;

  const agendaSummaries = [
    "تحديد الإجراء التحصيلي الأنسب لكل عميل بناءً على تحليل سبعة أبعاد وشخصيات التحصيل",
    "الهدف الرئيسي: إتمام 80% على الأقل من المهام دون مساعدة، ومعدل لا يقل عن 4 من 5 للمؤشرات الداعمة",
    "منهجية تكاملية: استبيان إلكتروني (19 مشاركاً) + اختبار استخدام موجّه (3 أخصائيين / 9 محاولات)",
    "تحققت وتجاوزت جميع الأهداف: 88.89% نجاح المهام · 4.37/5 فائدة الأبعاد · 4.16/5 أهمية المبررات",
    "الاحتفاظ بالفكرة مع إبراز مبررات التصنيف أعلى الشاشة وربطها مباشرة بالتوصية NBCA",
  ];

  return (
    <div dir="rtl" style={{ display: "flex", flexDirection: "column" }}>
      {/* SLIDE 1: Cover & 5 Key Points Roadmap */}
      <SlideShell
        slideNumber={1}
        totalSlides={totalSlides}
        arTitle="ملف النموذج الأولي"
        enTitle="Collection Persona Framework™"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}>
          {data.points.map((pt, idx) => (
            <div
              key={pt.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
                backgroundColor: PDF_PALETTE.white,
                borderRadius: "14px",
                padding: "11px 18px",
              }}
            >
              <span
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "999px",
                  backgroundColor: SLIDE_ACCENT_GREEN,
                  color: PDF_PALETTE.white,
                  fontSize: "24px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pt.num}
              </span>

              <div
                style={{
                  minWidth: "280px",
                  backgroundColor: PDF_PALETTE.greenDark,
                  color: PDF_PALETTE.white,
                  borderRadius: "999px",
                  padding: "10px 26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "22px", fontWeight: 700 }}>{pt.arTitle}</span>
                <span dir="ltr" style={{ fontSize: "15.5px", fontWeight: 600, color: "#B4E37D" }}>
                  {pt.enTitle}
                </span>
              </div>

              <div
                style={{
                  fontSize: "17.5px",
                  fontWeight: 600,
                  color: PDF_PALETTE.ink,
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                {agendaSummaries[idx]}
              </div>
            </div>
          ))}
        </div>
      </SlideShell>

      {/* SLIDE 2: Point 1 - الفرضية (Hypothesis) */}
      <SlideShell
        slideNumber={2}
        totalSlides={totalSlides}
        pointNum={1}
        arTitle="الفرضية"
        enTitle="Hypothesis"
      >
        <div
          style={{
            border: `2px solid ${PDF_PALETTE.goldBorder}`,
            backgroundColor: PDF_PALETTE.goldLight,
            borderRadius: "16px",
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: PDF_PALETTE.greenDark,
              marginBottom: "10px",
            }}
          >
            {source.sec1Hypothesis.hypothesisBadge}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "23px",
              fontWeight: 600,
              lineHeight: 1.72,
              color: PDF_PALETTE.ink,
            }}
          >
            {source.sec1Hypothesis.hypothesisText}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: "18px" }}>
          <div
            style={{
              border: `1.5px solid ${PDF_PALETTE.border}`,
              backgroundColor: PDF_PALETTE.white,
              borderRadius: "14px",
              padding: "20px 24px",
            }}
          >
            <div style={{ fontSize: "16.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "8px" }}>
              {source.sec1Hypothesis.ideaBadge}
            </div>
            <p style={{ margin: 0, fontSize: "18.5px", lineHeight: 1.7, color: PDF_PALETTE.ink }}>
              <b style={{ color: PDF_PALETTE.greenDark }}>{source.sec1Hypothesis.ideaPrefix}</b>
              {source.sec1Hypothesis.ideaBodyBeforeContext}
              <span dir="ltr" style={{ fontWeight: 700 }}>
                {source.sec1Hypothesis.ideaContextTerm}
              </span>
              {source.sec1Hypothesis.ideaMiddle}
              <b style={{ color: PDF_PALETTE.greenDark }}>
                {source.sec1Hypothesis.ideaNbcaTitle}
                <span dir="ltr">{source.sec1Hypothesis.ideaNbcaTerm}</span>
              </b>
              {source.sec1Hypothesis.ideaReasonLead}
              <span dir="ltr" style={{ fontWeight: 700 }}>
                {source.sec1Hypothesis.ideaReasonTerm}
              </span>
              {source.sec1Hypothesis.ideaEnding}
            </p>
          </div>

          <div
            style={{
              border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
              backgroundColor: PDF_PALETTE.greenTint,
              borderRadius: "14px",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "16.5px", fontWeight: 700, color: PDF_PALETTE.inkMuted, marginBottom: "8px" }}>
              {source.sec1Hypothesis.targetSegmentLabel}
            </div>
            <p style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.65 }}>
              {source.sec1Hypothesis.targetSegmentPrimary}
            </p>
            <p style={{ margin: "6px 0 0 0", fontSize: "17px", color: PDF_PALETTE.inkMuted, lineHeight: 1.55 }}>
              {source.sec1Hypothesis.targetSegmentSecondary}
            </p>
          </div>
        </div>
      </SlideShell>

      {/* SLIDE 3: Point 2 - المؤشر والهدف (KPI and target) */}
      <SlideShell
        slideNumber={3}
        totalSlides={totalSlides}
        pointNum={2}
        arTitle="المؤشر والهدف"
        enTitle="KPI and target"
      >
        {/* Headline KPI Card */}
        <div
          style={{
            border: `2px solid ${PDF_PALETTE.greenDark}`,
            backgroundColor: PDF_PALETTE.white,
            borderRadius: "16px",
            padding: "22px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span
                style={{
                  backgroundColor: PDF_PALETTE.greenDark,
                  color: PDF_PALETTE.white,
                  fontSize: "15.5px",
                  fontWeight: 700,
                  padding: "4px 14px",
                  borderRadius: "6px",
                }}
              >
                {source.sec2Kpis.headline.badge}
              </span>
              <span
                style={{
                  backgroundColor: PDF_PALETTE.successBg,
                  color: PDF_PALETTE.successText,
                  fontSize: "15.5px",
                  fontWeight: 700,
                  padding: "4px 14px",
                  borderRadius: "6px",
                }}
              >
                {source.sec2Kpis.headline.tag}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "23px", fontWeight: 700, color: PDF_PALETTE.ink, lineHeight: 1.55 }}>
              {source.sec2Kpis.headline.name}
            </p>
          </div>

          <div
            style={{
              backgroundColor: PDF_PALETTE.greenTint,
              border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
              borderRadius: "14px",
              padding: "16px 24px",
              textAlign: "center",
              minWidth: "280px",
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.inkMuted, marginBottom: "4px" }}>
              {source.sec2Kpis.headline.targetLabel}
            </div>
            <div style={{ fontSize: "26px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
              {source.sec2Kpis.headline.target}
            </div>
          </div>
        </div>

        {/* Supporting KPIs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          {source.sec2Kpis.supporting.map((kpi) => (
            <div
              key={kpi.en}
              style={{
                border: `1.5px solid ${PDF_PALETTE.border}`,
                backgroundColor: PDF_PALETTE.white,
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span
                    style={{
                      backgroundColor: PDF_PALETTE.greenTint,
                      color: PDF_PALETTE.greenDark,
                      fontSize: "15px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    {kpi.badge}
                  </span>
                  <span dir="ltr" style={{ fontSize: "14.5px", color: PDF_PALETTE.inkLight, fontWeight: 600 }}>
                    {kpi.en}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "19.5px", fontWeight: 700, color: PDF_PALETTE.ink, lineHeight: 1.6 }}>
                  {kpi.name}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: PDF_PALETTE.surface,
                  border: `1px solid ${PDF_PALETTE.border}`,
                  borderRadius: "10px",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "15px", color: PDF_PALETTE.inkMuted, fontWeight: 600 }}>
                  {kpi.targetLabel}:
                </span>
                <span style={{ fontSize: "20px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                  {kpi.target}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SlideShell>

      {/* SLIDE 4: Point 3 - الطريقة والعينة (Method and sample) */}
      <SlideShell
        slideNumber={4}
        totalSlides={totalSlides}
        pointNum={3}
        arTitle="الطريقة والعينة"
        enTitle="Method and sample"
      >
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "20px" }}>
          {/* Methodology Column */}
          <div
            style={{
              border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
              backgroundColor: PDF_PALETTE.white,
              borderRadius: "16px",
              padding: "20px 22px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1.5px solid ${PDF_PALETTE.border}`, paddingBottom: "10px" }}>
              <span style={{ fontSize: "21px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                الطريقة ({source.sec3MethodSample.methodologyTag})
              </span>
              <span dir="ltr" style={{ fontSize: "15px", fontWeight: 600, color: PDF_PALETTE.inkLight }}>
                Methodology
              </span>
            </div>

            {source.sec3MethodSample.methods.map((m) => (
              <div
                key={m.title}
                style={{
                  border: `1px solid ${PDF_PALETTE.border}`,
                  backgroundColor: PDF_PALETTE.surface,
                  borderRadius: "12px",
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ fontSize: "14.5px", fontWeight: 700, color: PDF_PALETTE.gold }}>{m.kicker}</div>
                <div style={{ fontSize: "18.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.4 }}>
                  {m.title}
                </div>
                <div style={{ fontSize: "16.5px", color: PDF_PALETTE.ink, lineHeight: 1.55 }}>
                  <b>{m.toolLabel}</b> {m.toolText}
                </div>
                <div style={{ fontSize: "16px", color: PDF_PALETTE.inkMuted, lineHeight: 1.55 }}>
                  <b>{m.goalLabel}</b> {m.goalText}
                </div>
              </div>
            ))}
          </div>

          {/* Sample Column */}
          <div
            style={{
              border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
              backgroundColor: PDF_PALETTE.white,
              borderRadius: "16px",
              padding: "20px 22px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1.5px solid ${PDF_PALETTE.border}`, paddingBottom: "10px" }}>
              <span style={{ fontSize: "21px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                العينة المعتمدة
              </span>
              <span dir="ltr" style={{ fontSize: "15px", fontWeight: 600, color: PDF_PALETTE.inkLight }}>
                Sample
              </span>
            </div>

            {/* Usability Sample Card */}
            <div
              style={{
                border: `1px solid ${PDF_PALETTE.greenBorder}`,
                backgroundColor: PDF_PALETTE.greenTint,
                borderRadius: "12px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ fontSize: "18.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                {source.sec3MethodSample.usabilitySample.title}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", textAlign: "center" }}>
                {source.sec3MethodSample.usabilitySample.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      backgroundColor: PDF_PALETTE.white,
                      border: `1px solid ${PDF_PALETTE.border}`,
                      borderRadius: "8px",
                      padding: "8px 4px",
                    }}
                  >
                    <div style={{ fontSize: "26px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{metric.value}</div>
                    <div style={{ fontSize: "14px", color: PDF_PALETTE.inkMuted, fontWeight: 600 }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Survey Sample Card */}
            <div
              style={{
                border: `1px solid ${PDF_PALETTE.greenBorder}`,
                backgroundColor: PDF_PALETTE.greenTint,
                borderRadius: "12px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "18.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                  {source.sec3MethodSample.surveySample.title}
                </span>
                <span
                  style={{
                    backgroundColor: PDF_PALETTE.successBg,
                    color: PDF_PALETTE.successText,
                    fontSize: "14.5px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "5px",
                  }}
                >
                  {source.sec3MethodSample.surveySample.badge}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "16.5px", color: PDF_PALETTE.ink, lineHeight: 1.6 }}>
                {source.sec3MethodSample.surveySample.description}
              </p>
            </div>
          </div>
        </div>
      </SlideShell>

      {/* SLIDE 5: Point 4 - النتيجة مقابل الهدف (Result against target) */}
      <SlideShell
        slideNumber={5}
        totalSlides={totalSlides}
        pointNum={4}
        arTitle="النتيجة مقابل الهدف"
        enTitle="Result against target"
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {source.sec7ResultVsTarget.cards.map((card, idx) => (
            <div
              key={card.title}
              style={{
                border: idx === 0 ? `2px solid ${PDF_PALETTE.greenDark}` : `1.5px solid ${PDF_PALETTE.border}`,
                backgroundColor: PDF_PALETTE.white,
                borderRadius: "14px",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: PDF_PALETTE.greenTint,
                    color: PDF_PALETTE.greenDark,
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: "5px",
                    marginBottom: "6px",
                  }}
                >
                  {card.badge}
                </span>
                <div style={{ fontSize: "18.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.35, marginBottom: "10px" }}>
                  {card.title}
                </div>

                <div
                  style={{
                    backgroundColor: PDF_PALETTE.successBg,
                    border: `1px solid ${PDF_PALETTE.greenBorder}`,
                    borderRadius: "10px",
                    padding: "10px 12px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "13.5px", color: PDF_PALETTE.inkMuted, fontWeight: 600 }}>النتيجة الفعلية</div>
                  <div dir="ltr" style={{ fontSize: "30px", fontWeight: 700, color: PDF_PALETTE.successText, margin: "1px 0" }}>
                    {card.actualMetric}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: PDF_PALETTE.ink }}>
                    مقابل الهدف: <span dir="ltr">{card.targetMetric}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p style={{ margin: 0, fontSize: "15.5px", color: PDF_PALETTE.ink, lineHeight: 1.5 }}>
                  {card.summary}
                </p>
                <div
                  style={{
                    backgroundColor: PDF_PALETTE.successBg,
                    border: `1px solid ${PDF_PALETTE.greenBorder}`,
                    borderRadius: "8px",
                    padding: "7px 10px",
                    fontSize: "14.5px",
                    fontWeight: 700,
                    color: PDF_PALETTE.successText,
                    textAlign: "center",
                  }}
                >
                  ✓ {card.statusLine}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            border: `1.5px solid ${PDF_PALETTE.goldBorder}`,
            backgroundColor: PDF_PALETTE.goldLight,
            borderRadius: "12px",
            padding: "11px 18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              backgroundColor: PDF_PALETTE.warnBg,
              color: PDF_PALETTE.warnText,
              fontSize: "14.5px",
              fontWeight: 700,
              padding: "4px 11px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {source.sec7ResultVsTarget.patternSectionBadge}
          </span>
          <span style={{ fontSize: "16.5px", fontWeight: 600, color: PDF_PALETTE.ink, lineHeight: 1.45 }}>
            {source.sec7ResultVsTarget.patternParagraphs[1]}
          </span>
        </div>
      </SlideShell>

      {/* SLIDE 6: Point 5 - القرار (Decision) */}
      <SlideShell
        slideNumber={6}
        totalSlides={totalSlides}
        pointNum={5}
        arTitle="القرار"
        enTitle="Decision"
      >
        <div
          style={{
            border: `2px solid ${PDF_PALETTE.greenDark}`,
            backgroundColor: PDF_PALETTE.white,
            borderRadius: "18px",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1.5px solid ${PDF_PALETTE.border}`, paddingBottom: "14px" }}>
            <span style={{ backgroundColor: PDF_PALETTE.greenDark, color: PDF_PALETTE.white, fontSize: "17.5px", fontWeight: 700, padding: "7px 18px", borderRadius: "8px" }}>
              ✓ {source.sec9FinalDecision.approvedBadge}
            </span>
            <span style={{ backgroundColor: PDF_PALETTE.successBg, color: PDF_PALETTE.successText, fontSize: "17.5px", fontWeight: 700, padding: "7px 18px", borderRadius: "8px" }}>
              {source.sec9FinalDecision.statusBadge}
            </span>
          </div>

          <div
            style={{
              border: `1.5px solid ${PDF_PALETTE.goldBorder}`,
              backgroundColor: PDF_PALETTE.goldLight,
              borderRadius: "14px",
              padding: "22px 26px",
            }}
          >
            <p style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.75 }}>
              {source.sec9FinalDecision.decisionQuote}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            {source.sec9FinalDecision.pillars.map((pillar) => (
              <div
                key={pillar.badge}
                style={{
                  border: `1px solid ${PDF_PALETTE.border}`,
                  backgroundColor: PDF_PALETTE.surface,
                  borderRadius: "12px",
                  padding: "16px 18px",
                }}
              >
                <div style={{ fontSize: "17.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "8px" }}>
                  {pillar.badge}
                </div>
                <p style={{ margin: 0, fontSize: "16.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.65 }}>
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    </div>
  );
}
