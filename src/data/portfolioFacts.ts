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

export const orders2026 = {
  minimumCount: 500_000,
  year: 2026,
  isLowerBound: true,
  display: "500K+",
} as const;
