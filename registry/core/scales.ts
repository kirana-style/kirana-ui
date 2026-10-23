/**
 * The Tailwind vocabulary the styles are written in: plain constants that the compiler inlines, so
 * they emit no CSS until a style uses them. Most come from `@kirana-style/preset-scales`, generated
 * from Tailwind's own theme; the rest are this design system's own.
 */
export {
  blur,
  breakpoint,
  containerSize,
  duration,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  shadow,
  space,
} from "@kirana-style/preset-scales"

/**
 * The line height paired with each `fontSize` step, as a unitless ratio rounded **up** at five
 * decimals. The preset writes Tailwind's ratios as `calc(1.25 / 0.875)`, which the CSS minifier
 * folds to five decimals rounding down: 14px text then gets 19.984px lines instead of 20px, and the
 * drift shows against the Tailwind original over a long page (KF-012 in Kirana's feedback log).
 */
export const lineHeight = {
  xs: "1.33334", // 1 / 0.75
  sm: "1.42858", // 1.25 / 0.875
  base: "1.5",
  lg: "1.55556", // 1.75 / 1.125
  xl: "1.4", // 1.75 / 1.25
  "2xl": "1.33334", // 2 / 1.5
} as const

/**
 * Curves. `inOut` is Tailwind's default transition curve; `ease` is the CSS keyword that
 * `tw-animate-css`'s `animate-in` and `animate-out` use for every shadcn/ui popup.
 */
export const easing = {
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  ease: "ease",
} as const

/** Named layers. A popup and a modal share shadcn/ui's `z-50`. */
export const zIndex = {
  raised: "10",
  overlay: "50",
  popover: "50",
} as const
