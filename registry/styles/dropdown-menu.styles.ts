/**
 * DropdownMenu, in every style: shadcn/ui's `bases/base/ui/dropdown-menu.tsx` and
 * `bases/aria/ui/dropdown-menu.tsx` with the `cn-dropdown-menu-*` rules of its style files (MIT), at
 * commit `25af02b`. Nova is the base look; Vega, Lyra and Maia override what differs.
 *
 * Most of a dropdown menu is the shared menu (`menu.styles.ts`); this module is what is its own.
 * The component composes:
 *
 * - content: `[popupMotion, menuSurface, dropdownMenu.content]`, a submenu's
 *   `[popupMotion, menuSurface, dropdownMenu.subContent]`;
 * - an item: `[menuRowBase, menuRowPadding]`, with `menuRowDestructive` for its destructive
 *   variant; a checkbox or radio item `[menuRowBase, menuCheckableRowPadding]`, its check
 *   `menuIndicator`;
 * - a submenu trigger: `[menuRowBase, menuRowPadding, dropdownMenu.subTrigger]`, its chevron
 *   `dropdownMenu.subTriggerIcon`;
 * - a label `[menuLabel, menuLabelWeight]`, a separator `menuSeparator`, a shortcut `menuShortcut`.
 *
 * Different from upstream on purpose: `not-data-[variant=destructive]:focus:**:text-accent-foreground`
 * and `data-[variant=destructive]:*:[svg]:text-destructive` are not reached into; a row's content
 * inherits its colour, and an icon draws in `currentColor`.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { menuCtx } from "../core/context"
import { shadow, space } from "../core/scales"
import { item, overlay, when } from "../core/states"
import { alpha, theme } from "../core/tokens"
import { ringAndShadow } from "./menu.styles"
import { ANCHOR_WIDTH } from "./overlay.styles"

const { nova, vega, maia } = axes.style

/** `p-1`, but not Lyra's: its rows meet the popup's edges. */
const PADDING = { [nova]: space[1], [vega]: space[1], [maia]: space[1] }

export const dropdownMenu = {
  // cn-dropdown-menu-content and the component's own classes, after `menuSurface`. Maia's ring is
  // stronger in the dark (`dark:ring-foreground/10`); while it leaves, it does not scroll
  // (`data-closed:overflow-hidden`).
  content: css({
    width: ANCHOR_WIDTH,
    minWidth: { base: space[32], [maia]: space[48] },
    padding: PADDING,
    overflowY: { ...when(overlay.ending, "hidden") },
    boxShadow: {
      [maia]: ringAndShadow(
        `light-dark(${alpha.foreground5}, ${alpha.foreground10})`,
        shadow["2xl"]
      ),
    },
  }),

  // cn-dropdown-menu-sub-content, which upstream lays over the content's: its own width, and a
  // larger shadow. It restates every entry the content sets, so it can follow it in a list too.
  subContent: css({
    width: "auto",
    minWidth: { base: "96px", [maia]: space[36] },
    padding: PADDING,
    overflowY: { ...when(overlay.ending, "hidden") },
    boxShadow: {
      base: ringAndShadow(alpha.foreground10, shadow.lg),
      [maia]: ringAndShadow(alpha.foreground5, shadow["2xl"]),
    },
  }),

  // cn-dropdown-menu-sub-trigger: highlighted while its submenu is open. Maia's gap is `gap-2`,
  // not its rows' `gap-2.5`.
  subTrigger: css({
    gap: { [maia]: space[2] },
    backgroundColor: { ...when(item.open, menuCtx.highlight) },
    color: { ...when(item.open, theme.accentForeground) },
  }),

  // The chevron (`cn-rtl-flip ml-auto`): at the row's end, pointing the way the submenu opens.
  subTriggerIcon: css({
    marginInlineStart: "auto",
    rotate: { ":dir(rtl)": "180deg" },
  }),
}
