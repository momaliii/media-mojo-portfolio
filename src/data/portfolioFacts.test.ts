import { describe, expect, test } from "bun:test";
import { snapchatSpend } from "./portfolioFacts";

describe("confirmed portfolio metrics", () => {
  test("Snapchat managed spend is over five million US dollars", () => {
    expect(snapchatSpend.minimumAmount).toBe(5_000_000);
    expect(snapchatSpend.currency).toBe("USD");
    expect(snapchatSpend.isLowerBound).toBe(true);
  });
});