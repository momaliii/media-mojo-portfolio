import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { snapchatSpend, impressions, orders2026 } from "./portfolioFacts";

describe("confirmed portfolio metrics", () => {
  test("Snapchat managed spend is over five million US dollars", () => {
    assert.equal(snapchatSpend.minimumAmount, 5_000_000);
    assert.equal(snapchatSpend.currency, "USD");
    assert.equal(snapchatSpend.isLowerBound, true);
  });

  test("Impressions delivered are over two billion", () => {
    assert.equal(impressions.minimumCount, 2_000_000_000);
    assert.equal(impressions.isLowerBound, true);
    assert.equal(impressions.display, "2B+");
  });

  test("Orders generated in 2026 are over half a million", () => {
    assert.equal(orders2026.minimumCount, 500_000);
    assert.equal(orders2026.year, 2026);
    assert.equal(orders2026.isLowerBound, true);
    assert.equal(orders2026.display, "500K+");
  });
});
