/**
 * Radio Group, in every style: shadcn/ui's `bases/base/ui/radio-group.tsx` and
 * `bases/aria/ui/radio-group.tsx` with the `cn-radio-group-*` rules of its style files (MIT). Nova
 * is the base look; the other styles override what differs.
 *
 * Its states are the checkbox's (`check.styles.ts`), over the look it sets for each style: filled
 * with the primary colour when checked, but in Luma and Rhea the edge stays what the state gives,
 * and Sera's is outlined in the foreground colour around a foreground dot.
 */
import { css } from "@kirana-style/core"

import { axes, DARK_SCHEME } from "../core/axes"
import { checkCtx } from "../core/context"
import { space, spacing } from "../core/scales"
import { check, when } from "../core/states"
import { alpha, radius, surface, theme } from "../core/tokens"
import { checkControl } from "./check.styles"
import { controlPeer } from "./field-scope.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** `size-2`, `dark:size-2.5` in Luma and Rhea. */
const dotLarger = {
  base: space[2],
  [DARK_SCHEME]: { base: spacing(2.5), [axes.mode.light]: space[2] },
  [axes.mode.dark]: spacing(2.5),
}

export const radioGroup = {
  // cn-radio-group
  root: css({
    display: "grid",
    width: "100%",
    gap: {
      base: space[2],
      [vega]: space[3],
      [maia]: space[3],
      [mira]: space[3],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
  }),

  // cn-radio-group-item, cn-radio-group-item-aria
  item: css(controlPeer.anchor, {
    position: "relative",
    display: "flex",
    aspectRatio: "1 / 1",
    flexShrink: 0,
    width: { base: space[4], [sera]: spacing(4.5) },
    height: { base: space[4], [sera]: spacing(4.5) },
    outlineStyle: "none",
    borderRadius: { base: radius.full, [rhea]: radius["2xl"] },
    borderWidth: "1px",
    borderStyle: "solid",
    [checkCtx.edge]: {
      base: theme.input,
      [luma]: "transparent",
      [rhea]: "transparent",
    },
    [checkCtx.checkedEdge]: {
      base: theme.primary,
      [luma]: checkCtx.stateEdge,
      [rhea]: checkCtx.stateEdge,
      [sera]: theme.foreground,
    },
    [checkCtx.fill]: {
      base: surface.control,
      [luma]: alpha.input90,
      [rhea]: alpha.input90,
      [sera]: "transparent",
    },
    [checkCtx.checkedFill]: { base: theme.primary, [sera]: "transparent" },
    [checkCtx.ringWidth]: { base: "3px", [sera]: "2px" },
    [checkCtx.ringFocus]: {
      base: alpha.ring50,
      [luma]: alpha.ring30,
      [rhea]: alpha.ring30,
      [sera]: alpha.ring30,
    },
    ...checkControl,
    // `data-checked:text-primary-foreground`, in every style but Sera.
    color: when(check.checked, {
      [nova]: theme.primaryForeground,
      [vega]: theme.primaryForeground,
      [lyra]: theme.primaryForeground,
      [maia]: theme.primaryForeground,
      [mira]: theme.primaryForeground,
      [luma]: theme.primaryForeground,
      [rhea]: theme.primaryForeground,
    }),
    cursor: when(check.disabled, "not-allowed"),
    opacity: when(check.disabled, 0.5),
    // A larger target than the circle: `after:-inset-x-3 after:-inset-y-2`.
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: `calc(${space[3]} * -1)`,
      insetBlock: `calc(${space[2]} * -1)`,
    },
  }),

  // cn-radio-group-indicator
  indicator: css({
    display: "flex",
    width: { base: space[4], [sera]: spacing(4.5) },
    height: { base: space[4], [sera]: spacing(4.5) },
    alignItems: "center",
    justifyContent: "center",
  }),

  // cn-radio-group-indicator-icon: the dot, centred on the circle.
  dot: css({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: { base: space[2], [luma]: dotLarger, [rhea]: dotLarger },
    height: { base: space[2], [luma]: dotLarger, [rhea]: dotLarger },
    translate: "-50% -50%",
    borderRadius: radius.full,
    backgroundColor: {
      base: theme.primaryForeground,
      [sera]: theme.foreground,
    },
  }),
}
