/**
 * Switch, in every style: shadcn/ui's `bases/base/ui/switch.tsx` and `bases/aria/ui/switch.tsx` with
 * the `cn-switch*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs.
 *
 * Its states are the checkbox's (`check.styles.ts`), over the look it sets for each style: a track
 * filled with the primary colour when checked, edged only in Luma, Rhea and Sera (in the primary
 * colour when checked), and a thumb that slides across it.
 */
import { css, relation } from "@kirana-style/core"

import { axes, DARK_SCHEME } from "../core/axes"
import { checkCtx } from "../core/context"
import { duration, easing, shadow, space, spacing } from "../core/scales"
import { check, when } from "../core/states"
import { alpha, radius, theme } from "../core/tokens"
import { checkControl } from "./check.styles"
import { controlPeer } from "./field-scope.styles"

const { vega, lyra, mira, luma, rhea, sera } = axes.style

/** The switch, read by its thumb for its size (`group/switch`). */
export const switchScope = relation("switch")

const SM = '[data-size="sm"]'
const THUMB_SM = switchScope.parent(SM)

/** `not-dark:bg-clip-padding`: the light scheme only. */
const lightOnly = (value: string, otherwise: string) => ({
  base: value,
  [DARK_SCHEME]: { base: otherwise, [axes.mode.light]: value },
  [axes.mode.dark]: otherwise,
})

export const switchStyles = {
  // cn-switch, cn-switch-aria
  root: css(controlPeer.anchor, switchScope.anchor, {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    outlineStyle: "none",
    transitionProperty: "all",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    height: {
      base: "18.4px",
      [SM]: "14px",
      [mira]: { base: "16.6px", [SM]: "14px" },
      [luma]: { base: space[5], [SM]: space[4] },
      [rhea]: { base: space[5], [SM]: space[4] },
      [sera]: { base: spacing(4.5), [SM]: spacing(3.5) },
    },
    width: {
      base: "32px",
      [SM]: "24px",
      [mira]: { base: "28px", [SM]: "24px" },
      [luma]: { base: space[11], [SM]: space[7] },
      [rhea]: { base: space[8], [SM]: space[6] },
      [sera]: { base: spacing(8.25), [SM]: spacing(6.25) },
    },
    borderRadius: { base: radius.full, [rhea]: radius["2xl"], [sera]: "0" },
    borderWidth: { base: "1px", [luma]: "2px", [rhea]: "2px" },
    borderStyle: "solid",
    [checkCtx.edge]: { base: "transparent", [sera]: alpha.input50 },
    [checkCtx.checkedEdge]: {
      base: checkCtx.stateEdge,
      [luma]: theme.primary,
      [rhea]: theme.primary,
      [sera]: theme.primary,
    },
    [checkCtx.fill]: {
      base: `light-dark(${theme.input}, ${alpha.input80})`,
      [luma]: alpha.input90,
      [rhea]: alpha.input90,
      [sera]: theme.input,
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
    boxShadow: { ...checkControl.boxShadow, [vega]: shadow.xs },
    cursor: { "[data-disabled]": "not-allowed" },
    opacity: { "[data-disabled]": 0.5 },
    // A larger target than the track: `after:-inset-x-3 after:-inset-y-2`.
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: `calc(${space[3]} * -1)`,
      insetBlock: `calc(${space[2]} * -1)`,
    },
  }),

  // cn-switch-thumb, cn-switch-thumb-aria
  thumb: css({
    pointerEvents: "none",
    display: "block",
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    width: {
      base: space[4],
      [THUMB_SM]: space[3],
      [mira]: { base: spacing(3.5), [THUMB_SM]: space[3] },
      [luma]: { base: space[6], [THUMB_SM]: space[4] },
      [sera]: { base: spacing(3.5), [THUMB_SM]: spacing(2.5) },
    },
    height: {
      base: space[4],
      [THUMB_SM]: space[3],
      [mira]: { base: spacing(3.5), [THUMB_SM]: space[3] },
      [sera]: { base: spacing(3.5), [THUMB_SM]: spacing(2.5) },
    },
    borderRadius: { base: radius.full, [rhea]: radius["2xl"], [sera]: "0" },
    boxShadow: { [luma]: shadow.sm, [rhea]: shadow.sm },
    backgroundClip: {
      [luma]: lightOnly("padding-box", "border-box"),
      [rhea]: lightOnly("padding-box", "border-box"),
    },
    // `bg-background`, the foreground's colour in the dark scheme (the primary's text when checked).
    backgroundColor: {
      base: `light-dark(${theme.background}, ${theme.foreground})`,
      ...when(
        check.checked,
        `light-dark(${theme.background}, ${theme.primaryForeground})`
      ),
    },
    translate: {
      base: "0",
      [sera]: spacing(0.25),
      ...when(check.checked, {
        base: "calc(100% - 2px)",
        [luma]: "calc(100% - 8px)",
        [rhea]: "calc(100% - 4px)",
        [sera]: "calc(100% + 2px)",
      }),
    },
  }),
}
