import React from "react";
import type { FinalReportData } from "@/lib/finalReportData";

export interface PdfBlockDef {
  id: string;
  sectionIndex: number; // 1..8
  sectionTitle: string;
  keepWithNext?: boolean;
  startsNewSection?: boolean;
  render: () => React.ReactNode;
}

export const PDF_PALETTE = {
  greenDark: "#004B35",
  greenDeep: "#013828",
  greenMid: "#006648",
  greenTint: "#F1F7F4",
  greenBorder: "#CBE0D5",
  gold: "#B5924C",
  goldLight: "#F9F5EB",
  goldBorder: "#E5D5B0",
  ink: "#16201D",
  inkMuted: "#4E5D58",
  inkLight: "#73827D",
  border: "#DCE3DF",
  surface: "#F8FAF9",
  white: "#FFFFFF",
  successText: "#065F46",
  successBg: "#ECFDF5",
  warnText: "#92400E",
  warnBg: "#FFFBEB",
  dangerText: "#991B1B",
  dangerBg: "#FEF2F2",
};

const fontStyle: React.CSSProperties = {
  fontFamily: '"IBM Plex Sans Arabic", sans-serif',
  direction: "rtl",
};

function SectionBanner({
  num,
  title,
  enTitle,
}: {
  num: number;
  title: string;
  enTitle: string;
}) {
  return (
    <div
      style={{
        ...fontStyle,
        borderBottom: `2.5px solid ${PDF_PALETTE.greenDark}`,
        paddingBottom: "10px",
        marginBottom: "4px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "7px",
            backgroundColor: PDF_PALETTE.greenDark,
            color: PDF_PALETTE.white,
            fontWeight: 700,
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {num}
        </div>
        <div>
          <div
            style={{
              fontSize: "14.5px",
              fontWeight: 600,
              color: PDF_PALETTE.gold,
              letterSpacing: "0.02em",
            }}
          >
            القسم {num} من 8 ·{" "}
            <span dir="ltr" style={{ unicodeBidi: "isolate", display: "inline-block" }}>
              Collection Persona Framework™
            </span>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: 700,
              color: PDF_PALETTE.greenDark,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
      <span
        dir="ltr"
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: PDF_PALETTE.inkLight,
          whiteSpace: "nowrap",
        }}
      >
        {enTitle}
      </span>
    </div>
  );
}

