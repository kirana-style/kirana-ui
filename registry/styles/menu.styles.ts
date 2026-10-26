/**
 * What every menu-shaped popup shares (DropdownMenu and Select now; ContextMenu, Menubar and
 * Combobox later): the surface and its rows, from shadcn/ui's `cn-dropdown-menu-*`, `cn-select-*`
 * and `cn-menu-translucent` rules (MIT), at commit `25af02b`. Nova is the base look; the other styles
 * override what differs.
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
  leading,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  spacing,
  zIndex,
} from "../core/scales"
import { item, when } from "../core/states"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlIcons } from "./control"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style
const { inverted, translucent } = axes.menuColor

/** A menu row, read by its shortcut (`group/dropdown-menu-item`). */
export const menuRow = relation("menu-row")

/** `ring-1 ring-foreground/10` composed before the drop shadow, as Tailwind composes them. */
export const ringAndShadow = (ring: string, drop: string) =>
  `0 0 0 1px ${ring}, ${drop}`

/** A row's and a label's sides: `px-1.5`, `px-2` in Vega, Lyra, Mira and Rhea, `px-3` in Maia,
 * Luma and Sera. */
const ROW_INLINE = {
  base: space["1.5"],
  [vega]: space[2],
  [lyra]: space[2],
  [maia]: space[3],
  [mira]: space[2],
  [luma]: space[3],
  [rhea]: space[2],
  [sera]: space[3],
}

/** `data-inset:pl-*`: the room a row or a label leaves for a leading icon. */
const INSET = {
  base: space[7],
  [vega]: space[8],
  [maia]: spacing(9.5),
  [mira]: spacing(7.5),
  [luma]: spacing(9.5),
  [sera]: spacing(9.5),
}

/** Glass's separator still wins over a style's fainter one (`bg-border/50`). */
const FAINT_SEPARATOR = {
  base: alpha.border50,
  [axes.menuColor.translucent]: alpha.foreground5,
}

