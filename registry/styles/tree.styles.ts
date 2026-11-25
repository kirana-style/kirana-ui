/**
 * Tree, in every style: items in branches that open and close, on Kirana UI Primitives' `Tree`. The
 * registry's own component, its row drawn as a menu's row (`menuRowBase` and `menuRowPadding`
 * from `menu.styles.ts`, which carry every style's corners, padding, gap and type) and coloured as
 * the sidebar's menu button: the ghost hover, the accent surface and a medium weight while chosen,
 * the control's ring while its item has the keyboard's focus. A branch's children are indented
 * along a guide line, as the sidebar's sub menu is, and open and close over the height the
 * primitive measures (`--tree-group-height`).
 *
 * Written here, the same in every style: one level's step (`space[2.5]` past the guide line), the
 * motion, and the room a leaf keeps where a branch has its chevron. The guide line sits under the
 * chevron's middle, at the row's start padding (the menu row's, per style) and half an icon.
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import { duration, easing, fontWeight, space } from "../core/scales"
import { treeState, when } from "../core/states"
import { alpha, surface, theme } from "../core/tokens"
import { focusRing, laterRings } from "./control"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A tree's node, read by its row for the keyboard's focus. */
export const treeItemScope = relation("tree-item")

/** The row's item has the keyboard's focus. */
const FOCUSED = treeItemScope.parent(":focus-visible")

/** The menu row's start padding in each style (`ROW_INLINE` in `menu.styles.ts`). */
const ROW_START = {
  nova: space["1.5"],
  vega: space[2],
  lyra: space[2],
  maia: space[3],
  mira: space[2],
  luma: space[3],
  rhea: space[2],
  sera: space[3],
}

/** Where the guide line goes: under the middle of the chevron, its 1px line centred. */
const guide = (start: string) => `calc(${start} + ${ctx.iconSize} / 2 - 0.5px)`

export const tree = {
  // The tree: its nodes in a column, its icons at the menu row's size.
  root: css({
    display: "flex",
    width: "100%",
    minWidth: "0",
    flexDirection: "column",
    outlineStyle: "none",
    [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },
  }),

  // A node: its focus is drawn on its row.
  item: css(treeItemScope.anchor, { outlineStyle: "none" }),

  // Over `menuRowBase` and `menuRowPadding`: the sidebar's colours in place of the menu's
  // highlight, which a tree draws as a ring, and a file's name in its own case in Sera.
  row: css({
    textTransform: null,
    letterSpacing: null,
    backgroundColor: {
      "*": null,
      ":hover": surface.hover,
      ...when(treeState.itemRow.selected, theme.accent),
    },
    color: {
      "*": null,
      ...when(treeState.itemRow.selected, theme.accentForeground),
    },
    fontWeight: when(treeState.itemRow.selected, fontWeight.medium),
    boxShadow: {
      [FOCUSED]: focusRing(alpha.ring50, laterRings(alpha.ring30)),
    },
    pointerEvents: when(treeState.itemRow.disabled, "none"),
    opacity: when(treeState.itemRow.disabled, 0.5),
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  }),

  // The chevron: muted, turned a quarter while its branch is open.
  indicator: css({
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: ctx.iconSize,
    height: ctx.iconSize,
    color: theme.mutedForeground,
    rotate: when(treeState.itemIndicator.open, "90deg"),
    transitionProperty: "rotate",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  }),

  // The room a leaf keeps where a branch draws its chevron, so their names line up.
  indicatorSpace: css({ flexShrink: 0, width: ctx.iconSize }),

  // The node's name: as wide as the row allows, cut short with an ellipsis.
  text: css({
    flex: "1 1 0%",
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

  // A branch's children: one step in, along a guide line, their height moving as they open and
  // close. The clip leaves room for a row's ring.
  group: css({
    display: "flex",
    flexDirection: "column",
    marginInlineStart: {
      base: guide(ROW_START.nova),
      [vega]: guide(ROW_START.vega),
      [lyra]: guide(ROW_START.lyra),
      [maia]: guide(ROW_START.maia),
      [mira]: guide(ROW_START.mira),
      [luma]: guide(ROW_START.luma),
      [rhea]: guide(ROW_START.rhea),
      [sera]: guide(ROW_START.sera),
    },
    paddingInlineStart: space["2.5"],
    borderInlineStartWidth: "1px",
    borderColor: theme.border,
    overflow: "clip",
    overflowClipMargin: space[1],
    height: {
      base: "var(--tree-group-height, auto)",
      ...when(treeState.group.startingStyle, "0"),
      ...when(treeState.group.endingStyle, "0"),
    },
    transitionProperty: "height",
    transitionDuration: duration[200],
    transitionTimingFunction: easing.inOut,
  }),
}
