/**
 * The Kirana site's display type, for the site's own headlines (the home page's and the project
 * pages'): EB Garamond at its regular weight, with its drawn italic for the accent words, in
 * Kirana's fluid roles (`packages/ui/src/tokens/typography.ts` in Kirana's repository). The
 * components and the docs keep the design's own fonts.
 */
export const SERIF = '"EB Garamond Variable", ui-serif, Georgia, serif'

/** Each role's size, line height and tracking: the home headline, a page's, a chapter's. */
export const DISPLAY = {
  display1: {
    fontSize: "clamp(2.75rem, 1.55rem + 4.8vw, 5.25rem)",
    lineHeight: "1",
    letterSpacing: "-0.024em",
  },
  display2: {
    fontSize: "clamp(2.375rem, 1.6rem + 3.1vw, 4rem)",
    lineHeight: "1.04",
    letterSpacing: "-0.02em",
  },
  title: {
    fontSize: "clamp(1.875rem, 1.45rem + 1.7vw, 2.75rem)",
    lineHeight: "1.08",
    letterSpacing: "-0.015em",
  },
  lede: {
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)",
    lineHeight: "1.6",
  },
} as const
