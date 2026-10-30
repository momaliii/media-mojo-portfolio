export const snapchatSpend = {
  currency: "USD",
  minimumAmount: 5_000_000,
  isLowerBound: true,
  display: "$5M+",
} as const;

export const impressions = {
  minimumCount: 2_000_000_000,
  isLowerBound: true,
  display: "2B+",
} as const;
