import { buildFinalReportData, type FinalReportData } from "./finalReportData";

export interface PresentationPointMeta {
  num: number;
  arTitle: string;
  enTitle: string;
}

export const PRESENTATION_FIVE_POINTS: PresentationPointMeta[] = [
  { num: 1, arTitle: "الفرضية", enTitle: "Hypothesis" },
  { num: 2, arTitle: "المؤشر والهدف", enTitle: "KPI and target" },
  { num: 3, arTitle: "الطريقة والعينة", enTitle: "Method and sample" },
  { num: 4, arTitle: "النتيجة مقابل الهدف", enTitle: "Result against target" },
  { num: 5, arTitle: "القرار", enTitle: "Decision" },
];

export const SLIDE_WIDTH_PX = 1280; // 16:9 Widescreen @ 96dpi
export const SLIDE_HEIGHT_PX = 720;
export const SLIDE_WIDTH_MM = 338.67; // 1280px at 96dpi
export const SLIDE_HEIGHT_MM = 190.5; // 720px at 96dpi

export interface PresentationSlidesData {
  deckTitleAr: string;
  deckTitleEn: string;
  generatedAtFormatted: string;
  points: PresentationPointMeta[];
  source: FinalReportData;
}

export function buildPresentationSlidesData(): PresentationSlidesData {
  const source = buildFinalReportData();
  return {
    deckTitleAr: "ملف النموذج الأولي",
    deckTitleEn: "Collection Persona Framework™",
    generatedAtFormatted: source.generatedAtFormatted,
    points: PRESENTATION_FIVE_POINTS,
    source,
  };
}

export function validatePresentationSlidesData(data: PresentationSlidesData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (data.points.length !== 5) {
    errors.push("يجب أن يحتوي العرض على 5 نقاط رئيسية");
  }
  if (!data.source.sec1Hypothesis.hypothesisText.trim()) {
    errors.push("نص الفرضية مفقود");
  }
  if (data.source.sec2Kpis.supporting.length !== 2) {
    errors.push("المؤشرات الداعمة غير مكتملة");
  }
  if (data.source.sec3MethodSample.methods.length !== 2) {
    errors.push("بيانات الطريقة والعينة غير مكتملة");
  }
  if (data.source.sec7ResultVsTarget.cards.length !== 3) {
    errors.push("بطاقات النتيجة مقابل الهدف غير مكتملة");
  }
  if (!data.source.sec9FinalDecision.decisionQuote.trim()) {
    errors.push("نص القرار النهائي مفقود");
  }
  return { valid: errors.length === 0, errors };
}
