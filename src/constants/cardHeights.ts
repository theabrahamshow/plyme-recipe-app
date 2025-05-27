// Predefined card heights for consistent masonry layout
export const CARD_HEIGHTS = {
  SHORT: 180,
  TALL: 260
} as const;

export type CardHeight = typeof CARD_HEIGHTS[keyof typeof CARD_HEIGHTS]; 