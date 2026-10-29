/**
 * Menubar, in every style: shadcn/ui's `bases/base/ui/menubar.tsx` with the `cn-menubar-*` rules of
 * its style files (MIT). Nova is the base look; the other styles override what differs. React Aria
 * has no menubar, so this is Base UI's alone.
 *
 * A menubar's menus are DropdownMenu's parts with `cn-menubar-*` laid over them, so the component
 * composes this module after DropdownMenu's (`dropdown-menu.styles.ts`, `menu.styles.ts`): mostly
 * the same rows, with a wider popup, a larger label, Lyra's deeper inset, and a separator that
 * keeps `-mx-1 my-1` in every style (upstream's component classes, which outrank its style rules).
 * Its checkbox and radio rows are Base UI's own, not DropdownMenu's: the check sits at the start.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"
import { ringAndShadow } from "./menu.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** `pl-*` of a checkbox or radio row, inset or not: the room for its check. */
const CHECK_INSET = {
  base: space[7],
  [vega]: space[8],
  [lyra]: space[8],
  [maia]: spacing(9.5),
  [mira]: spacing(7.5),
  [luma]: spacing(9.5),
  [sera]: spacing(9.5),
}

export const menubar = {
  // cn-menubar and the component's own classes.
  root: css({
    display: "flex",
    alignItems: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    height: {
      base: space[8],
      [vega]: space[9],
      [maia]: space[9],
      [mira]: space[9],
      [luma]: space[9],
      [sera]: space[10],
    },
    gap: {
      [nova]: space["0.5"],
      [vega]: space[1],
      [lyra]: space["0.5"],
    },
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [luma]: radius["3xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    padding: { base: space[1], [nova]: "3px", [rhea]: "3px" },
    boxShadow: { [vega]: shadow.xs },
  }),

  // cn-menubar-trigger and the component's own classes: muted while hovered or open.
  trigger: css({
    display: "flex",
    alignItems: "center",
    outlineStyle: "none",
    userSelect: "none",
    fontWeight: fontWeight.medium,
    backgroundColor: {
      ":hover": theme.muted,
      '[aria-expanded="true"]': theme.muted,
    },
    borderRadius: {
      base: radius.sm,
      [lyra]: "0",
      [maia]: radius.xl,
      [mira]: `calc(${radius.md} - 2px)`,
      [luma]: radius["2xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    paddingInline: {
      base: space["1.5"],
      [vega]: space[2],
      [maia]: space[2],
      [mira]: space[2],
      [luma]: space[2],
      [sera]: space[2],
    },
    paddingBlock: {
      base: "2px",
      [vega]: space[1],
      [lyra]: "calc(0.25rem * 0.8)",
      [maia]: spacing(0.75),
      [mira]: "calc(0.25rem * 0.85)",
      [luma]: spacing(0.75),
      [sera]: spacing(0.75),
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),

  // cn-menubar-content-logical: the logical sides' slide, in `popupMotion` (`overlay.styles.ts`).
  // cn-menubar-shortcut: DropdownMenu's (`menuShortcut`), the same in every style.
  // cn-menubar-content and cn-menubar-sub-content, over DropdownMenu's content and submenu: a
  // wider popup, every submenu `min-w-32`. Maia's ring stays at `/5` in the dark, since this rule
  // follows DropdownMenu's `dark:` one.
  content: css({
    minWidth: {
      base: space[36],
      [maia]: space[48],
      [mira]: space[32],
      [luma]: space[48],
      [sera]: space[48],
    },
    boxShadow: { [maia]: ringAndShadow(alpha.foreground5, shadow["2xl"]) },
  }),
  subContent: css({ minWidth: space[32] }),

  // cn-menubar-item: Sera's is `text-sm`, over its dropdown row's `text-xs` (still in capitals).
  item: css({
    fontSize: { [sera]: fontSize.sm },
    lineHeight: { [sera]: lineHeight.sm },
  }),

  // cn-menubar-item, cn-menubar-sub-trigger: Lyra's inset is `pl-8`, not its dropdown rows' `pl-7`.
  inset: css({
    paddingInlineStart: { "[data-inset]": { [lyra]: space[8] } },
  }),

  // cn-menubar-label, over DropdownMenu's: `text-sm` in Nova, Vega and Rhea, wider sides in Maia,
  // Luma and Sera, and Lyra's inset.
  label: css({
    fontSize: { [nova]: fontSize.sm, [vega]: fontSize.sm, [rhea]: fontSize.sm },
    lineHeight: {
      [nova]: lineHeight.sm,
      [vega]: lineHeight.sm,
      [rhea]: lineHeight.sm,
    },
    paddingInlineEnd: {
      [maia]: spacing(3.5),
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
    },
    paddingInlineStart: {
      [maia]: spacing(3.5),
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
      "[data-inset]": { [lyra]: space[8] },
    },
  }),

  // cn-menubar-separator under the component's `-mx-1 my-1 h-px`, which win in every style.
  separator: css({
    marginInline: { "*": null, base: `calc(${space[1]} * -1)` },
    marginBlock: { "*": null, base: space[1] },
  }),

  // cn-menubar-checkbox-item, cn-menubar-radio-item, after `menuRowBase`: the check at the start,
  // so the row's start is its inset in every style. Vega's are `rounded-md`, not its rows' `sm`;
  // Lyra's checkbox rows end `pr-28` (upstream's own value), its radio rows `pr-2`.
  checkableRow: css({
    borderRadius: { [vega]: radius.md },
    paddingBlock: { [mira]: space["1.5"] },
    lineHeight: { [mira]: lineHeight.xs },
    paddingInlineStart: CHECK_INSET,
    paddingInlineEnd: {
      base: space["1.5"],
      [vega]: space[2],
      [lyra]: space[2],
      [maia]: space[3],
      [mira]: space[2],
      [luma]: space[3],
      [sera]: space[3],
    },
  }),
  checkboxRow: css({ paddingInlineEnd: { [lyra]: space[28] } }),

  // cn-menubar-checkbox-item-indicator, cn-menubar-radio-item-indicator and the component's own
  // classes: a `size-4` box at the row's start.
  indicator: css({
    pointerEvents: "none",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: space[4],
    height: space[4],
    [ctx.iconSize]: "1rem",
    insetInlineStart: {
      base: space["1.5"],
      [vega]: space[2],
      [maia]: space[3],
      [mira]: space[2],
      [luma]: space[3],
      [sera]: space[3],
    },
  }),
}
