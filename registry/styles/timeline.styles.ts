/**
 * Timeline, in every style: an ordered list of events down a line, plain markup with no behaviour.
 * Its text follows each style's body size as Steps' does, its colours the theme's tokens, so it
 * follows the design.
 *
 * The list (`timelineScope`) carries its orientation and alignment (`data-orientation`,
 * `data-align`), which each item reads of its parent. An item is a grid that places its marker,
 * its content and the line to the next item (`TimelineConnector`) by area, so the parts inside it
 * only name their area; the last item draws no line and leaves no gap after it. Down the page, an
 * aligned-alternately list puts every other item's content on the other side of the line once the
 * list is at least 32rem wide (a container query on the list); across the page, every other
 * item's content goes above the line.
 *
 * A marker given nothing to draw is a small round dot, centred on a line of the title's text; given
 * an icon it is a round mark the size of an avatar, the icon sized as Marker's icon is (`size-4`,
 * `size-3.5` in Lyra and Mira); given an avatar it is the avatar alone. Beside such a mark the
 * content moves down so that a line of the title's text sits on the mark's centre. Its variants:
 * `default` (a ring in the primary colour, or an outline around an icon), `primary` (filled),
 * `muted` (for an event to come).
 *
 * Its own sizes, the same in every style: the dot (`size-2.5`), a mark with an icon (`size-8`, the
 * avatar's default), the gap between the line and the content (`gap-3`), the gap after an item
 * (`pb-6` down, `pr-4` across) and between the line and the content across (`gap-y-3`).
 */
