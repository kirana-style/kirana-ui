/**
 * The Tailwind vocabulary the styles are written in: plain constants that the compiler inlines, so
 * they emit no CSS until a style uses them. Most come from `@kirana-style/preset-scales`, generated
 * from Tailwind's own theme; the rest are this design system's own.
 */
export {
  blur,
  breakpoint,
  // Tailwind's palette, for the examples that name a colour of it (`bg-green-500/10`); a component
  // reads the design's tokens instead.
  color,
  containerSize,
  duration,
  // Tailwind's `font-mono` stack, for figures (a chart tooltip's values).
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  // The line height paired with each `fontSize` step, a unitless ratio rounded up at five decimals,
  // so 14px text gets 20px lines.
  lineHeight,
  shadow,
  space,
  // Any multiple of a quarter rem: `spacing(9.5)` is `pl-9.5`.
  spacing,
} from "@kirana-style/preset-scales"

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
