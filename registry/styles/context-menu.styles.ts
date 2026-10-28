/**
 * ContextMenu, in every style: shadcn/ui's `bases/base/ui/context-menu.tsx` and
 * `bases/aria/ui/context-menu.tsx` with the `cn-context-menu-*` rules of its style files (MIT). Nova
 * is the base look; the other styles override what differs.
 *
 * Most of a context menu is the shared menu (`menu.styles.ts`), composed as DropdownMenu's is
 * (`dropdown-menu.styles.ts`); this module is what is its own: a wider popup with no anchor width,
 * a check without a box of its own, Maia's closer checkable rows, a submenu trigger whose gap most
 * styles drop, and two submenus. On Base UI a submenu is the content with a larger shadow
 * (`cn-context-menu-subcontent`); on React Aria it takes `cn-context-menu-sub-content-aria` too, a
 * border in Nova, Vega, Lyra and Maia, its own ring in the others.
 *
 * Different from upstream on purpose, as DropdownMenu's: a row's content inherits its colour.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { menuCtx } from "../core/context"
import { shadow, space } from "../core/scales"
import { overlay, when } from "../core/states"
import { alpha, surface, theme } from "../core/tokens"
import { ringAndShadow } from "./menu.styles"
import { ANCHOR_WIDTH } from "./overlay.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** `p-1`, but not Lyra's: its rows meet the popup's edges. */
const PADDING = {
  [nova]: space[1],
  [vega]: space[1],
  [maia]: space[1],
  [mira]: space[1],
  [luma]: space["1.5"],
  [rhea]: space[1],
  [sera]: space["1.5"],
}

/** Luma's and Rhea's rules are fainter too (`bg-border/50`). */
const SEPARATOR = {
  [luma]: {
    base: alpha.border50,
    [axes.menuColor.translucent]: alpha.foreground5,
  },
  [rhea]: {
    base: alpha.border50,
    [axes.menuColor.translucent]: alpha.foreground5,
  },
}

const MIN_WIDTH = {
  base: space[36],
  [maia]: space[48],
  [mira]: space[32],
  [luma]: space[48],
  [sera]: space[48],
}

/** The content's ring, under each style's submenu shadow. */
const SUB_SHADOW = {
  base: ringAndShadow(alpha.foreground10, shadow.lg),
  [maia]: ringAndShadow(alpha.foreground5, shadow.lg),
  [luma]: ringAndShadow(surface.ringSoft, shadow.lg),
  [rhea]: ringAndShadow(surface.ringSoft, shadow.lg),
  [sera]: ringAndShadow(alpha.foreground10, shadow.md),
}

export const contextMenu = {
  // cn-context-menu-trigger and the component's own classes.
  trigger: css({ userSelect: "none" }),

  // cn-context-menu-content-logical: the logical sides' slide, in `popupMotion` (`overlay.styles.ts`).
  // cn-context-menu-item, cn-context-menu-checkbox-item, cn-context-menu-radio-item,
  // cn-context-menu-label, cn-context-menu-separator, cn-context-menu-shortcut: the shared rows
  // (`menuRowBase`, `menuLabel`, `menuSeparator`, `menuShortcut` in `menu.styles.ts`).
  // cn-context-menu-content and the component's own classes, after `menuSurface`.
  content: css({
    minWidth: MIN_WIDTH,
    padding: PADDING,
    [menuCtx.separator]: SEPARATOR,
  }),

  // React Aria's popup takes its trigger's width (`w-(--trigger-width)`), and while it leaves it
  // does not scroll (`data-exiting:overflow-hidden`).
  contentAria: css({
    width: ANCHOR_WIDTH,
    overflowY: { ...when(overlay.ending, "hidden") },
  }),

  // cn-context-menu-subcontent, over the content on Base UI: a larger shadow.
  subContent: css({ boxShadow: SUB_SHADOW }),

  // cn-context-menu-sub-content-aria, over the content on React Aria.
  subContentAria: css({
    width: "auto",
    minWidth: space[32],
    borderWidth: {
      [nova]: "1px",
      [vega]: "1px",
      [lyra]: "1px",
      [maia]: "1px",
    },
    borderColor: theme.border,
    boxShadow: {
      ...SUB_SHADOW,
      [mira]: ringAndShadow(alpha.foreground10, shadow.md),
    },
  }),

  // Maia's checkbox and radio rows are `gap-2`, not its rows' `gap-2.5`.
  checkableRow: css({ gap: { [maia]: space[2] } }),

  // cn-context-menu-sub-trigger: its `gap-1.5` is dropped in Vega, Maia, Luma, Rhea and Sera,
  // which give none of their own.
  subTrigger: css({
    gap: {
      [vega]: "0",
      [maia]: "0",
      [luma]: "0",
      [rhea]: "0",
      [sera]: "0",
    },
  }),

  // The chevron (`cn-rtl-flip ml-auto`), as DropdownMenu's.
  subTriggerIcon: css({
    marginInlineStart: "auto",
    rotate: { ":dir(rtl)": "180deg" },
  }),

  // cn-context-menu-item-indicator: placed at the row's end, centred only in Mira.
  indicator: css({
    pointerEvents: "none",
    position: "absolute",
    insetInlineEnd: space[2],
    display: { [mira]: "flex" },
    alignItems: { [mira]: "center" },
    justifyContent: { [mira]: "center" },
  }),
}
