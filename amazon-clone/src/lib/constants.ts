export const SITE_NAME = "NovaMart";
export const SITE_DESCRIPTION = "Everything you need, delivered to your door";
export const SITE_URL = "https://novamart.com";

export const COLORS = {
  navyDark: "#131921",
  navyLight: "#232F3E",
  orange: "#FF9900",
  orangeHover: "#FFa31a",
  blue: "#146EB4",
} as const;

export const SHIPPING_THRESHOLD = 35;
export const SHIPPING_COST = 5.99;
export const TAX_RATE = 0.08;

export const CATEGORY_SLUGS = [
  "electronics",
  "clothing",
  "home-kitchen",
  "books",
  "sports-outdoors",
  "beauty",
  "toys-games",
  "automotive",
] as const;

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Avg. Customer Review" },
  { value: "newest", label: "Newest Arrivals" },
] as const;

export const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "$200 & Above", min: 200, max: Infinity },
] as const;

export const RATING_FILTERS = [4, 3, 2, 1] as const;
