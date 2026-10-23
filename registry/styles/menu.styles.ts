/**
 * What every menu-shaped popup shares (DropdownMenu and Select now; ContextMenu, Menubar and
 * Combobox later): the surface and its rows, from shadcn/ui's `cn-dropdown-menu-*`, `cn-select-*`
 * and `cn-menu-translucent` rules (MIT), at commit `25af02b`. Nova is the base look; Vega, Lyra and
 * Maia override what differs.
 *
 * The menu colour is read from `<html>` (`axes.menuColor`), never patched onto the elements as
 * upstream's preview does: `inverted` draws the menu in the dark scheme, `translucent` makes it glass
 * over a blurred backdrop, without motion (`animate-none!`). The surface hands its rows the colours
 * that differ between solid and glass through `menuCtx`, so a row never knows which it is on.
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx, menuCtx } from "../core/context"
import {
  blur,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  zIndex,
} from "../core/scales"
import { item, when } from "../core/states"
import { alpha, radius, theme } from "../core/tokens"

const { vega, lyra, maia } = axes.style
const { inverted, translucent } = axes.menuColor

/** A menu row, read by its shortcut (`group/dropdown-menu-item`). */
export const menuRow = relation("menu-row")

/** `ring-1 ring-foreground/10` composed before the drop shadow, as Tailwind composes them. */
export const ringAndShadow = (ring: string, drop: string) =>
  `0 0 0 1px ${ring}, ${drop}`

/** A row's and a label's sides: `px-1.5`, `px-2` in Vega and Lyra, `px-3` in Maia. */
const ROW_INLINE = {
  base: space["1.5"],
  [vega]: space[2],
  [lyra]: space[2],
  [maia]: space[3],
}

/**
 * `data-inset:pl-*`: the room a row or a label leaves for a leading icon. Maia's `pl-9.5` is a
 * multiple of 0.25 the scale has no step for (KF-013).
 */
const INSET = { base: space[7], [vega]: space[8], [maia]: "2.375rem" }

/** The popup itself: solid, inverted or glass by the menu colour. Padding is the menu's own. */
export const menuSurface = css({
  zIndex: zIndex.popover,
  maxHeight: "var(--available-height)",
  overflowX: "hidden",
  overflowY: "auto",
  outlineStyle: "none",
  color: theme.popoverForeground,
  borderRadius: {
    base: radius.lg,
    [vega]: radius.md,
    [lyra]: "0",
    [maia]: radius["2xl"],
  },
  boxShadow: {
    base: ringAndShadow(alpha.foreground10, shadow.md),
    [maia]: ringAndShadow(alpha.foreground5, shadow["2xl"]),
  },
  [ctx.iconSize]: "1rem",

  // cn-menu-target: `inverted` puts the menu in the dark scheme.
  colorScheme: { [inverted]: "dark" },

  // cn-menu-translucent
  position: { [translucent]: "relative" },
  backgroundColor: { base: theme.popover, [translucent]: alpha.popover70 },
  transitionProperty: { [translucent]: "none" },
  [menuCtx.highlight]: { [translucent]: alpha.foreground10 },
  [menuCtx.destructive]: { [translucent]: theme.accentForeground },
  [menuCtx.destructiveHighlight]: { [translucent]: alpha.foreground10 },
  // Maia's rules are fainter (`bg-border/50`); glass's own colour still wins there, as upstream's
  // more specific `cn-menu-translucent` rule does.
  [menuCtx.separator]: {
    [translucent]: alpha.foreground5,
    [maia]: { base: alpha.border50, [translucent]: alpha.foreground5 },
  },
  "::before": {
    content: { [translucent]: "''" },
    pointerEvents: { [translucent]: "none" },
    position: { [translucent]: "absolute" },
    inset: { [translucent]: 0 },
    zIndex: { [translucent]: -1 },
    borderRadius: { [translucent]: "inherit" },
    backdropFilter: { [translucent]: `blur(${blur["2xl"]}) saturate(150%)` },
  },
})

