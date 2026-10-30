import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { snapchatSpend } from "./portfolioFacts";

describe("confirmed portfolio metrics", () => {
  test("Snapchat managed spend is over five million US dollars", () => {
    assert.equal(snapchatSpend.minimumAmount, 5_000_000);
    assert.equal(snapchatSpend.currency, "USD");
    assert.equal(snapchatSpend.isLowerBound, true);
  });
});