import { css, recipe, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { radius, theme } from "../core/tokens"

const { lyra, mira } = axes.style

/** The list, read by its items for its orientation and alignment. */
export const timelineScope = relation("timeline")
/** An item, read by its marker, connector and content. */
export const timelineItemScope = relation("timeline-item")

/** An item in a list across the page. */
const ACROSS = timelineScope.parent('[data-orientation="horizontal"]')
/** An item in a list aligned alternately. */
const ALTERNATE = timelineScope.parent('[data-align="alternate"]')
/** A list wide enough for its items on both sides of the line. */
const WIDE = "@container timeline (min-width: 32rem)"
/** A part inside an item of a list across the page. */
const IN_ACROSS = timelineScope.within('[data-orientation="horizontal"]')
/** A part inside the last item. */
const IN_LAST = timelineItemScope.within(":last-child")
/** A part inside an item whose marker draws an icon or an avatar. */
const HAS_MARK = timelineItemScope.within(
  ':has(> [data-slot="timeline-marker"] > *)'
)

/** The dot's size. */
const DOT = space["2.5"]
/** A mark's size when it draws an icon: an avatar's default. */
const MARK = space[8]
/** The gap after an item down the page, and across it. */
const GAP_DOWN = space[6]
const GAP_ACROSS = space[4]
/** An icon in a mark, as Marker's icon. */
const ICON = { base: space[4], [lyra]: spacing(3.5), [mira]: spacing(3.5) }

/** The text of an event, as each style sizes body text. */
const TEXT_SIZE = {
  base: fontSize.sm,
  [lyra]: fontSize.xs,
  [mira]: fontSize.xs,
}
const TEXT_LEADING = {
  base: lineHeight.sm,
  [lyra]: lineHeight.xs,
  [mira]: leading.relaxed,
}

// The item's grid in each layout: down the page (start, or alternate when wide) and across it.
const AREAS_DOWN = '"marker content" "connector content" "connector ."'
const AREAS_RIGHT = '". marker content" ". connector content" ". connector ."'
const AREAS_LEFT = '"content marker ." "content connector ." ". connector ."'
const AREAS_ACROSS = '"marker connector connector" "content content ."'
const AREAS_BELOW = '". . ." "marker connector connector" "content content ."'
const AREAS_ABOVE = '"content content ." "marker connector connector" ". . ."'

const COLUMNS_DOWN = "auto minmax(0, 1fr)"
const COLUMNS_BOTH = "minmax(0, 1fr) auto minmax(0, 1fr)"
const COLUMNS_ACROSS = {
  base: `auto minmax(0, 1fr) ${GAP_ACROSS}`,
  ":last-child": "auto minmax(0, 1fr) 0",
}

const ROWS_DOWN = `auto 1fr ${GAP_DOWN}`
const ROWS_DOWN_LAST = "auto 1fr 0"
const ROWS_ACROSS_ANY = { base: "auto auto", [ALTERNATE]: "1fr auto 1fr" }

export const timeline = {
  root: css(timelineScope.anchor, {
    display: "flex",
    flexDirection: { base: "column", '[data-orientation="horizontal"]': "row" },
    width: "100%",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    containerType: "inline-size",
    containerName: "timeline",
  }),

  // Down the page, a list aligned alternately takes its three columns only when wide (`WIDE`), and
  // across the page its rows on both sides at every width; across restates its own value inside
  // the wide entries, which would otherwise outrank it.
  item: css(timelineItemScope.anchor, {
    display: "grid",
    minWidth: 0,
    flex: { [ACROSS]: "1 1 0%" },
    columnGap: { base: space[3], [ACROSS]: "0" },
    rowGap: { [ACROSS]: space[3] },
    // Across the page the items stretch to the tallest; its rows keep their own height at the
    // top, or a shorter item's spare room would push its mark below the line.
    alignContent: { [ACROSS]: "start" },
    gridTemplateColumns: {
      base: COLUMNS_DOWN,
      [ACROSS]: COLUMNS_ACROSS,
      [ALTERNATE]: {
        [WIDE]: { base: COLUMNS_BOTH, [ACROSS]: COLUMNS_ACROSS },
      },
    },
    // Rows on both sides of the line across the page, at every width.
    gridTemplateRows: {
      base: ROWS_DOWN,
      ":last-child": { base: ROWS_DOWN_LAST, [ACROSS]: ROWS_ACROSS_ANY },
      [ACROSS]: ROWS_ACROSS_ANY,
    },
    gridTemplateAreas: {
      base: AREAS_DOWN,
      [ACROSS]: AREAS_ACROSS,
      [ALTERNATE]: {
        [WIDE]: {
          base: AREAS_RIGHT,
          ":nth-child(even)": {
            base: AREAS_LEFT,
            [ACROSS]: AREAS_ABOVE,
          },
          [ACROSS]: AREAS_BELOW,
        },
        [ACROSS]: { base: AREAS_BELOW, ":nth-child(even)": AREAS_ABOVE },
      },
    },
    // An item on the line's left reads towards it.
    textAlign: {
      [ALTERNATE]: {
        [WIDE]: { ":nth-child(even)": { base: "end", [ACROSS]: "start" } },
      },
    },
  }),

  // The mark on the line: a dot, or a round mark around an icon, or an avatar.
  marker: recipe({
    base: {
      gridArea: "marker",
      justifySelf: "center",
      alignSelf: "center",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxSizing: "border-box",
      // The title's size, so that `1lh` is its first line's height.
      fontSize: TEXT_SIZE,
      lineHeight: TEXT_LEADING,
      width: {
        base: DOT,
        ":has(> *)": {
          base: MARK,
          ':has(> [data-slot="avatar"])': "auto",
        },
      },
      height: {
        base: DOT,
        ":has(> *)": {
          base: MARK,
          ':has(> [data-slot="avatar"])': "auto",
        },
      },
      // A dot sits on the middle of its title's first line.
      marginBlock: {
        base: `calc((1lh - ${DOT}) / 2)`,
        ":has(> *)": "0",
      },
      borderRadius: radius.full,
      borderWidth: { base: "1px", ':has(> [data-slot="avatar"])': "0" },
      borderStyle: "solid",
      [select.descendant("svg")]: {
        width: ICON,
        height: ICON,
        flexShrink: 0,
        pointerEvents: "none",
      },
    },
    variants: {
      variant: {
        // A dot's ring in the primary colour, a mark's as an outline button's.
        default: {
          color: theme.foreground,
          backgroundColor: theme.background,
          borderColor: { base: theme.primary, ":has(> *)": theme.border },
        },
        primary: {
          color: theme.primaryForeground,
          backgroundColor: theme.primary,
          borderColor: theme.primary,
        },
        muted: {
          color: theme.mutedForeground,
          backgroundColor: theme.muted,
          borderColor: theme.border,
        },
      },
    },
    defaultVariants: { variant: "default" },
  }),

  // The line to the next item: down from the marker to the next item, or across to it.
  connector: css({
    gridArea: "connector",
    display: { [IN_LAST]: "none" },
    justifySelf: { base: "center", [IN_ACROSS]: "stretch" },
    alignSelf: { base: "stretch", [IN_ACROSS]: "center" },
    width: { base: "1px", [IN_ACROSS]: "auto" },
    height: { [IN_ACROSS]: "1px" },
    marginInline: { [IN_ACROSS]: space[1] },
    backgroundColor: theme.border,
  }),

  // Beside a mark, its first line on the mark's centre.
  content: css({
    gridArea: "content",
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    minWidth: 0,
    fontSize: TEXT_SIZE,
    lineHeight: TEXT_LEADING,
    paddingTop: {
      [HAS_MARK]: { base: `calc((${MARK} - 1lh) / 2)`, [IN_ACROSS]: "0" },
    },
  }),

  title: css({
    fontSize: TEXT_SIZE,
    lineHeight: TEXT_LEADING,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  }),

  description: css({
    margin: 0,
    fontSize: TEXT_SIZE,
    lineHeight: TEXT_LEADING,
    color: theme.mutedForeground,
  }),

  time: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}