/** Every row: an item, a checkbox or radio item, a submenu trigger, a select item. */
export const menuRowBase = css(menuRow.anchor, {
  position: "relative",
  display: "flex",
  cursor: "default",
  alignItems: "center",
  outlineStyle: "none",
  userSelect: "none",
  pointerEvents: { ...when(item.disabled, "none") },
  opacity: { ...when(item.disabled, 0.5) },
  [ctx.iconSize]: "1rem",

  gap: {
    base: space["1.5"],
    [vega]: space[2],
    [lyra]: space[2],
    [maia]: space["2.5"],
  },
  borderRadius: {
    base: radius.md,
    [vega]: radius.sm,
    [lyra]: "0",
    [maia]: radius.xl,
  },
  paddingBlock: {
    base: space[1],
    [vega]: space["1.5"],
    [lyra]: space[2],
    [maia]: space[2],
  },
  fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
  lineHeight: { base: lineHeight.sm, [lyra]: lineHeight.xs },
  backgroundColor: {
    ":focus": menuCtx.highlight,
    ...when(item.highlighted, menuCtx.highlight),
  },
  color: {
    ":focus": theme.accentForeground,
    ...when(item.highlighted, theme.accentForeground),
  },
})

/** A plain row's sides, and its inset. */
export const menuRowPadding = css({
  paddingInlineEnd: ROW_INLINE,
  paddingInlineStart: { ...ROW_INLINE, "[data-inset]": INSET },
})

/** A row with a trailing check (`pr-8`): checkbox and radio items, select items. */
export const menuCheckableRowPadding = css({
  paddingInlineEnd: space[8],
  paddingInlineStart: { ...ROW_INLINE, "[data-inset]": INSET },
})

/** `data-[variant=destructive]`: a destructive row, tinted rather than highlighted. */
export const menuRowDestructive = css({
  color: {
    base: menuCtx.destructive,
    ":focus": menuCtx.destructive,
    ...when(item.highlighted, menuCtx.destructive),
  },
  backgroundColor: {
    ":focus": menuCtx.destructiveHighlight,
    ...when(item.highlighted, menuCtx.destructiveHighlight),
  },
})

/** The check of a checkbox or radio row, at the row's end. */
export const menuIndicator = css({
  pointerEvents: "none",
  position: "absolute",
  insetInlineEnd: space[2],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

/** A group's label, inset like a row. DropdownMenu sets its weight; Select's has none. */
export const menuLabel = css({
  color: theme.mutedForeground,
  fontSize: fontSize.xs,
  lineHeight: lineHeight.xs,
  paddingInlineEnd: ROW_INLINE,
  paddingInlineStart: { ...ROW_INLINE, "[data-inset]": INSET },
  paddingBlock: {
    base: space[1],
    [vega]: space["1.5"],
    [lyra]: space[2],
    [maia]: space["2.5"],
  },
})

/** A rule between groups: `-mx-1 my-1 h-px`, without the margin in Lyra; its colour is the surface's. */
export const menuSeparator = css({
  pointerEvents: "none",
  height: "1px",
  marginInline: `calc(${space[1]} * -1)`,
  marginBlock: { base: space[1], [lyra]: "0" },
  backgroundColor: menuCtx.separator,
})

/** A row's keyboard shortcut, in the highlight's colour while its row has focus. */
export const menuShortcut = css({
  marginInlineStart: "auto",
  fontSize: fontSize.xs,
  lineHeight: lineHeight.xs,
  letterSpacing: letterSpacing.widest,
  color: {
    base: theme.mutedForeground,
    [menuRow.within(":focus")]: theme.accentForeground,
  },
})

/** For a component that wants a label's weight. */
export const menuLabelWeight = css({
  fontWeight: { base: fontWeight.medium, [lyra]: "inherit", [maia]: "inherit" },
})
