import test from "node:test";
import assert from "node:assert/strict";
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
} from "./pdfPagination";

test("FINAL_REPORT_SECTIONS preserves the exact 8-section order without Prototype", () => {
  const expected = [
    "الفرضية",
    "المؤشرات والأهداف",
    "الطريقة والعينة",
    "الاستبيان",
    "اختبار الاستخدام الموجّه",
    "النتيجة مقابل الهدف",
    "النتائج",
    "القرار النهائي",
  ];
  assert.deepEqual(
    FINAL_REPORT_SECTIONS.map((s) => s.title),
    expected,
  );
  assert.deepEqual(
    FINAL_REPORT_SECTIONS.map((s) => s.index),
    [1, 2, 3, 4, 5, 6, 7, 8],
  );
});

test("buildFinalReportData passes completeness validation with zero missing data", () => {
  const data = buildFinalReportData();
  const validation = validateFinalReportSourceData(data);
  assert.equal(validation.valid, true, `Validation errors: ${validation.errors.join(", ")}`);

  const anchors = getRequiredContentAnchors(data);
  assert.ok(anchors.length >= 20);
  for (const anchor of anchors) {
    assert.ok(anchor.trim().length > 0);
  }
});

test("paginateMeasuredBlocks starts each section on a new page and keeps headings with followers", () => {
  const blocks: MeasuredBlock[] = [
    { id: "s1-head", sectionIndex: 1, sectionTitle: "الفرضية", height: 80, keepWithNext: true, startsNewSection: true },
    { id: "s1-body", sectionIndex: 1, sectionTitle: "الفرضية", height: 300 },
    { id: "s1-tail", sectionIndex: 1, sectionTitle: "الفرضية", height: 500 },
    // Notice s1-heading2 + s1-body2 = 80 + 12 + 120 = 212, while used is 80+12+300+12+500 = 904 -> out of 940 remaining is 36 -> must break BEFORE s1-heading2!
    { id: "s1-heading2", sectionIndex: 1, sectionTitle: "الفرضية", height: 80, keepWithNext: true },
    { id: "s1-body2", sectionIndex: 1, sectionTitle: "الفرضية", height: 120 },
    { id: "s2-head", sectionIndex: 2, sectionTitle: "المؤشرات والأهداف", height: 90, keepWithNext: true, startsNewSection: true },
    { id: "s2-body", sectionIndex: 2, sectionTitle: "المؤشرات والأهداف", height: 400 },
  ];

  const result = paginateMeasuredBlocks(blocks, 940, 12, 1);

  assert.equal(result.pages.length, 3);
  assert.deepEqual(result.pages[0].blockIds, ["s1-head", "s1-body", "s1-tail"]);
  assert.deepEqual(result.pages[1].blockIds, ["s1-heading2", "s1-body2"]);
  assert.deepEqual(result.pages[2].blockIds, ["s2-head", "s2-body"]);

  // Cover is page 1, section 1 starts on page 2, section 2 starts on page 4
  assert.equal(result.sectionStartPage[1], 2);
  assert.equal(result.sectionStartPage[2], 4);
  assert.equal(result.totalPdfPages, 4);
});

test("buildIntegrityReport flags missing anchors or overflows and passes when clean", () => {
  const titles = FINAL_REPORT_SECTIONS.map((s) => s.title);
  const ok = buildIntegrityReport({
    sectionCount: 8,
    expectedSectionTitles: titles,
    renderedSectionTitles: titles,
    totalPdfPages: 22,
    emptyPageCount: 0,
    horizontalOverflowPages: [],
    verticalOverflowPages: [],
    missingAnchors: [],
  });
  assert.equal(ok.passed, true);

  const broken = buildIntegrityReport({
    sectionCount: 8,
    expectedSectionTitles: titles,
    renderedSectionTitles: titles,
    totalPdfPages: 22,
    emptyPageCount: 1,
    horizontalOverflowPages: [3],
    verticalOverflowPages: [],
    missingAnchors: ["missing-item"],
  });
  assert.equal(broken.passed, false);
});