/** What positions a menu-shaped popup (`isolate z-50 outline-none` on Base UI's positioner). */
export const menuPositioner = css({
  isolation: "isolate",
  zIndex: zIndex.popover,
  outlineStyle: "none",
})

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
    [luma]: radius["3xl"],
    [rhea]: radius["2xl"],
    [sera]: "0",
  },
  // Luma and Rhea ring their popups at `/5` (`/10` in dark) over `shadow-lg`.
  boxShadow: {
    base: ringAndShadow(alpha.foreground10, shadow.md),
    [maia]: ringAndShadow(alpha.foreground5, shadow["2xl"]),
    [luma]: ringAndShadow(surface.ringSoft, shadow.lg),
    [rhea]: ringAndShadow(surface.ringSoft, shadow.lg),
  },
  ...controlIcons,

  // cn-menu-target: `inverted` puts the menu in the dark scheme.
  colorScheme: { [inverted]: "dark" },

  // cn-menu-translucent
  position: { [translucent]: "relative" },
  backgroundColor: { base: theme.popover, [translucent]: alpha.popover70 },
  transitionProperty: { [translucent]: "none" },
  [menuCtx.highlight]: { [translucent]: alpha.foreground10 },
  [menuCtx.destructive]: { [translucent]: theme.accentForeground },
  [menuCtx.destructiveHighlight]: { [translucent]: alpha.foreground10 },
  // Maia's, Mira's and Sera's rules are fainter (`bg-border/50`); glass's own colour still wins
  // there, as upstream's more specific `cn-menu-translucent` rule does. Luma's and Rhea's differ by
  // menu (`dropdown-menu.styles.ts`).
  [menuCtx.separator]: {
    [translucent]: alpha.foreground5,
    [maia]: FAINT_SEPARATOR,
    [mira]: FAINT_SEPARATOR,
    [sera]: FAINT_SEPARATOR,
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

/** React Aria's menu inside its popover: it scrolls within the popover's height. */
export const menuList = css({
  maxHeight: "inherit",
  overflowX: "hidden",
  overflowY: "auto",
  outlineStyle: "none",
})

/** Every row: an item, a checkbox or radio item, a submenu trigger, a select item. */
// cn-dropdown-menu-item, cn-dropdown-menu-checkbox-item, cn-dropdown-menu-radio-item
export const menuRowBase = css(menuRow.anchor, {
  position: "relative",
  display: "flex",
  cursor: "default",
  alignItems: "center",
  outlineStyle: "none",
  userSelect: "none",
  pointerEvents: { ...when(item.disabled, "none") },
  opacity: { ...when(item.disabled, 0.5) },
  ...controlIcons,
  [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },

  gap: {
    base: space["1.5"],
    [vega]: space[2],
    [lyra]: space[2],
    [maia]: space["2.5"],
    [mira]: space[2],
    [luma]: space["2.5"],
    [rhea]: space[2],
    [sera]: space["2.5"],
  },
  borderRadius: {
    base: radius.md,
    [vega]: radius.sm,
    [lyra]: "0",
    [maia]: radius.xl,
    [luma]: radius["2xl"],
    [rhea]: radius.xl,
    [sera]: "0",
  },
  paddingBlock: {
    base: space[1],
    [vega]: space["1.5"],
    [lyra]: space[2],
    [maia]: space[2],
    [luma]: space[2],
    [rhea]: space["1.5"],
    [sera]: space[2],
  },
  // Mira's and Rhea's rows are at least `min-h-7`.
  minHeight: { [mira]: space[7], [rhea]: space[7] },
  // Sera's rows are medium capitals, spaced, in `text-xs` (Select's rows are not: `select.item`).
  fontSize: {
    base: fontSize.sm,
    [lyra]: fontSize.xs,
    [mira]: fontSize.xs,
    [sera]: fontSize.xs,
  },
  lineHeight: {
    base: lineHeight.sm,
    [lyra]: lineHeight.xs,
    [mira]: leading.relaxed,
    [sera]: lineHeight.xs,
  },
  fontWeight: { [luma]: fontWeight.medium, [sera]: fontWeight.medium },
  textTransform: { [sera]: "uppercase" },
  letterSpacing: { [sera]: letterSpacing.wider },
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
  // Mira's checkable rows are `py-1.5` and plain `text-xs`.
  paddingBlock: { [mira]: space["1.5"] },
  lineHeight: { [mira]: lineHeight.xs },
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
// cn-dropdown-menu-item-indicator
export const menuIndicator = css({
  pointerEvents: "none",
  position: "absolute",
  insetInlineEnd: space[2],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

/** A group's label, inset like a row. DropdownMenu sets its weight; Select's has none. */
// cn-dropdown-menu-label, cn-select-label
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
    [mira]: space["1.5"],
    [luma]: space["2.5"],
    [sera]: space[2],
  },
  // Sera's labels are semibold, spaced capitals.
  fontWeight: { [sera]: fontWeight.semibold },
  textTransform: { [sera]: "uppercase" },
  letterSpacing: { [sera]: letterSpacing.wider },
})

/** A rule between groups: `-mx-1 my-1 h-px`, without the margin in Lyra; its colour is the surface's. */
// cn-dropdown-menu-separator, cn-select-separator
export const menuSeparator = css({
  height: "1px",
  marginInline: {
    base: `calc(${space[1]} * -1)`,
    [luma]: `calc(${space["1.5"]} * -1)`,
    [sera]: `calc(${space["1.5"]} * -1)`,
  },
  // `my-1`, but not Lyra's; `my-1.5` in Luma and Sera.
  marginBlock: {
    [nova]: space[1],
    [vega]: space[1],
    [maia]: space[1],
    [mira]: space[1],
    [luma]: space["1.5"],
    [rhea]: space[1],
    [sera]: space["1.5"],
  },
  backgroundColor: menuCtx.separator,
})

/** A row's keyboard shortcut, in the highlight's colour while its row has focus. */
// cn-dropdown-menu-shortcut
export const menuShortcut = css({
  marginInlineStart: "auto",
  // Mira's `text-[0.625rem]` makes `cn` drop `text-xs`, and the line height is inherited.
  fontSize: { base: fontSize.xs, [mira]: "0.625rem" },
  lineHeight: { base: lineHeight.xs, [mira]: "inherit" },
  letterSpacing: letterSpacing.widest,
  color: {
    base: theme.mutedForeground,
    [menuRow.within(":focus")]: theme.accentForeground,
  },
})

/** For a component that wants a label's weight. */
export const menuLabelWeight = css({
  // Nova's and Vega's; Lyra's and Maia's labels have no weight of their own.
  fontWeight: { [nova]: fontWeight.medium, [vega]: fontWeight.medium },
})
