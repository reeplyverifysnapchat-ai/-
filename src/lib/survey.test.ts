import test from "node:test";
import assert from "node:assert/strict";
import { positiveShare, TARGET_RESPONSES, Q1_DISQUALIFY, YES, NO } from "./survey.ts";

test("positiveShare calculates percentage of 4 and 5 out of answered questions", () => {
  assert.equal(positiveShare([5, 4, 3, 2]), 0.5);
  assert.equal(positiveShare([5, 5, 4, 4]), 1.0);
  assert.equal(positiveShare([1, 2, 3]), 0.0);
});

test("positiveShare ignores null or unanswered values", () => {
  assert.equal(positiveShare([4, null]), 1.0);
  assert.equal(positiveShare([null, null]), 0.0);
  assert.equal(positiveShare([]), 0.0);
});

test("survey config specifications", () => {
  assert.equal(TARGET_RESPONSES, 15);
  assert.equal(Q1_DISQUALIFY, NO);
  assert.equal(YES, "نعم");
  assert.equal(NO, "لا");
});
