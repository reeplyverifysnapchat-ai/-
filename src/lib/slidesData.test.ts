import test from "node:test";
import assert from "node:assert/strict";
import {
  buildPresentationSlidesData,
  PRESENTATION_FIVE_POINTS,
  SLIDE_HEIGHT_PX,
  SLIDE_WIDTH_PX,
  validatePresentationSlidesData,
} from "./slidesData";

test("PRESENTATION_FIVE_POINTS matches the exact 5 points in bilingual order", () => {
  assert.deepEqual(
    PRESENTATION_FIVE_POINTS.map((p) => [p.num, p.arTitle, p.enTitle]),
    [
      [1, "الفرضية", "Hypothesis"],
      [2, "المؤشر والهدف", "KPI and target"],
      [3, "الطريقة والعينة", "Method and sample"],
      [4, "النتيجة مقابل الهدف", "Result against target"],
      [5, "القرار", "Decision"],
    ],
  );
});

test("buildPresentationSlidesData returns valid 16:9 slide payload with all 5 points", () => {
  const data = buildPresentationSlidesData();
  const validation = validatePresentationSlidesData(data);
  assert.equal(validation.valid, true, `Errors: ${validation.errors.join(", ")}`);
  assert.equal(SLIDE_WIDTH_PX / SLIDE_HEIGHT_PX, 16 / 9);
});
