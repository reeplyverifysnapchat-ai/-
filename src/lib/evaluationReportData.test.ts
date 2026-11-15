import test from "node:test";
import assert from "node:assert/strict";
import {
  ALL_OPEN_RESPONSES,
  CURRENT_PRACTICE_ROWS,
  DEMOGRAPHICS_ROWS,
  EVALUATION_METRICS_COMPUTATIONS,
  SURVEY_SCALE_QUESTIONS,
  USABILITY_EASE_MATRIX,
  USABILITY_SESSIONS,
} from "./evaluationReportData";

test("survey demographics and current practice total 19 responses", () => {
  const demoTotal = DEMOGRAPHICS_ROWS.reduce((sum, r) => sum + r.count, 0);
  assert.equal(demoTotal, 19);

  const practiceTotal = CURRENT_PRACTICE_ROWS.reduce((sum, r) => sum + r.count, 0);
  assert.equal(practiceTotal, 19);
});

test("survey scale questions sum to 19 and match reported arithmetic means", () => {
  for (const q of SURVEY_SCALE_QUESTIONS) {
    const totalCount = q.rows.reduce((sum, r) => sum + r.count, 0);
    assert.equal(totalCount, 19, `Total count mismatch on ${q.id}`);

    const weightedSum = q.rows.reduce((sum, r) => sum + r.score * r.count, 0);
    const computedMean = Number((weightedSum / totalCount).toFixed(2));
    if (q.id === "q3") {
      // Source report lists 4.16 verbatim while table counts (1,1,0,8,9) sum to 80/19 = 4.21
      assert.equal(computedMean, 4.21);
      assert.equal(q.mean, 4.16);
    } else {
      assert.equal(computedMean, q.mean, `Mean mismatch on ${q.id}`);
    }

    const highCount = q.rows
      .filter((r) => r.score >= 4)
      .reduce((sum, r) => sum + r.count, 0);
    assert.equal(highCount, q.highCount, `High rating count mismatch on ${q.id}`);
  }
});

test("all 18 open responses are recorded", () => {
  assert.equal(ALL_OPEN_RESPONSES.length, 18);
});

test("moderated usability test totals match 48/9=5.33 ease and 8/9=88.89% success", () => {
  assert.equal(USABILITY_SESSIONS.length, 3);
  assert.equal(EVALUATION_METRICS_COMPUTATIONS.totalEaseSum, 48);
  assert.equal(EVALUATION_METRICS_COMPUTATIONS.meanEaseScore, 5.33);
  assert.equal(EVALUATION_METRICS_COMPUTATIONS.successRatePct, 88.89);

  const task1Avg = Number(
    (USABILITY_EASE_MATRIX.reduce((s, r) => s + r.t1, 0) / 3).toFixed(2),
  );
  const task2Avg = Number(
    (USABILITY_EASE_MATRIX.reduce((s, r) => s + r.t2, 0) / 3).toFixed(2),
  );
  const task3Avg = Number(
    (USABILITY_EASE_MATRIX.reduce((s, r) => s + r.t3, 0) / 3).toFixed(2),
  );
  assert.equal(task1Avg, 6.33);
  assert.equal(task2Avg, 5);
  assert.equal(task3Avg, 4.67);
});
