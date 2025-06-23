// API Configuration
export const API_CONFIG = {
  PHOTOS_PER_PAGE: 20,
  SEARCH_DEBOUNCE_MS: 500,
  INFINITE_SCROLL_THRESHOLD: 200,
} as const;

// UI Configuration
export const UI_CONFIG = {
  ITEM_WIDTH: 300,
  ITEM_GAP: 20,
  OVERSCAN_PX: 100,
  VIRTUALIZATION_DEBOUNCE_MS: 50,
  SCROLL_DEBOUNCE_MS: 100,
  SCROLL_THRESHOLD_PX: 5,
} as const;

// Colors
export const COLORS = {
  PRIMARY: "#05a081",
  PRIMARY_HOVER: "#00856f",
  BACKGROUND: "#fafafa",
  SURFACE: "#fff",
  TEXT: "#222",
  TEXT_SECONDARY: "#666",
  ERROR: "#e74c3c",
  BORDER: "#e0e0e0",
  SHADOW: "rgba(34, 34, 34, 0.08)",
  SHADOW_HOVER: "rgba(34, 34, 34, 0.16)",
  TAG_BACKGROUND: "#e6f7f3",
} as const;

// Spacing
export const SPACING = {
  XS: "8px",
  SM: "16px",
  MD: "24px",
  LG: "32px",
  XL: "48px",
} as const;

// Border radius
export const BORDER_RADIUS = {
  SM: "8px",
  MD: "16px",
  LG: "24px",
} as const;