function SubHeading({ title }: { title: string }) {
  return (
    <div
      style={{
        ...fontStyle,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderBottom: `1px solid ${PDF_PALETTE.border}`,
        paddingBottom: "6px",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "22px",
          borderRadius: "2px",
          backgroundColor: PDF_PALETTE.gold,
          flexShrink: 0,
          display: "inline-block",
        }}
      />
      <h3
        style={{
          margin: 0,
          fontSize: "19px",
          fontWeight: 700,
          color: PDF_PALETTE.greenDark,
          lineHeight: 1.45,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

function EditorialTable({
  headers,
  rows,
  alignments,
  highlightLastRow = false,
}: {
  headers: string[];
  rows: (string | number)[][];
  alignments?: ("start" | "center")[];
  highlightLastRow?: boolean;
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "15.5px",
        border: `1px solid ${PDF_PALETTE.border}`,
        backgroundColor: PDF_PALETTE.white,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: PDF_PALETTE.greenTint, borderBottom: `1.5px solid ${PDF_PALETTE.greenBorder}` }}>
          {headers.map((h, i) => (
            <th
              key={i}
              style={{
                padding: "7px 10px",
                textAlign: alignments?.[i] ?? (i === 0 ? "right" : "center"),
                fontWeight: 700,
                color: PDF_PALETTE.greenDark,
                fontSize: "15.5px",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rIdx) => {
          const isLast = highlightLastRow && rIdx === rows.length - 1;
          return (
            <tr
              key={rIdx}
              style={{
                backgroundColor: isLast
                  ? PDF_PALETTE.greenTint
                  : rIdx % 2 === 1
                  ? PDF_PALETTE.surface
                  : PDF_PALETTE.white,
                borderBottom: rIdx === rows.length - 1 ? "none" : `1px solid ${PDF_PALETTE.border}`,
                fontWeight: isLast ? 700 : 400,
              }}
            >
              {row.map((cell, cIdx) => {
                const str = String(cell);
                const isLtrToken = /^[0-9./%\s–-]+$/.test(str) || str.includes("/");
                return (
                  <td
                    key={cIdx}
                    dir={isLtrToken && cIdx > 0 ? "ltr" : "rtl"}
                    style={{
                      padding: "6px 10px",
                      textAlign: alignments?.[cIdx] ?? (cIdx === 0 ? "right" : "center"),
                      color: isLast ? PDF_PALETTE.greenDark : PDF_PALETTE.ink,
                      fontWeight: cIdx === 0 || isLast ? 600 : 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ProgressRow({
  label,
  countText,
  pct,
  highlight,
}: {
  label: string;
  countText: string;
  pct: number;
  highlight?: boolean;
}) {
  return (
    <div style={{ marginBottom: "6px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "15.5px",
          marginBottom: "3px",
          gap: "8px",
        }}
      >
        <span style={{ color: PDF_PALETTE.ink, fontWeight: 500 }}>{label}</span>
        <span
          style={{
            color: highlight ? PDF_PALETTE.greenDark : PDF_PALETTE.inkMuted,
            fontWeight: 700,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {countText}
        </span>
      </div>
      <div
        style={{
          height: "7px",
          borderRadius: "999px",
          backgroundColor: "#E8ECEA",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.max(0, Math.min(100, pct))}%`,
            borderRadius: "999px",
            backgroundColor: highlight ? PDF_PALETTE.greenDark : PDF_PALETTE.gold,
          }}
        />
      </div>
    </div>
  );
}

export function buildFinalPdfBlocks(data: FinalReportData): PdfBlockDef[] {
  const blocks: PdfBlockDef[] = [];

  // =========================================================================
  // SECTION 1: الفرضية (Hypothesis)
  // =========================================================================
  blocks.push({
    id: "s1-banner",
    sectionIndex: 1,
    sectionTitle: "الفرضية",
    startsNewSection: true,
    keepWithNext: true,
    render: () => <SectionBanner num={1} title="الفرضية" enTitle="Hypothesis & Core Idea" />,
  });

  blocks.push({
    id: "s1-hypothesis-quote",
    sectionIndex: 1,
    sectionTitle: "الفرضية",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.goldBorder}`,
          backgroundColor: PDF_PALETTE.goldLight,
          borderRadius: "10px",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            fontSize: "15.5px",
            fontWeight: 700,
            color: PDF_PALETTE.greenDark,
            marginBottom: "7px",
          }}
        >
          {data.sec1Hypothesis.hypothesisBadge}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "18px",
            lineHeight: 1.85,
            color: PDF_PALETTE.ink,
            fontWeight: 500,
          }}
        >
          {data.sec1Hypothesis.hypothesisText}
        </p>
      </div>
    ),
  });

  blocks.push({
    id: "s1-core-idea",
    sectionIndex: 1,
    sectionTitle: "الفرضية",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            fontSize: "15.5px",
            fontWeight: 700,
            color: PDF_PALETTE.greenDark,
            marginBottom: "7px",
          }}
        >
          {data.sec1Hypothesis.ideaBadge}
        </div>
        <p style={{ margin: 0, fontSize: "17.5px", lineHeight: 1.8, color: PDF_PALETTE.ink }}>
          <b style={{ color: PDF_PALETTE.greenDark }}>{data.sec1Hypothesis.ideaPrefix}</b>
          {data.sec1Hypothesis.ideaBodyBeforeContext}
          <span
            dir="ltr"
            style={{
              display: "inline-block",
              backgroundColor: PDF_PALETTE.surface,
              border: `1px solid ${PDF_PALETTE.border}`,
              padding: "0 7px",
              borderRadius: "4px",
              fontSize: "15.5px",
              fontWeight: 600,
            }}
          >
            {data.sec1Hypothesis.ideaContextTerm}
          </span>
          {data.sec1Hypothesis.ideaMiddle}
          <b style={{ color: PDF_PALETTE.greenDark }}>
            {data.sec1Hypothesis.ideaNbcaTitle}
            <span dir="ltr" style={{ fontSize: "16px" }}>
              {data.sec1Hypothesis.ideaNbcaTerm}
            </span>
          </b>
          {data.sec1Hypothesis.ideaReasonLead}
          <span dir="ltr" style={{ fontSize: "16px", fontWeight: 600 }}>
            {data.sec1Hypothesis.ideaReasonTerm}
          </span>
          {data.sec1Hypothesis.ideaEnding}
        </p>
      </div>
    ),
  });

  blocks.push({
    id: "s1-target-segment",
    sectionIndex: 1,
    sectionTitle: "الفرضية",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.greenBorder}`,
          backgroundColor: PDF_PALETTE.greenTint,
          borderRadius: "10px",
          padding: "14px 20px",
        }}
      >
        <div style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.inkMuted, marginBottom: "5px" }}>
          {data.sec1Hypothesis.targetSegmentLabel}
        </div>
        <p style={{ margin: 0, fontSize: "17.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.65 }}>
          {data.sec1Hypothesis.targetSegmentPrimary}{" "}
          <span style={{ fontWeight: 400, color: PDF_PALETTE.inkMuted, fontSize: "16.5px" }}>
            {data.sec1Hypothesis.targetSegmentSecondary}
          </span>
        </p>
      </div>
    ),
  });

  // =========================================================================
  // SECTION 2: المؤشرات والأهداف (KPIs & Targets)
  // =========================================================================
  blocks.push({
    id: "s2-banner",
    sectionIndex: 2,
    sectionTitle: "المؤشرات والأهداف",
    startsNewSection: true,
    keepWithNext: true,
    render: () => (
      <div>
        <SectionBanner num={2} title="المؤشر والهدف (KPI & Target)" enTitle="KPIs & Digital Targets" />
        <p style={{ margin: "10px 0 0 0", fontSize: "17px", color: PDF_PALETTE.inkMuted, lineHeight: 1.65 }}>
          {data.sec2Kpis.intro}
        </p>
      </div>
    ),
  });

  blocks.push({
    id: "s2-headline-kpi",
    sectionIndex: 2,
    sectionTitle: "المؤشرات والأهداف",
    render: () => (
      <div
        style={{
          border: `1.5px solid ${PDF_PALETTE.greenDark}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${PDF_PALETTE.border}`,
            paddingBottom: "8px",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                backgroundColor: PDF_PALETTE.greenDark,
                color: PDF_PALETTE.white,
                fontSize: "15px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "5px",
              }}
            >
              {data.sec2Kpis.headline.badge}
            </span>
            <span dir="ltr" style={{ fontSize: "15px", color: PDF_PALETTE.inkLight, fontWeight: 600 }}>
              {data.sec2Kpis.headline.en}
            </span>
          </div>
          <span
            style={{
              backgroundColor: PDF_PALETTE.successBg,
              color: PDF_PALETTE.successText,
              fontSize: "15px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "5px",
            }}
          >
            {data.sec2Kpis.headline.tag}
          </span>
        </div>

        <div style={{ fontSize: "15.5px", color: PDF_PALETTE.inkMuted, fontWeight: 600, marginBottom: "4px" }}>
          {data.sec2Kpis.headline.nameLabel}
        </div>
        <p style={{ margin: "0 0 12px 0", fontSize: "19px", fontWeight: 700, color: PDF_PALETTE.ink, lineHeight: 1.6 }}>
          {data.sec2Kpis.headline.name}
        </p>

        <div
          style={{
            backgroundColor: PDF_PALETTE.greenTint,
            borderRadius: "8px",
            padding: "11px 15px",
            border: `1px solid ${PDF_PALETTE.greenBorder}`,
          }}
        >
          <div style={{ fontSize: "15px", color: PDF_PALETTE.inkMuted, fontWeight: 600, marginBottom: "2px" }}>
            {data.sec2Kpis.headline.targetLabel}
          </div>
          <div style={{ fontSize: "21px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
            {data.sec2Kpis.headline.target}
          </div>
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s2-supporting-kpis",
    sectionIndex: 2,
    sectionTitle: "المؤشرات والأهداف",
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <SubHeading title={data.sec2Kpis.supportingTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {data.sec2Kpis.supporting.map((kpi) => (
            <div
              key={kpi.en}
              style={{
                border: `1px solid ${PDF_PALETTE.border}`,
                backgroundColor: PDF_PALETTE.white,
                borderRadius: "10px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span
                    style={{
                      backgroundColor: PDF_PALETTE.greenTint,
                      color: PDF_PALETTE.greenDark,
                      fontSize: "14.5px",
                      fontWeight: 700,
                      padding: "2px 9px",
                      borderRadius: "4px",
                    }}
                  >
                    {kpi.badge}
                  </span>
                  <span dir="ltr" style={{ fontSize: "14.5px", color: PDF_PALETTE.inkLight }}>
                    {kpi.en}
                  </span>
                </div>
                <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted, marginBottom: "3px" }}>{kpi.nameLabel}</div>
                <p style={{ margin: 0, fontSize: "16.5px", fontWeight: 700, color: PDF_PALETTE.ink, lineHeight: 1.6 }}>
                  {kpi.name}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: PDF_PALETTE.surface,
                  border: `1px solid ${PDF_PALETTE.border}`,
                  borderRadius: "8px",
                  padding: "10px 12px",
                }}
              >
                <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted, fontWeight: 600, marginBottom: "2px" }}>
                  {kpi.targetLabel}
                </div>
                <div style={{ fontSize: "17.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                  {kpi.target}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  // =========================================================================
  // SECTION 3: الطريقة والعينة (Method & Sample)
  // =========================================================================
  blocks.push({
    id: "s3-banner",
    sectionIndex: 3,
    sectionTitle: "الطريقة والعينة",
    startsNewSection: true,
    keepWithNext: true,
    render: () => <SectionBanner num={3} title="الطريقة والعينة" enTitle="Methodology & Sample" />,
  });

  blocks.push({
    id: "s3-methodology",
    sectionIndex: 3,
    sectionTitle: "الطريقة والعينة",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.greenBorder}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "15px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${PDF_PALETTE.border}`,
            paddingBottom: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                backgroundColor: PDF_PALETTE.greenDark,
                color: PDF_PALETTE.white,
                padding: "3px 10px",
                borderRadius: "5px",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              {data.sec3MethodSample.methodologyBadge}
            </span>
            <span dir="ltr" style={{ fontSize: "15px", color: PDF_PALETTE.inkLight }}>
              {data.sec3MethodSample.methodologyEn}
            </span>
          </div>
          <span
            style={{
              backgroundColor: PDF_PALETTE.goldLight,
              color: PDF_PALETTE.greenDark,
              padding: "3px 10px",
              borderRadius: "5px",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            {data.sec3MethodSample.methodologyTag}
          </span>
        </div>

        <p style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: PDF_PALETTE.ink, lineHeight: 1.65 }}>
          {data.sec3MethodSample.methodologyIntro}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {data.sec3MethodSample.methods.map((m) => (
            <div
              key={m.title}
              style={{
                border: `1px solid ${PDF_PALETTE.border}`,
                borderRadius: "8px",
                padding: "12px 14px",
                backgroundColor: PDF_PALETTE.surface,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ borderBottom: `1px solid ${PDF_PALETTE.border}`, paddingBottom: "6px" }}>
                <div style={{ fontSize: "14.5px", fontWeight: 700, color: PDF_PALETTE.gold, marginBottom: "2px" }}>
                  {m.kicker}
                </div>
                <div style={{ fontSize: "16.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.45 }}>
                  {m.title}
                </div>
              </div>
              <div style={{ backgroundColor: PDF_PALETTE.greenTint, borderRadius: "6px", padding: "8px 10px" }}>
                <div style={{ fontSize: "14.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{m.toolLabel}</div>
                <div style={{ fontSize: "15.5px", color: PDF_PALETTE.ink, lineHeight: 1.55 }}>{m.toolText}</div>
              </div>
              <div style={{ backgroundColor: PDF_PALETTE.white, border: `1px solid ${PDF_PALETTE.border}`, borderRadius: "6px", padding: "8px 10px" }}>
                <div style={{ fontSize: "14.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{m.goalLabel}</div>
                <div style={{ fontSize: "15.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.6 }}>{m.goalText}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s3-sample",
    sectionIndex: 3,
    sectionTitle: "الطريقة والعينة",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "15px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${PDF_PALETTE.border}`,
            paddingBottom: "8px",
          }}
        >
          <SubHeading title={data.sec3MethodSample.sampleTitle} />
          <span dir="ltr" style={{ fontSize: "15px", color: PDF_PALETTE.inkLight }}>
            {data.sec3MethodSample.sampleEn}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div
            style={{
              border: `1px solid ${PDF_PALETTE.greenBorder}`,
              backgroundColor: PDF_PALETTE.greenTint,
              borderRadius: "8px",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
              {data.sec3MethodSample.usabilitySample.title}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", textAlign: "center" }}>
              {data.sec3MethodSample.usabilitySample.metrics.map((metric) => (
                <div
                  key={metric.label}
                  style={{
                    backgroundColor: PDF_PALETTE.white,
                    border: `1px solid ${PDF_PALETTE.border}`,
                    borderRadius: "6px",
                    padding: "8px 4px",
                  }}
                >
                  <div style={{ fontSize: "22px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: "13.5px", color: PDF_PALETTE.inkMuted }}>{metric.label}</div>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: "16px", color: PDF_PALETTE.ink, lineHeight: 1.6 }}>
              {data.sec3MethodSample.usabilitySample.description}
            </p>
          </div>

          <div
            style={{
              border: `1px solid ${PDF_PALETTE.greenBorder}`,
              backgroundColor: PDF_PALETTE.greenTint,
              borderRadius: "8px",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
                {data.sec3MethodSample.surveySample.title}
              </span>
              <span
                style={{
                  backgroundColor: PDF_PALETTE.successBg,
                  color: PDF_PALETTE.successText,
                  fontSize: "14px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {data.sec3MethodSample.surveySample.badge}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "16px", color: PDF_PALETTE.ink, lineHeight: 1.6 }}>
              {data.sec3MethodSample.surveySample.description}
            </p>
            <div>
              {data.sec3MethodSample.surveySample.bars.map((b, idx) => (
                <ProgressRow
                  key={b.label}
                  label={b.label}
                  countText={b.valueText}
                  pct={b.pct}
                  highlight={idx === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  });

  // =========================================================================
  // SECTION 4: الاستبيان (Survey)
  // =========================================================================
  blocks.push({
    id: "s4-banner",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    startsNewSection: true,
    keepWithNext: true,
    render: () => <SectionBanner num={4} title={data.sec4Survey.pageTitle} enTitle="Survey Evaluation" />,
  });

  blocks.push({
    id: "s4-tally-summary",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
          backgroundColor: PDF_PALETTE.greenTint,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "2px" }}>
              {data.sec4Survey.tallyBadge}
            </div>
            <div style={{ fontSize: "16.5px", fontWeight: 600, color: PDF_PALETTE.ink }}>
              {data.sec4Survey.tallyDescription}
            </div>
          </div>
          <span
            dir="ltr"
            style={{
              backgroundColor: PDF_PALETTE.white,
              border: `1px solid ${PDF_PALETTE.greenBorder}`,
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: 700,
              color: PDF_PALETTE.greenDark,
              whiteSpace: "nowrap",
            }}
          >
            {data.sec4Survey.tallyUrl}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {data.sec4Survey.summaryMetrics.map((m) => (
            <div
              key={m.label}
              style={{
                backgroundColor: PDF_PALETTE.white,
                border: `1px solid ${PDF_PALETTE.border}`,
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted }}>{m.label}</div>
              <div dir="ltr" style={{ fontSize: "21px", fontWeight: 700, color: PDF_PALETTE.greenDark, margin: "3px 0" }}>
                {m.value}
              </div>
              <div style={{ fontSize: "13.5px", color: PDF_PALETTE.inkLight }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s4-platform-scope",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <SubHeading title={data.sec4Survey.platformSectionTitle} />
        <p style={{ margin: 0, fontSize: "16.5px", color: PDF_PALETTE.ink, lineHeight: 1.65 }}>
          {data.sec4Survey.platformIntro}
        </p>
        <div
          style={{
            backgroundColor: PDF_PALETTE.surface,
            border: `1px solid ${PDF_PALETTE.border}`,
            borderRadius: "8px",
            padding: "11px 14px",
          }}
        >
          <div style={{ fontSize: "16.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "6px" }}>
            {data.sec4Survey.platformDetailsTitle}
          </div>
          <ul style={{ margin: 0, paddingRight: "18px", fontSize: "15.5px", color: PDF_PALETTE.ink, lineHeight: 1.65 }}>
            {data.sec4Survey.platformBullets.map((b) => (
              <li key={b.label} style={{ marginBottom: "4px" }}>
                <b>{b.label}</b> {b.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s4-survey-objectives",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
        }}
      >
        <div style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "6px" }}>
          {data.sec4Survey.objectivesTitle}
        </div>
        <ol style={{ margin: 0, paddingRight: "20px", fontSize: "15.5px", color: PDF_PALETTE.ink, lineHeight: 1.65 }}>
          {data.sec4Survey.objectives.map((obj, idx) => (
            <li key={idx} style={{ marginBottom: "3px" }}>
              {obj}
            </li>
          ))}
        </ol>
      </div>
    ),
  });

  blocks.push({
    id: "s4-demographics",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <SubHeading title={data.sec4Survey.demographicsTitle} />
        <p style={{ margin: 0, fontSize: "16.5px", color: PDF_PALETTE.ink }}>{data.sec4Survey.demographicsIntro}</p>
        <EditorialTable
          headers={["الدور الوظيفي", "عدد المشاركين", "النسبة المئوية"]}
          rows={data.sec4Survey.demographicsRows.map((r) => [r.role, r.count, r.pct])}
          highlightLastRow
        />
        <div
          style={{
            backgroundColor: PDF_PALETTE.goldLight,
            border: `1px solid ${PDF_PALETTE.goldBorder}`,
            borderRadius: "8px",
            padding: "10px 14px",
          }}
        >
          <div style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "3px" }}>
            {data.sec4Survey.demographicsReadingTitle}
          </div>
          <p style={{ margin: 0, fontSize: "15.5px", color: PDF_PALETTE.ink, lineHeight: 1.65 }}>
            {data.sec4Survey.demographicsReading}
          </p>
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s4-questions-heading",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    keepWithNext: true,
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <SubHeading title={data.sec4Survey.questionsTitle} />
        <div
          style={{
            backgroundColor: PDF_PALETTE.surface,
            border: `1px solid ${PDF_PALETTE.border}`,
            borderRadius: "6px",
            padding: "8px 14px",
            fontSize: "15.5px",
            color: PDF_PALETTE.ink,
          }}
        >
          {data.sec4Survey.likertNote}
        </div>
      </div>
    ),
  });

  data.sec4Survey.questions.forEach((q) => {
    blocks.push({
      id: `s4-${q.id}`,
      sectionIndex: 4,
      sectionTitle: "الاستبيان",
      render: () => (
        <div
          style={{
            border: `1px solid ${PDF_PALETTE.border}`,
            backgroundColor: PDF_PALETTE.white,
            borderRadius: "8px",
            padding: "13px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "7px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
            <div style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.45 }}>
              {q.heading}
            </div>
            {q.badge && (
              <span
                dir="ltr"
                style={{
                  backgroundColor: PDF_PALETTE.successBg,
                  color: PDF_PALETTE.successText,
                  fontSize: "14.5px",
                  fontWeight: 700,
                  padding: "2px 9px",
                  borderRadius: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                {q.badge}
              </span>
            )}
          </div>
          {q.optionsLine && (
            <div style={{ fontSize: "15px", color: PDF_PALETTE.inkMuted }}>{q.optionsLine}</div>
          )}
          {q.goal && (
            <div style={{ fontSize: "15.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.55 }}>{q.goal}</div>
          )}
          {(q.meanLabel || q.positiveShareLabel) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "15px" }}>
              {q.meanLabel && (
                <span
                  style={{
                    backgroundColor: PDF_PALETTE.greenTint,
                    color: PDF_PALETTE.greenDark,
                    padding: "2px 9px",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  {q.meanLabel}
                </span>
              )}
              {q.positiveShareLabel && (
                <span
                  style={{
                    backgroundColor: PDF_PALETTE.successBg,
                    color: PDF_PALETTE.successText,
                    padding: "2px 9px",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  {q.positiveShareLabel}
                </span>
              )}
            </div>
          )}
          {q.distributions && (
            <div style={{ paddingTop: "2px" }}>
              <div style={{ fontSize: "15px", fontWeight: 700, color: PDF_PALETTE.ink, marginBottom: "5px" }}>
                توزيع الإجابات التفصيلي كافة:
              </div>
              {q.distributions.map((d) => (
                <ProgressRow
                  key={d.label}
                  label={d.label}
                  countText={d.countText}
                  pct={d.pct}
                  highlight={d.highlight}
                />
              ))}
            </div>
          )}
          {q.responseNote && (
            <div style={{ fontSize: "16px", fontWeight: 600, color: PDF_PALETTE.ink }}>{q.responseNote}</div>
          )}
          {q.analysis && (
            <div
              style={{
                backgroundColor: PDF_PALETTE.surface,
                borderRadius: "6px",
                padding: "9px 12px",
                fontSize: "15.5px",
                color: PDF_PALETTE.ink,
                lineHeight: 1.6,
              }}
            >
              {q.analysis}
            </div>
          )}
        </div>
      ),
    });
  });

  blocks.push({
    id: "s4-pattern-diagram",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <SubHeading title={data.sec4Survey.patternMiningTitle} />
        <p style={{ margin: 0, fontSize: "16px", color: PDF_PALETTE.ink, lineHeight: 1.65 }}>
          {data.sec4Survey.patternMiningIntro}
        </p>
        <div
          style={{
            backgroundColor: PDF_PALETTE.surface,
            border: `1px solid ${PDF_PALETTE.border}`,
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "9px" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: PDF_PALETTE.greenDark,
                color: PDF_PALETTE.white,
                fontSize: "15.5px",
                fontWeight: 700,
                padding: "5px 16px",
                borderRadius: "6px",
              }}
            >
              {data.sec4Survey.patternDiagramRoot}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {data.sec4Survey.patternDiagramBranches.map((br) => (
              <div
                key={br.title}
                style={{
                  backgroundColor: PDF_PALETTE.white,
                  border: `1px solid ${PDF_PALETTE.greenBorder}`,
                  borderRadius: "6px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: PDF_PALETTE.greenDark,
                    borderBottom: `1px solid ${PDF_PALETTE.border}`,
                    paddingBottom: "4px",
                    marginBottom: "6px",
                  }}
                >
                  {br.title}
                </div>
                <ul style={{ margin: 0, paddingRight: "16px", fontSize: "14.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.6 }}>
                  {br.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s4-pattern-items",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {data.sec4Survey.patternItems.map((item) => (
          <div
            key={item.title}
            style={{
              border: `1px solid ${PDF_PALETTE.border}`,
              borderRadius: "7px",
              padding: "9px 12px",
              backgroundColor: PDF_PALETTE.surface,
            }}
          >
            <div style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.ink, marginBottom: "3px" }}>
              {item.title}{" "}
              <span style={{ color: PDF_PALETTE.greenDark }}>{item.status}</span>
            </div>
            <div style={{ fontSize: "15px", color: PDF_PALETTE.inkMuted, lineHeight: 1.6 }}>{item.quote}</div>
          </div>
        ))}
      </div>
    ),
  });

  blocks.push({
    id: "s4-results-vs-targets",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <SubHeading title={data.sec4Survey.resultsVsTargetsTitle} />
        <EditorialTable
          headers={["المؤشر الداعم", "الهدف الرقمي المسبق", "النتيجة الفعلية المحسوبة", "موقف الهدف"]}
          rows={data.sec4Survey.resultsVsTargetsRows.map((r) => [r.indicator, r.target, r.actual, r.status])}
        />
      </div>
    ),
  });

  blocks.push({
    id: "s4-actionable-decisions",
    sectionIndex: 4,
    sectionTitle: "الاستبيان",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.goldBorder}`,
          backgroundColor: PDF_PALETTE.goldLight,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <SubHeading title={data.sec4Survey.actionableDecisionsTitle} />
        <p style={{ margin: 0, fontSize: "16px", color: PDF_PALETTE.ink }}>
          {data.sec4Survey.actionableDecisionsIntro}
        </p>
        <p style={{ margin: 0, fontSize: "16.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.8 }}>
          {data.sec4Survey.actionableDecisionsQuote}
        </p>
      </div>
    ),
  });

  // =========================================================================
  // SECTION 5: اختبار الاستخدام الموجّه (Moderated Usability Testing)
  // =========================================================================
  blocks.push({
    id: "s6-banner",
    sectionIndex: 5,
    sectionTitle: "اختبار الاستخدام الموجّه",
    startsNewSection: true,
    keepWithNext: true,
    render: () => <SectionBanner num={5} title={data.sec6Usability.pageTitle} enTitle="Moderated Usability Testing" />,
  });

  blocks.push({
    id: "s6-protocol-overview",
    sectionIndex: 5,
    sectionTitle: "اختبار الاستخدام الموجّه",
    render: () => (
      <div
        style={{
          border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
          backgroundColor: PDF_PALETTE.greenTint,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "3px" }}>
              {data.sec6Usability.methodologyBadge}
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: PDF_PALETTE.ink, marginBottom: "4px" }}>
              {data.sec6Usability.methodologyHeading}
            </div>
            <p style={{ margin: 0, fontSize: "15.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.65 }}>
              {data.sec6Usability.methodologyDesc}
            </p>
          </div>
          <div
            style={{
              backgroundColor: PDF_PALETTE.white,
              border: `1.5px solid ${PDF_PALETTE.greenDark}`,
              borderRadius: "8px",
              padding: "10px 16px",
              textAlign: "center",
              minWidth: "165px",
            }}
          >
            <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted }}>{data.sec6Usability.overallRateLabel}</div>
            <div style={{ fontSize: "29px", fontWeight: 700, color: PDF_PALETTE.successText, margin: "2px 0" }}>
              {data.sec6Usability.overallRateValue}
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: PDF_PALETTE.inkMuted }}>{data.sec6Usability.overallRateSub}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
          {data.sec6Usability.specCards.map((c) => (
            <div
              key={c.label}
              style={{
                backgroundColor: PDF_PALETTE.white,
                border: `1px solid ${PDF_PALETTE.border}`,
                borderRadius: "6px",
                padding: "8px 6px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "13.5px", color: PDF_PALETTE.inkMuted }}>{c.label}</div>
              <div style={{ fontSize: "17.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, margin: "2px 0" }}>
                {c.value}
              </div>
              <div style={{ fontSize: "13px", color: PDF_PALETTE.inkLight }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s6-tasks",
    sectionIndex: 5,
    sectionTitle: "اختبار الاستخدام الموجّه",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <SubHeading title={data.sec6Usability.tasksSectionTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
          {data.sec6Usability.tasks.map((t) => (
            <div
              key={t.num}
              style={{
                border: `1px solid ${PDF_PALETTE.border}`,
                backgroundColor: PDF_PALETTE.surface,
                borderRadius: "8px",
                padding: "11px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                  <span style={{ fontSize: "14.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{t.code}</span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: "4px",
                      backgroundColor: t.successCount === 3 ? PDF_PALETTE.successBg : PDF_PALETTE.warnBg,
                      color: t.successCount === 3 ? PDF_PALETTE.successText : PDF_PALETTE.warnText,
                    }}
                  >
                    نجاح {t.successRate} ({t.successCount}/{t.totalCount})
                  </span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: PDF_PALETTE.ink, marginBottom: "4px" }}>{t.title}</div>
                <p style={{ margin: 0, fontSize: "14.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.55 }}>{t.description}</p>
              </div>
              <div style={{ borderTop: `1px solid ${PDF_PALETTE.border}`, paddingTop: "6px", fontSize: "14.5px" }}>
                <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "2px" }}>
                  متوسط السهولة: {t.meanEase}
                </div>
                <div style={{ color: PDF_PALETTE.inkMuted, lineHeight: 1.5 }}>{t.analysis}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s6-matrices",
    sectionIndex: 5,
    sectionTitle: "اختبار الاستخدام الموجّه",
    render: () => (
      <div
        style={{
          border: `1px solid ${PDF_PALETTE.border}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <SubHeading title={data.sec6Usability.matricesTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.ink, marginBottom: "6px" }}>
              نتائج تنفيذ المهام (9 محاولات)
            </div>
            <EditorialTable
              headers={["المشارك", "المهمة 1", "المهمة 2", "المهمة 3", "الإجمالي"]}
              rows={[
                ...data.sec6Usability.taskMatrix.map((r) => [r.participant, r.t1, r.t2, r.t3, r.total]),
                ["الإجمالي", "3/3", "3/3", "2/3", "8/9 (88.89%)"],
              ]}
              highlightLastRow
            />
          </div>
          <div>
            <div style={{ fontSize: "15.5px", fontWeight: 700, color: PDF_PALETTE.ink, marginBottom: "6px" }}>
              تقييم سهولة الاستخدام (من 1 إلى 7)
            </div>
            <EditorialTable
              headers={["المشارك", "المهمة 1", "المهمة 2", "المهمة 3", "المتوسط"]}
              rows={[
                ...data.sec6Usability.easeMatrix.map((r) => [r.participant, r.t1, r.t2, r.t3, r.avg]),
                ["متوسط تقييم المهمة", "6.33", "5.00", "4.67", "5.33 / 7"],
              ]}
              highlightLastRow
            />
          </div>
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s6-sessions-heading",
    sectionIndex: 5,
    sectionTitle: "اختبار الاستخدام الموجّه",
    keepWithNext: true,
    render: () => <SubHeading title={data.sec6Usability.sessionsTitle} />,
  });

  data.sec6Usability.sessions.forEach((session) => {
    blocks.push({
      id: `s6-${session.id}-header`,
      sectionIndex: 5,
      sectionTitle: "اختبار الاستخدام الموجّه",
      keepWithNext: true,
      render: () => (
        <div
          style={{
            border: `1px solid ${PDF_PALETTE.greenBorder}`,
            backgroundColor: PDF_PALETTE.greenTint,
            borderRadius: "8px",
            padding: "11px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted }}>جلسة اختبار الاستخدام الموجّه</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{session.roleTitle}</div>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "15px" }}>
            <span
              style={{
                backgroundColor: session.successRate === "100%" ? PDF_PALETTE.successBg : PDF_PALETTE.warnBg,
                color: session.successRate === "100%" ? PDF_PALETTE.successText : PDF_PALETTE.warnText,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: "5px",
              }}
            >
              نسبة النجاح: {session.successRate}
            </span>
            <span
              style={{
                backgroundColor: PDF_PALETTE.white,
                color: PDF_PALETTE.greenDark,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: "5px",
                border: `1px solid ${PDF_PALETTE.greenBorder}`,
              }}
            >
              المتوسط: <span dir="ltr">{session.meanEase}</span>
            </span>
          </div>
        </div>
      ),
    });

    session.dialogueSteps.forEach((step, stepIdx) => {
      blocks.push({
        id: `s6-${session.id}-step-${stepIdx}`,
        sectionIndex: 5,
        sectionTitle: "اختبار الاستخدام الموجّه",
        render: () => (
          <div
            style={{
              border: `1px solid ${PDF_PALETTE.border}`,
              backgroundColor: PDF_PALETTE.white,
              borderRadius: "8px",
              padding: "11px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{step.heading}</div>
            {step.lines.map((line, lIdx) => (
              <div
                key={lIdx}
                style={{
                  borderRadius: "5px",
                  padding: "6px 10px",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  backgroundColor: line.isQuote
                    ? PDF_PALETTE.goldLight
                    : line.speaker === "ماجد"
                    ? PDF_PALETTE.surface
                    : PDF_PALETTE.greenTint,
                  borderRight: line.isQuote ? `3px solid ${PDF_PALETTE.gold}` : "none",
                  fontWeight: line.isQuote ? 600 : 400,
                  color: PDF_PALETTE.ink,
                }}
              >
                <b style={{ color: PDF_PALETTE.greenDark, marginLeft: "5px" }}>{line.speaker}:</b>
                <span>{line.text}</span>
              </div>
            ))}
          </div>
        ),
      });
    });

    blocks.push({
      id: `s6-${session.id}-summary`,
      sectionIndex: 5,
      sectionTitle: "اختبار الاستخدام الموجّه",
      render: () => (
        <div
          style={{
            border: `1px solid ${PDF_PALETTE.border}`,
            backgroundColor: PDF_PALETTE.white,
            borderRadius: "8px",
            padding: "12px 15px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "16.5px", fontWeight: 700, color: PDF_PALETTE.ink }}>نتيجة {session.name}</div>
          <EditorialTable
            headers={["المهمة", "النتيجة", "تقييم السهولة"]}
            rows={[
              ...session.tasks.map((t) => [t.taskTitle, t.result, t.easeScore]),
              ["الإجمالي", session.totalTasksLabel, `${session.meanEase} متوسطاً`],
            ]}
            highlightLastRow
          />
          {session.keyNote && (
            <div
              style={{
                border: `1px solid ${PDF_PALETTE.goldBorder}`,
                backgroundColor: PDF_PALETTE.warnBg,
                borderRadius: "6px",
                padding: "9px 12px",
                fontSize: "15.5px",
                color: PDF_PALETTE.warnText,
              }}
            >
              <b>الملاحظة الأساسية:</b> {session.keyNote}
            </div>
          )}
          <div
            style={{
              backgroundColor: PDF_PALETTE.greenTint,
              borderRadius: "6px",
              padding: "10px 12px",
              fontSize: "15.5px",
              color: PDF_PALETTE.ink,
              lineHeight: 1.65,
            }}
          >
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "3px" }}>تحليل الجلسة:</div>
            {session.analysis.map((p, idx) => (
              <p key={idx} style={{ margin: idx === 0 ? 0 : "4px 0 0 0" }}>{p}</p>
            ))}
          </div>
        </div>
      ),
    });
  });

  // =========================================================================
  // SECTION 6: النتيجة مقابل الهدف (Result vs. Target)
  // =========================================================================
  blocks.push({
    id: "s7-banner",
    sectionIndex: 6,
    sectionTitle: "النتيجة مقابل الهدف",
    startsNewSection: true,
    keepWithNext: true,
    render: () => <SectionBanner num={6} title={data.sec7ResultVsTarget.pageTitle} enTitle="Results vs. Targets" />,
  });

  data.sec7ResultVsTarget.cards.forEach((card, idx) => {
    blocks.push({
      id: `s7-card-${idx}`,
      sectionIndex: 6,
      sectionTitle: "النتيجة مقابل الهدف",
      render: () => (
        <div
          style={{
            border: idx === 0 ? `1.5px solid ${PDF_PALETTE.greenDark}` : `1px solid ${PDF_PALETTE.border}`,
            backgroundColor: PDF_PALETTE.white,
            borderRadius: "10px",
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: "9px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${PDF_PALETTE.border}`,
              paddingBottom: "8px",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: PDF_PALETTE.greenTint,
                  color: PDF_PALETTE.greenDark,
                  fontSize: "14.5px",
                  fontWeight: 700,
                  padding: "2px 9px",
                  borderRadius: "4px",
                  marginBottom: "4px",
                }}
              >
                {card.badge}
              </span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{card.title}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: `1px solid ${PDF_PALETTE.greenBorder}`,
                backgroundColor: PDF_PALETTE.successBg,
                borderRadius: "8px",
                padding: "8px 14px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "13.5px", color: PDF_PALETTE.inkMuted }}>النتيجة</div>
                <div dir="ltr" style={{ fontSize: "20.5px", fontWeight: 700, color: PDF_PALETTE.successText }}>{card.actualMetric}</div>
              </div>
              <span style={{ fontSize: "15px", fontWeight: 700, color: PDF_PALETTE.inkMuted }}>مقابل</span>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "13.5px", color: PDF_PALETTE.inkMuted }}>الهدف</div>
                <div dir="ltr" style={{ fontSize: "18px", fontWeight: 700, color: PDF_PALETTE.ink }}>{card.targetMetric}</div>
              </div>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: "16.5px", fontWeight: 500, color: PDF_PALETTE.ink, lineHeight: 1.65 }}>
            {card.summary}
          </p>
          <div style={{ height: "8px", borderRadius: "999px", backgroundColor: "#E8ECEA", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${card.progressPct}%`, backgroundColor: PDF_PALETTE.greenDark, borderRadius: "999px" }} />
          </div>
          <div
            style={{
              backgroundColor: PDF_PALETTE.successBg,
              border: `1px solid ${PDF_PALETTE.greenBorder}`,
              borderRadius: "7px",
              padding: "8px 12px",
              fontSize: "16px",
              fontWeight: 700,
              color: PDF_PALETTE.successText,
            }}
          >
            ✓ {card.statusLine}
          </div>
        </div>
      ),
    });
  });

  blocks.push({
    id: "s7-pattern-discovery",
    sectionIndex: 6,
    sectionTitle: "النتيجة مقابل الهدف",
    render: () => (
      <div
        style={{
          border: `1.5px solid ${PDF_PALETTE.goldBorder}`,
          backgroundColor: PDF_PALETTE.goldLight,
          borderRadius: "10px",
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "9px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${PDF_PALETTE.goldBorder}`, paddingBottom: "7px" }}>
          <SubHeading title={data.sec7ResultVsTarget.patternSectionTitle} />
          <span style={{ backgroundColor: PDF_PALETTE.warnBg, color: PDF_PALETTE.warnText, fontSize: "15px", fontWeight: 700, padding: "3px 10px", borderRadius: "5px" }}>
            {data.sec7ResultVsTarget.patternSectionBadge}
          </span>
        </div>
        {data.sec7ResultVsTarget.patternParagraphs.map((p, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: PDF_PALETTE.white,
              border: `1px solid ${PDF_PALETTE.border}`,
              borderRadius: "7px",
              padding: "11px 14px",
              fontSize: "16.5px",
              color: PDF_PALETTE.ink,
              lineHeight: 1.7,
            }}
          >
            {p}
          </div>
        ))}
      </div>
    ),
  });

  // =========================================================================
  // SECTION 7: النتائج (Comprehensive Results Report)
  // =========================================================================
  blocks.push({
    id: "s8-banner",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    startsNewSection: true,
    keepWithNext: true,
    render: () => <SectionBanner num={7} title={data.sec8Results.metadata.mainTitle} enTitle="Evaluation & Analysis Report" />,
  });

  blocks.push({
    id: "s8-metadata",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div
        style={{
          border: `1.5px solid ${PDF_PALETTE.greenBorder}`,
          backgroundColor: PDF_PALETTE.greenTint,
          borderRadius: "10px",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ borderBottom: `1px solid ${PDF_PALETTE.greenBorder}`, paddingBottom: "8px" }}>
          <div style={{ fontSize: "20.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{data.sec8Results.metadata.mainTitle}</div>
          <div style={{ fontSize: "16.5px", fontWeight: 600, color: PDF_PALETTE.ink }}>{data.sec8Results.metadata.subtitle}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "15.5px" }}>
          <div style={{ backgroundColor: PDF_PALETTE.white, border: `1px solid ${PDF_PALETTE.border}`, borderRadius: "7px", padding: "10px 12px" }}>
            <div style={{ color: PDF_PALETTE.inkMuted, fontWeight: 600 }}>نوع التقييم:</div>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.ink }}>{data.sec8Results.metadata.evalTypeAr}</div>
            <div dir="ltr" style={{ fontSize: "14px", color: PDF_PALETTE.inkLight }}>{data.sec8Results.metadata.evalTypeEn}</div>
          </div>
          <div style={{ backgroundColor: PDF_PALETTE.white, border: `1px solid ${PDF_PALETTE.border}`, borderRadius: "7px", padding: "10px 12px" }}>
            <div style={{ color: PDF_PALETTE.inkMuted, fontWeight: 600 }}>طريقة تنفيذ الاختبار:</div>
            <div style={{ fontWeight: 600, color: PDF_PALETTE.ink }}>{data.sec8Results.metadata.testMethod}</div>
            <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted }}>
              تاريخ جمع بيانات الاستبيان: <b style={{ color: PDF_PALETTE.ink }}>{data.sec8Results.metadata.collectionDate}</b>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", textAlign: "center" }}>
          {data.sec8Results.summaryCards.map((c) => (
            <div key={c.label} style={{ backgroundColor: PDF_PALETTE.white, border: `1px solid ${PDF_PALETTE.border}`, borderRadius: "7px", padding: "9px 8px" }}>
              <div style={{ fontSize: "14px", color: PDF_PALETTE.inkMuted }}>{c.label}</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginTop: "2px" }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  // 8.1 Executive Summary (split cleanly into 2 balanced blocks so neither overflows)
  blocks.push({
    id: "s8-exec-summary-heading",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    keepWithNext: true,
    render: () => <SubHeading title={data.sec8Results.executiveSummaryTitle} />,
  });

  blocks.push({
    id: "s8-exec-summary-p1",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", fontSize: "16px", lineHeight: 1.7, color: PDF_PALETTE.ink }}>
        {data.sec8Results.executiveSummaryParagraphs.slice(0, 5).map((p, i) => (
          <p key={i} style={{ margin: i === 0 ? 0 : "6px 0 0 0" }}>{p}</p>
        ))}
      </div>
    ),
  });

  blocks.push({
    id: "s8-exec-summary-p2",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", fontSize: "16px", lineHeight: 1.7, color: PDF_PALETTE.ink }}>
        {data.sec8Results.executiveSummaryParagraphs.slice(5).map((p, i) => (
          <p key={i} style={{ margin: i === 0 ? 0 : "6px 0 0 0" }}>{p}</p>
        ))}
      </div>
    ),
  });

  // 8.2 Intro + 8.3 Objectives
  blocks.push({
    id: "s8-intro",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "16px", lineHeight: 1.7, color: PDF_PALETTE.ink }}>
        <SubHeading title={data.sec8Results.introTitle} />
        {data.sec8Results.introParagraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>{p}</p>
        ))}
      </div>
    ),
  });

  blocks.push({
    id: "s8-objectives",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "16px", lineHeight: 1.65, color: PDF_PALETTE.ink }}>
        <SubHeading title={data.sec8Results.objectivesTitle} />
        <p style={{ margin: 0 }}>{data.sec8Results.objectivesIntro}</p>
        <ol style={{ margin: 0, paddingRight: "20px" }}>
          {data.sec8Results.objectivesList.map((o, i) => (
            <li key={i} style={{ marginBottom: "4px" }}>{o}</li>
          ))}
        </ol>
      </div>
    ),
  });

  // 8.4 Methodology
  blocks.push({
    id: "s8-methodology-head",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    keepWithNext: true,
    render: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <SubHeading title={data.sec8Results.methodologyTitle} />
        <p style={{ margin: 0, fontSize: "16px", color: PDF_PALETTE.ink }}>{data.sec8Results.methodologyIntro}</p>
      </div>
    ),
  });

  data.sec8Results.methodologySubsections.forEach((sub, idx) => {
    blocks.push({
      id: `s8-method-sub-${idx}`,
      sectionIndex: 7,
      sectionTitle: "النتائج",
      render: () => (
        <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "8px", padding: "11px 15px", fontSize: "15.5px", lineHeight: 1.65, color: PDF_PALETTE.ink }}>
          <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "4px", fontSize: "17px" }}>{sub.title}</div>
          {sub.paragraphs.map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? 0 : "4px 0 0 0" }}>{p}</p>
          ))}
          {sub.bullets && (
            <ol style={{ margin: "4px 0 0 0", paddingRight: "20px" }}>
              {sub.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ol>
          )}
        </div>
      ),
    });
  });

  // 8.5 Survey Results (5.1..5.7)
  blocks.push({
    id: "s8-survey-results-head",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    keepWithNext: true,
    render: () => <SubHeading title={data.sec8Results.surveyResultsTitle} />,
  });

  blocks.push({
    id: "s8-5-1-demographics",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
        <div style={{ fontSize: "17.5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>5.1 خصائص المشاركين</div>
        <p style={{ margin: 0, color: PDF_PALETTE.ink }}>بلغ عدد المشاركين في الاستبيان 19 مشاركاً، وتوزعت أدوارهم الوظيفية كما يلي:</p>
        <EditorialTable
          headers={["الدور الوظيفي", "العدد", "النسبة"]}
          rows={[
            ...data.sec8Results.demographicsRows.map((r) => [r.role, r.count, r.pct]),
            ["الإجمالي", "19", "100%"],
          ]}
          highlightLastRow
        />
        <div style={{ backgroundColor: PDF_PALETTE.greenTint, borderRadius: "6px", padding: "10px 12px", lineHeight: 1.65 }}>
          <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>التحليل:</div>
          {data.sec8Results.demographicsAnalysis.map((p, i) => (
            <p key={i} style={{ margin: "3px 0 0 0" }}>{p}</p>
          ))}
        </div>
      </div>
    ),
  });

  data.sec8Results.scaleQuestions.slice(0, 3).forEach((q) => {
    blocks.push({
      id: `s8-5-${q.id}`,
      sectionIndex: 7,
      sectionTitle: "النتائج",
      render: () => (
        <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{q.sectionNum} {q.title}</span>
            <span style={{ backgroundColor: PDF_PALETTE.successBg, color: PDF_PALETTE.successText, fontWeight: 700, padding: "3px 10px", borderRadius: "4px", fontSize: "15px" }}>
              المتوسط الحسابي: {q.meanText}
            </span>
          </div>
          <p style={{ margin: 0, color: PDF_PALETTE.ink }}>{q.goal}</p>
          <EditorialTable
            headers={["الدرجة", "عدد الإجابات", "النسبة"]}
            rows={[
              ...q.rows.map((r) => [r.score, r.count, r.pct]),
              ["الإجمالي", "19", "100%"],
            ]}
            alignments={["center", "center", "center"]}
            highlightLastRow
          />
          <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>
            بلغ عدد التقييمات المرتفعة (4 و5) {q.highCount} إجابة من أصل 19، بنسبة {q.highPct}.
          </div>
          <div style={{ backgroundColor: PDF_PALETTE.greenTint, borderRadius: "6px", padding: "9px 12px", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>التحليل:</div>
            {q.analysis.map((p, i) => (
              <p key={i} style={{ margin: "3px 0 0 0" }}>{p}</p>
            ))}
          </div>
        </div>
      ),
    });
  });

  blocks.push({
    id: "s8-5-5-practice",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
        <div style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
          5.5 السؤال الخامس: الممارسة الحالية لتحديد الإجراء التحصيلي
        </div>
        <p style={{ margin: 0, color: PDF_PALETTE.ink }}>
          استهدف السؤال التعرف على الأسلوب الذي يعتمد عليه المشاركون حالياً عند تحديد الإجراء التحصيلي المناسب للعميل.
        </p>
        <EditorialTable
          headers={["أسلوب تحديد الإجراء", "العدد", "النسبة"]}
          rows={[
            ...data.sec8Results.currentPracticeRows.map((r) => [r.method, r.count, r.pct]),
            ["الإجمالي", "19", "100%"],
          ]}
          highlightLastRow
        />
        <div style={{ backgroundColor: PDF_PALETTE.greenTint, borderRadius: "6px", padding: "9px 12px", lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>التحليل:</div>
          {data.sec8Results.currentPracticeAnalysis.map((p, i) => (
            <p key={i} style={{ margin: "3px 0 0 0" }}>{p}</p>
          ))}
        </div>
      </div>
    ),
  });

  data.sec8Results.scaleQuestions.slice(3).forEach((q) => {
    blocks.push({
      id: `s8-5-${q.id}`,
      sectionIndex: 7,
      sectionTitle: "النتائج",
      render: () => (
        <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{q.sectionNum} {q.title}</span>
            <span style={{ backgroundColor: PDF_PALETTE.successBg, color: PDF_PALETTE.successText, fontWeight: 700, padding: "3px 10px", borderRadius: "4px", fontSize: "15px" }}>
              المتوسط الحسابي: {q.meanText}
            </span>
          </div>
          <p style={{ margin: 0, color: PDF_PALETTE.ink }}>{q.goal}</p>
          <EditorialTable
            headers={["الدرجة", "عدد الإجابات", "النسبة"]}
            rows={[
              ...q.rows.map((r) => [r.score, r.count, r.pct]),
              ["الإجمالي", "19", "100%"],
            ]}
            alignments={["center", "center", "center"]}
            highlightLastRow
          />
          <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>
            بلغت التقييمات المرتفعة (4 و5) {q.highCount} إجابة من أصل 19، بنسبة {q.highPct}.
          </div>
          <div style={{ backgroundColor: PDF_PALETTE.greenTint, borderRadius: "6px", padding: "9px 12px", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>التحليل:</div>
            {q.analysis.map((p, i) => (
              <p key={i} style={{ margin: "3px 0 0 0" }}>{p}</p>
            ))}
          </div>
        </div>
      ),
    });
  });

  blocks.push({
    id: "s8-5-7-head",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    keepWithNext: true,
    render: () => (
      <div style={{ fontSize: "16px", lineHeight: 1.65 }}>
        <div style={{ fontSize: "17.5px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "4px" }}>
          5.7 السؤال السابع: الملاحظات والمقترحات المفتوحة
        </div>
        {data.sec8Results.openThemesIntro.map((p, i) => (
          <p key={i} style={{ margin: "2px 0", color: PDF_PALETTE.ink }}>{p}</p>
        ))}
      </div>
    ),
  });

  // Group 6 open themes into 3 pairs so each block is compact and never overflows
  for (let i = 0; i < data.sec8Results.openThemes.length; i += 2) {
    const pair = data.sec8Results.openThemes.slice(i, i + 2);
    blocks.push({
      id: `s8-5-7-themes-${i}`,
      sectionIndex: 7,
      sectionTitle: "النتائج",
      render: () => (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {pair.map((theme) => (
            <div key={theme.title} style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "8px", padding: "11px 14px", fontSize: "15px", lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "4px", fontSize: "16px" }}>{theme.title}</div>
              <p style={{ margin: "0 0 5px 0", color: PDF_PALETTE.inkMuted }}>{theme.description}</p>
              <ul style={{ margin: 0, paddingRight: "16px", color: PDF_PALETTE.ink }}>
                {theme.quotes.map((q, qIdx) => (
                  <li key={qIdx} style={{ marginBottom: "3px" }}>{q}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    });
  }

  blocks.push({
    id: "s8-5-7-conclusion",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ backgroundColor: PDF_PALETTE.greenTint, border: `1px solid ${PDF_PALETTE.greenBorder}`, borderRadius: "8px", padding: "11px 14px", fontSize: "15.5px", lineHeight: 1.65 }}>
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "3px" }}>التحليل العام للسؤال المفتوح:</div>
        <p style={{ margin: 0, color: PDF_PALETTE.ink }}>{data.sec8Results.openThemesConclusion}</p>
      </div>
    ),
  });

  // 8.6 Usability Testing Overview
  blocks.push({
    id: "s8-6-usability-overview",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "9px", fontSize: "15.5px" }}>
        <SubHeading title={data.sec8Results.usabilityOverviewTitle} />
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>6.1 بيانات الاختبار</div>
        <p style={{ margin: 0 }}>تم تنفيذ اختبار الاستخدام الموجّه حضورياً في مقر العمل باستخدام النموذج الأولي التفاعلي. وشارك في الاختبار ثلاثة أخصائيي تحصيل، ونُفذت ثلاث مهام لكل مشارك.</p>
        <EditorialTable
          headers={["العنصر", "التفاصيل"]}
          rows={data.sec8Results.usabilityDataRows}
          alignments={["start", "start"]}
        />
      </div>
    ),
  });

  blocks.push({
    id: "s8-6-2-moderated-tasks",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "9px", fontSize: "15.5px" }}>
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, fontSize: "17px" }}>6.2 المهام الثلاث المعتمدة في الاختبار</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
          {data.sec8Results.moderatedTasks.map((t) => (
            <div key={t.num} style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "7px", padding: "10px 12px" }}>
              <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "4px", fontSize: "16px" }}>{t.code}: {t.title}</div>
              <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.55 }}>{t.description}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  // 8.7 Participant Results (complete verbatim 7.1, 7.2, 7.3)
  blocks.push({
    id: "s8-7-sessions-head",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    keepWithNext: true,
    render: () => <SubHeading title={data.sec8Results.sessionsTitle} />,
  });

  data.sec8Results.usabilitySessions.forEach((session) => {
    blocks.push({
      id: `s8-7-${session.id}-head`,
      sectionIndex: 7,
      sectionTitle: "النتائج",
      keepWithNext: true,
      render: () => (
        <div style={{ border: `1px solid ${PDF_PALETTE.greenBorder}`, backgroundColor: PDF_PALETTE.greenTint, borderRadius: "8px", padding: "9px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "17px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>{session.sectionNum} {session.roleTitle}</div>
          <div style={{ display: "flex", gap: "10px", fontSize: "15px", fontWeight: 700 }}>
            <span>نسبة النجاح: {session.successRate}</span>
            <span>·</span>
            <span>المتوسط: <span dir="ltr">{session.meanEase}</span></span>
          </div>
        </div>
      ),
    });

    session.dialogueSteps.forEach((step, sIdx) => {
      blocks.push({
        id: `s8-7-${session.id}-step-${sIdx}`,
        sectionIndex: 7,
        sectionTitle: "النتائج",
        render: () => (
          <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "7px", padding: "10px 14px", fontSize: "15px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.ink, fontSize: "16px" }}>{step.heading}</div>
            {step.lines.map((line, lIdx) => (
              <div
                key={lIdx}
                style={{
                  backgroundColor: line.isQuote ? PDF_PALETTE.goldLight : PDF_PALETTE.surface,
                  borderRight: line.isQuote ? `3px solid ${PDF_PALETTE.gold}` : "none",
                  borderRadius: "4px",
                  padding: "5px 9px",
                  lineHeight: 1.55,
                }}
              >
                <b style={{ color: PDF_PALETTE.greenDark, marginLeft: "5px" }}>{line.speaker}:</b>
                {line.text}
              </div>
            ))}
          </div>
        ),
      });
    });

    blocks.push({
      id: `s8-7-${session.id}-table`,
      sectionIndex: 7,
      sectionTitle: "النتائج",
      render: () => (
        <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "11px 14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px" }}>
          <EditorialTable
            headers={["المهمة", "النتيجة", "تقييم السهولة"]}
            rows={[
              ...session.tasks.map((t) => [t.taskTitle, t.result, t.easeScore]),
              ["الإجمالي", session.totalTasksLabel, `${session.meanEase} متوسطاً`],
            ]}
            highlightLastRow
          />
          {session.keyNote && (
            <div style={{ backgroundColor: PDF_PALETTE.warnBg, border: `1px solid ${PDF_PALETTE.goldBorder}`, borderRadius: "5px", padding: "7px 10px", color: PDF_PALETTE.warnText }}>
              <b>الملاحظة الأساسية:</b> {session.keyNote}
            </div>
          )}
          <div style={{ backgroundColor: PDF_PALETTE.greenTint, borderRadius: "5px", padding: "9px 11px", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>تحليل الجلسة:</div>
            {session.analysis.map((p, idx) => (
              <p key={idx} style={{ margin: "3px 0 0 0" }}>{p}</p>
            ))}
          </div>
        </div>
      ),
    });
  });

  // 8.8 Overall Usability Testing Results
  blocks.push({
    id: "s8-8-overall-matrices",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "15.5px" }}>
        <SubHeading title={data.sec8Results.overallUsabilityTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "5px" }}>8.1 نتائج تنفيذ المهام حسب المشاركين</div>
            <EditorialTable
              headers={["المشارك", "المهمة 1", "المهمة 2", "المهمة 3", "الإجمالي"]}
              rows={[
                ...data.sec8Results.usabilityTaskMatrix.map((r) => [r.participant, r.t1, r.t2, r.t3, r.total]),
                ["الإجمالي", "3/3", "3/3", "2/3", "8/9"],
              ]}
              highlightLastRow
            />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "5px" }}>8.2 نتائج تقييم سهولة الاستخدام</div>
            <EditorialTable
              headers={["المشارك", "المهمة 1", "المهمة 2", "المهمة 3", "المتوسط"]}
              rows={[
                ...data.sec8Results.usabilityEaseMatrix.map((r) => [r.participant, r.t1, r.t2, r.t3, r.avg]),
                ["متوسط تقييم المهمة", "6.33", "5.00", "4.67", "5.33"],
              ]}
              highlightLastRow
            />
          </div>
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s8-8-3-ease-dist",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "8px", padding: "13px 16px", fontSize: "15.5px", lineHeight: 1.65 }}>
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "5px", fontSize: "17px" }}>8.3 توزيع درجات السهولة</div>
        <p style={{ margin: "0 0 8px 0" }}>{data.sec8Results.easeDistributionNote}</p>
        <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
          <span dir="ltr" style={{ backgroundColor: PDF_PALETTE.white, border: `1px solid ${PDF_PALETTE.border}`, padding: "4px 12px", borderRadius: "5px", fontWeight: 700, color: PDF_PALETTE.greenDark }}>
            {data.sec8Results.easeFormula1}
          </span>
          <span dir="ltr" style={{ backgroundColor: PDF_PALETTE.white, border: `1px solid ${PDF_PALETTE.border}`, padding: "4px 12px", borderRadius: "5px", fontWeight: 700, color: PDF_PALETTE.successText }}>
            {data.sec8Results.easeFormula2}
          </span>
        </div>
        <p style={{ margin: 0, fontWeight: 600 }}>{data.sec8Results.easeSummaryLine}</p>
      </div>
    ),
  });

  blocks.push({
    id: "s8-8-4-tasks",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, fontSize: "17px" }}>8.4 تحليل النتائج حسب المهمة</div>
        {data.sec8Results.moderatedTasks.map((t) => (
          <div key={t.num} style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "7px", padding: "9px 12px", lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark }}>{t.code}: {t.title}</div>
            <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted }}>
              عدد المهام الناجحة: {t.successCount} من {t.totalCount} · نسبة النجاح: {t.successRate} · متوسط تقييم السهولة: {t.meanEase}
            </div>
            <p style={{ margin: "3px 0 0 0" }}>{t.analysis}</p>
          </div>
        ))}
      </div>
    ),
  });

  // 8.9 Integrative Analysis
  blocks.push({
    id: "s8-9-integrative-table",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
        <SubHeading title={data.sec8Results.integrativeTitle} />
        {data.sec8Results.integrativeIntro.map((p, i) => (
          <p key={i} style={{ margin: 0, lineHeight: 1.6 }}>{p}</p>
        ))}
        <EditorialTable
          headers={["محور التقييم", "نتيجة الاستبيان", "نتيجة اختبار الاستخدام", "القراءة التحليلية"]}
          rows={data.sec8Results.integrativeRows.map((r) => [r.axis, r.survey, r.usability, r.reading])}
          alignments={["start", "start", "start", "start"]}
        />
      </div>
    ),
  });

  data.sec8Results.integrativeSubsections.forEach((sub, idx) => {
    blocks.push({
      id: `s8-9-integrative-sub-${idx}`,
      sectionIndex: 7,
      sectionTitle: "النتائج",
      render: () => (
        <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "8px", padding: "12px 15px", fontSize: "15.5px", lineHeight: 1.65 }}>
          <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "4px", fontSize: "17px" }}>{sub.title}</div>
          {sub.paragraphs.map((p, pIdx) => (
            <p key={pIdx} style={{ margin: pIdx === 0 ? 0 : "4px 0 0 0" }}>{p}</p>
          ))}
          {sub.flowLine && (
            <div style={{ backgroundColor: PDF_PALETTE.white, border: `1px solid ${PDF_PALETTE.greenBorder}`, borderRadius: "6px", padding: "8px 12px", marginTop: "7px", fontWeight: 700, color: PDF_PALETTE.greenDark, textAlign: "center" }}>
              {sub.flowLine}
            </div>
          )}
        </div>
      ),
    });
  });

  // 8.10 Strengths & 8.11 Improvements (split for Landscape safety)
  blocks.push({
    id: "s8-10-strengths",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", fontSize: "15.5px", lineHeight: 1.65 }}>
        <SubHeading title={data.sec8Results.strengthsTitle} />
        <p style={{ margin: "6px 0" }}>{data.sec8Results.strengthsIntro}</p>
        <ol style={{ margin: 0, paddingRight: "20px" }}>
          {data.sec8Results.strengthsList.map((s) => (
            <li key={s.title} style={{ marginBottom: "4px" }}>
              <b>{s.title}</b> {s.detail}
            </li>
          ))}
        </ol>
      </div>
    ),
  });

  blocks.push({
    id: "s8-11-improvements",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
        <SubHeading title={data.sec8Results.improvementsTitle} />
        <p style={{ margin: 0 }}>{data.sec8Results.improvementsIntro}</p>
        <EditorialTable
          headers={["الأولوية", "فرصة التحسين", "المبرر"]}
          rows={data.sec8Results.improvements.map((im) => [im.priority, im.improvement, im.rationale])}
          alignments={["center", "start", "start"]}
        />
      </div>
    ),
  });

  // 8.12 Methodological Limitations & 8.13 Final Conclusion
  blocks.push({
    id: "s8-12-limitations",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
        <SubHeading title={data.sec8Results.limitationsTitle} />
        <p style={{ margin: 0 }}>{data.sec8Results.limitationsIntro}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px" }}>
          {data.sec8Results.limitations.map(([t, desc]) => (
            <div key={t} style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "7px", padding: "9px 12px" }}>
              <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "3px" }}>{t}</div>
              <div style={{ fontSize: "14.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s8-13-conclusion-text",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "7px", fontSize: "15.5px", lineHeight: 1.65 }}>
        <SubHeading title={data.sec8Results.conclusionTitle} />
        {data.sec8Results.conclusionParagraphs.map((p, i) => (
          <p key={i} style={{ margin: 0 }}>{p}</p>
        ))}
      </div>
    ),
  });

  blocks.push({
    id: "s8-13-conclusion-box",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1.5px solid ${PDF_PALETTE.goldBorder}`, backgroundColor: PDF_PALETTE.goldLight, borderRadius: "8px", padding: "13px 16px", fontSize: "16px" }}>
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "4px" }}>{data.sec8Results.mainConclusionLabel}</div>
        <p style={{ margin: 0, fontWeight: 600, color: PDF_PALETTE.ink, lineHeight: 1.75 }}>{data.sec8Results.mainConclusionText}</p>
      </div>
    ),
  });

  // 8.Appendices 1-4 (split cleanly so Landscape pages have zero overflow)
  blocks.push({
    id: "s8-appendices-1-2",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "15.5px" }}>
        <SubHeading title={data.sec8Results.appendicesTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "6px" }}>{data.sec8Results.appendix1.title}</div>
            <EditorialTable headers={["المؤشر", "النتيجة"]} rows={data.sec8Results.appendix1.rows} />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "6px" }}>{data.sec8Results.appendix2.title}</div>
            <EditorialTable headers={["المؤشر", "النتيجة"]} rows={data.sec8Results.appendix2.rows} />
          </div>
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s8-appendix-3",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15.5px" }}>
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, fontSize: "17px" }}>{data.sec8Results.appendix3.title}</div>
        <EditorialTable
          headers={["المشارك", "المهمة الأولى", "المهمة الثانية", "المهمة الثالثة", "نسبة النجاح", "متوسط السهولة"]}
          rows={data.sec8Results.appendix3.rows}
          highlightLastRow
        />
      </div>
    ),
  });

  blocks.push({
    id: "s8-appendix-4a",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px" }}>
        <div style={{ fontWeight: 700, color: PDF_PALETTE.greenDark, fontSize: "16.5px" }}>{data.sec8Results.appendix4.title}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
          {data.sec8Results.appendix4.responses.slice(0, 10).map((txt, idx) => (
            <div key={idx} style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "6px", padding: "7px 10px", display: "flex", gap: "6px", lineHeight: 1.55 }}>
              <b style={{ color: PDF_PALETTE.greenDark, flexShrink: 0 }}>{idx + 1}.</b>
              <span>{txt}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  blocks.push({
    id: "s8-appendix-4b",
    sectionIndex: 7,
    sectionTitle: "النتائج",
    render: () => (
      <div style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.white, borderRadius: "8px", padding: "13px 16px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
          {data.sec8Results.appendix4.responses.slice(10).map((txt, idx) => (
            <div key={idx + 10} style={{ border: `1px solid ${PDF_PALETTE.border}`, backgroundColor: PDF_PALETTE.surface, borderRadius: "6px", padding: "7px 10px", display: "flex", gap: "6px", lineHeight: 1.55 }}>
              <b style={{ color: PDF_PALETTE.greenDark, flexShrink: 0 }}>{idx + 11}.</b>
              <span>{txt}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${PDF_PALETTE.border}`, paddingTop: "7px", textAlign: "center", fontWeight: 700, color: PDF_PALETTE.inkMuted, fontSize: "15.5px" }}>
          {data.sec8Results.endOfReportLabel}
        </div>
      </div>
    ),
  });

  // =========================================================================
  // SECTION 8: القرار النهائي (Final Decision)
  // =========================================================================
  blocks.push({
    id: "s9-banner",
    sectionIndex: 8,
    sectionTitle: "القرار النهائي",
    startsNewSection: true,
    keepWithNext: true,
    render: () => <SectionBanner num={8} title={data.sec9FinalDecision.pageTitle} enTitle="Final Decision" />,
  });

  blocks.push({
    id: "s9-decision-card",
    sectionIndex: 8,
    sectionTitle: "القرار النهائي",
    render: () => (
      <div
        style={{
          border: `2px solid ${PDF_PALETTE.greenDark}`,
          backgroundColor: PDF_PALETTE.white,
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${PDF_PALETTE.border}`, paddingBottom: "10px" }}>
          <span style={{ backgroundColor: PDF_PALETTE.greenDark, color: PDF_PALETTE.white, fontSize: "16px", fontWeight: 700, padding: "5px 14px", borderRadius: "6px" }}>
            ✓ {data.sec9FinalDecision.approvedBadge}
          </span>
          <span style={{ backgroundColor: PDF_PALETTE.successBg, color: PDF_PALETTE.successText, fontSize: "16px", fontWeight: 700, padding: "5px 14px", borderRadius: "6px" }}>
            {data.sec9FinalDecision.statusBadge}
          </span>
        </div>

        <div
          style={{
            border: `1.5px solid ${PDF_PALETTE.goldBorder}`,
            backgroundColor: PDF_PALETTE.goldLight,
            borderRadius: "10px",
            padding: "18px 22px",
          }}
        >
          <p style={{ margin: 0, fontSize: "21px", fontWeight: 700, color: PDF_PALETTE.greenDark, lineHeight: 1.9 }}>
            {data.sec9FinalDecision.decisionQuote}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {data.sec9FinalDecision.pillars.map((pillar) => (
            <div
              key={pillar.badge}
              style={{
                border: `1px solid ${PDF_PALETTE.border}`,
                backgroundColor: PDF_PALETTE.surface,
                borderRadius: "8px",
                padding: "14px",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: 700, color: PDF_PALETTE.greenDark, marginBottom: "6px" }}>
                {pillar.badge}
              </div>
              <p style={{ margin: 0, fontSize: "15.5px", color: PDF_PALETTE.inkMuted, lineHeight: 1.65 }}>
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  return blocks;
}
