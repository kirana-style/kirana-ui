/**
 * What form controls share: the rings they draw on focus and when invalid (as Tailwind composes
 * `ring-*` with `shadow-*`), and how their colours move.
 */
import { axes } from "../core/axes"
import { duration, easing, shadow } from "../core/scales"

const { vega, lyra } = axes.style

/** A ring of `color`: `ring-3` (Maia's `ring-[3px]`), `ring-1` in Lyra. */
export const focusRing = (color: string) => ({
  base: `0 0 0 3px ${color}`,
  [lyra]: `0 0 0 1px ${color}`,
})

/**
 * A control's `box-shadow` with its focus and invalid rings, and Vega's `shadow-xs` under them: the
 * ring and the shadow are one property, so Vega restates both states with the shadow composed in.
 */
export const controlShadow = (focus: string, invalid: string) => ({
  ":focus-visible": focusRing(focus),
  '[aria-invalid="true"]': focusRing(invalid),
  [vega]: {
    base: shadow.xs,
    ":focus-visible": `0 0 0 3px ${focus}, ${shadow.xs}`,
    '[aria-invalid="true"]': `0 0 0 3px ${invalid}, ${shadow.xs}`,
  },
})

/** `transition-colors`; Vega's controls are `transition-[color,box-shadow]`. */
export const controlTransition = {
  transitionProperty: {
    base: "color, background-color, border-color",
    [vega]: "color, box-shadow",
  },
  transitionDuration: duration[150],
  transitionTimingFunction: easing.inOut,
}
