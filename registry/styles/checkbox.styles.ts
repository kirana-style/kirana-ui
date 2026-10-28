/**
 * Checkbox, in every style: shadcn/ui's `bases/base/ui/checkbox.tsx` and `bases/aria/ui/checkbox.tsx`
 * with the `cn-checkbox`, `cn-checkbox-aria` and `cn-checkbox-indicator` rules of its style files
 * (MIT). Nova is the base look; the other styles override what differs.
 *
 * Its states are the radio's (`check.styles.ts`), over the look it sets for each style: filled
 * with the primary colour when checked, and dimmed in a Field holding a disabled control
 * (`group-has-disabled/field:`).
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { checkCtx } from "../core/context"
import { duration, easing, shadow, space, spacing } from "../core/scales"
import { check, when } from "../core/states"
import { alpha, surface, theme } from "../core/tokens"
import { checkControl } from "./check.styles"
import { controlPeer, fieldScope } from "./field-scope.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

export const checkbox = {
  // cn-checkbox, cn-checkbox-aria
  root: css(controlPeer.anchor, {
    position: "relative",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: { base: space[4], [sera]: spacing(4.5) },
    height: { base: space[4], [sera]: spacing(4.5) },
    outlineStyle: "none",
    borderRadius: {
      base: "4px",
      [lyra]: "0",
      [maia]: "6px",
      [luma]: "5px",
      [rhea]: "5px",
      [sera]: "0",
    },
    borderWidth: "1px",
    borderStyle: "solid",
    [checkCtx.edge]: {
      base: theme.input,
      [luma]: "transparent",
      [rhea]: "transparent",
    },
    [checkCtx.fill]: {
      base: surface.control,
      [luma]: alpha.input90,
      [rhea]: alpha.input90,
      [sera]: "transparent",
    },
    [checkCtx.ringWidth]: {
      base: "3px",
      [lyra]: "1px",
      [mira]: "2px",
      [sera]: "2px",
    },
    [checkCtx.ringFocus]: {
      base: alpha.ring50,
      [mira]: alpha.ring30,
      [luma]: alpha.ring30,
      [rhea]: alpha.ring30,
      [sera]: alpha.ring30,
    },
    [checkCtx.shadow]: { base: "0 0 #0000", [vega]: shadow.xs },
    ...checkControl,
    color: when(check.checked, theme.primaryForeground),
    boxShadow: { ...checkControl.boxShadow, [vega]: shadow.xs },
    transitionProperty: {
      base: "color, background-color, border-color",
      [vega]: "box-shadow",
      [maia]: "box-shadow",
      [mira]: "box-shadow",
      [luma]: "box-shadow",
      [rhea]: "box-shadow",
      [sera]: "box-shadow",
    },
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    cursor: when(check.disabled, "not-allowed"),
    opacity: {
      ...when(check.disabled, 0.5),
      [fieldScope.within(":has(:disabled)")]: 0.5,
    },
    // A larger target than the box: `after:-inset-x-3 after:-inset-y-2`.
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: `calc(${space[3]} * -1)`,
      insetBlock: `calc(${space[2]} * -1)`,
    },
  }),

  // cn-checkbox-indicator
  indicator: css({
    display: "grid",
    placeContent: "center",
    color: "currentColor",
    transitionProperty: "none",
    [select.child("svg")]: { width: space["3.5"], height: space["3.5"] },
  }),
}
