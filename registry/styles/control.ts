/**
 * What form controls share: the rings they draw on focus and when invalid (as Tailwind composes
 * `ring-*` with `shadow-*`), how their colours move, how they size their icons, and how they fill
 * the Field they sit in.
 */
import { select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
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

/**
 * A control's icons, whatever draws them: the registry's placeholder on the site, the project's
 * icon library once installed (shadcn/ui's CLI puts its component in the placeholder's place), or
 * an icon the project adds itself. Each is the size the control hands down (`ctx.iconSize`, which a
 * size variant changes), never shrunk, never the target of a click: shadcn/ui's
 * `[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&_svg]:pointer-events-none`. Kirana puts
 * a descendant style below the element's own, so an icon that sizes itself wins without the
 * `:not([class*='size-'])` guard. Controls nest (a button in a menu row): each sets the variable,
 * and an icon reads the nearest.
 */
export const controlIcons = {
  [ctx.iconSize]: "1rem",
  [select.descendant("svg")]: {
    width: ctx.iconSize,
    height: ctx.iconSize,
    flexShrink: 0,
    pointerEvents: "none",
  },
}

/** `@md/field-group:`: the field group is at least 28rem wide. */
export const GROUP_MD = "@container field-group (min-width: 28rem)"

/**
 * A part that is a field's own child, asked of the part (the field's `*:` rules, which a child's
 * own `w-fit` would otherwise beat): a label or title fills a vertical field and grows in a
 * horizontal one, but not when it sits in a wrapper of its own, as login-01's password row does.
 */
export const CHILD_OF_VERTICAL =
  ':where([data-slot="field"][data-orientation="vertical"] > *)'
export const CHILD_OF_HORIZONTAL =
  ':where([data-slot="field"][data-orientation="horizontal"] > *)'
export const CHILD_OF_RESPONSIVE =
  ':where([data-slot="field"][data-orientation="responsive"] > *)'

/**
 * A control's width as a Field's child, upstream's `*:w-full` over its own `w-fit`. Here, not in
 * `field.styles.ts`, so a control that reads it (the select trigger) needs no Field markup in a
 * framework that has none.
 */
export const fillInField = {
  base: "fit-content",
  [CHILD_OF_VERTICAL]: "100%",
  [CHILD_OF_RESPONSIVE]: { base: "100%", [GROUP_MD]: "auto" },
}
