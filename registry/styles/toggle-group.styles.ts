/**
 * Toggle Group, in every style: shadcn/ui's `bases/base/ui/toggle-group.tsx` and
 * `bases/aria/ui/toggle-group.tsx` with the `cn-toggle-group*` rules of its style files (MIT). Its
 * items are toggles (`toggle.styles.ts`), restyled here where the group joins them.
 *
 * The gap is `spacing` steps of `0.25rem`, which the markup hands down as `--gap`, as upstream's.
 * With no gap (`data-spacing="0"`) the items join: square inside, rounded only at the group's ends,
 * and an outline item shares its neighbour's border.
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { shadow, space } from "../core/scales"
import { radius } from "../core/tokens"
import { fillInField } from "./field-scope.styles"
import { togglePadding } from "./toggle.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The group, read by its items for its direction. */
export const toggleGroupScope = relation("toggle-group")

const HORIZONTAL = toggleGroupScope.parent('[data-orientation="horizontal"]')
const VERTICAL = toggleGroupScope.parent('[data-orientation="vertical"]')
const JOINED = '[data-spacing="0"]'
const OUTLINE = '[data-variant="outline"]'

/**
 * Each style's corner where the joined items meet the group's ends, which every corner reads.
 */
const END = {
  base: radius.lg,
  [vega]: radius.md,
  [lyra]: "0",
  [maia]: radius["3xl"],
  [mira]: radius.md,
  [luma]: radius["3xl"],
  [rhea]: radius["2xl"],
  [sera]: "0",
}

export const toggleGroup = {
  // cn-toggle-group
  root: css(toggleGroupScope.anchor, {
    display: "flex",
    // `w-fit`, filling a vertical Field as its child (the field's `*:w-full`).
    width: fillInField,
    flexDirection: { base: "row", '[data-orientation="vertical"]': "column" },
    alignItems: { base: "center", '[data-orientation="vertical"]': "stretch" },
    gap: "calc(0.25rem * var(--gap))",
    // Only some styles round the group: each under its own condition, the small size restated.
    borderRadius: {
      [nova]: {
        base: radius.lg,
        '[data-size="sm"]': `min(${radius.md}, 10px)`,
      },
      [vega]: { base: radius.md, '[data-size="sm"]': radius.md },
      [lyra]: { base: "0", '[data-size="sm"]': "0" },
      [maia]: { [JOINED]: { [OUTLINE]: radius["4xl"] } },
      [mira]: { base: radius.md, '[data-size="sm"]': `min(${radius.md}, 8px)` },
      [luma]: { [JOINED]: { [OUTLINE]: radius["3xl"] } },
      [rhea]: { [JOINED]: { [OUTLINE]: radius["2xl"] } },
      [sera]: { [JOINED]: { [OUTLINE]: "0" } },
    },
    boxShadow: { [vega]: { [JOINED]: { [OUTLINE]: shadow.xs } } },
  }),

  // cn-toggle-group-item and the component's own classes, over the toggle's.
  item: css({
    flexShrink: 0,
    zIndex: { ":focus": 10, ":focus-visible": 10 },
    // Joined, the items are square inside and rounded at the group's ends: the first and last
    // across a row (`rounded-l-*`, `rounded-r-*`), or down a column (`rounded-t-*`, `rounded-b-*`).
    borderTopLeftRadius: { [JOINED]: { base: "0", ":first-child": END } },
    borderTopRightRadius: {
      [JOINED]: {
        base: "0",
        [HORIZONTAL]: { ":last-child": END },
        [VERTICAL]: { ":first-child": END },
      },
    },
    borderBottomLeftRadius: {
      [JOINED]: {
        base: "0",
        [HORIZONTAL]: { ":first-child": END },
        [VERTICAL]: { ":last-child": END },
      },
    },
    borderBottomRightRadius: { [JOINED]: { base: "0", ":last-child": END } },
    paddingInlineStart: {
      [JOINED]: togglePadding(
        "inline-start",
        {
          base: space[2],
          [maia]: space[3],
          [luma]: space[3],
          [sera]: space[6],
        },
        {
          base: space["1.5"],
          [maia]: space["2.5"],
          [luma]: space["2.5"],
          [sera]: space[4],
        }
      ),
    },
    paddingInlineEnd: {
      [JOINED]: togglePadding(
        "inline-end",
        {
          base: space[2],
          [maia]: space[3],
          [luma]: space[3],
          [sera]: space[6],
        },
        {
          base: space["1.5"],
          [maia]: space["2.5"],
          [luma]: space["2.5"],
          [sera]: space[4],
        }
      ),
    },
    boxShadow: { [JOINED]: { [vega]: "none" } },
    // An outline item shares its neighbour's border: none on the leading side but the first's.
    borderLeftWidth: {
      [JOINED]: {
        [OUTLINE]: { base: "0", ":first-child": "1px", [VERTICAL]: "1px" },
      },
    },
    borderTopWidth: {
      [JOINED]: {
        [OUTLINE]: { [VERTICAL]: { base: "0", ":first-child": "1px" } },
      },
    },
  }),
}
