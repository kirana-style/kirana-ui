/**
 * Card, in every style: shadcn/ui's `bases/base/ui/card.tsx` with the `cn-card-*` rules of its style
 * files (MIT), at commit `25af02b`. Nova is the base look; Vega, Lyra and Maia override what differs.
 *
 * The card sets its rhythm once (`cardCtx.spacing`, upstream's `--card-spacing`), by style and size,
 * and every part pads by it. Different from upstream on purpose:
 * - `*:[img:first-child]:rounded-t-xl` reaches a first or last image as a contextual style, which
 *   an image's own corners override;
 * - `[.border-b]:pb-(--card-spacing)` on the header and `[.border-t]:pt-…` on Vega's footer react to
 *   a class the caller adds. Kirana hashes class names, so a caller gives that padding with the
 *   border, in `sx`.
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { cardCtx } from "../core/context"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
} from "../core/scales"
import { alpha, font, radius, theme } from "../core/tokens"

const { vega, lyra, maia } = axes.style

/** The card, read by its title for its size (`group/card`). */
export const cardScope = relation("card")

const SMALL = '[data-size="sm"]'
const WITH_FOOTER = ':has([data-slot="card-footer"])'

/** `rounded-*-xl`, square in Lyra: the outer corners, the header's and the footer's. */
const CORNER = { base: radius.xl, [lyra]: "0" }

export const card = {
  // cn-card and the component's own classes.
  root: css(cardScope.anchor, {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: theme.card,
    color: theme.cardForeground,
    // `[--card-spacing:--spacing(4)]`, 6 in Vega and Maia; smaller cards a step less.
    [cardCtx.spacing]: {
      base: space[4],
      [vega]: space[6],
      [maia]: space[6],
      [SMALL]: { base: space[3], [vega]: space[4], [maia]: space[4] },
    },
    gap: cardCtx.spacing,
    paddingTop: { base: cardCtx.spacing, ":has(> img:first-child)": 0 },
    // A footer sits flush to the bottom in Nova and Lyra, which drop the card's own padding there.
    paddingBottom: {
      base: cardCtx.spacing,
      [WITH_FOOTER]: {
        base: 0,
        [vega]: cardCtx.spacing,
        [maia]: cardCtx.spacing,
      },
    },
    borderRadius: { base: radius.xl, [lyra]: "0", [maia]: radius["2xl"] },
    // `ring-1 ring-foreground/10`, with `shadow-xs` under it in Vega.
    boxShadow: {
      base: `0 0 0 1px ${alpha.foreground10}`,
      [vega]: `0 0 0 1px ${alpha.foreground10}, ${shadow.xs}`,
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: leading.relaxed },
    [select.child("img:first-child")]: {
      borderStartStartRadius: CORNER,
      borderStartEndRadius: CORNER,
    },
    [select.child("img:last-child")]: {
      borderEndStartRadius: CORNER,
      borderEndEndRadius: CORNER,
    },
  }),

  // cn-card-header: a grid that makes room for an action beside the title and description.
  header: css({
    containerType: "inline-size",
    containerName: "card-header",
    display: "grid",
    gridAutoRows: "min-content",
    alignItems: "start",
    gap: { base: space[1], [maia]: space[2] },
    paddingInline: cardCtx.spacing,
    borderStartStartRadius: CORNER,
    borderStartEndRadius: CORNER,
    gridTemplateColumns: { ':has([data-slot="card-action"])': "1fr auto" },
    gridTemplateRows: { ':has([data-slot="card-description"])': "auto auto" },
  }),

  // cn-card-title and cn-font-heading. A small card's title is `text-sm`, except in Maia.
  title: css({
    fontFamily: font.heading,
    fontWeight: fontWeight.medium,
    fontSize: {
      base: fontSize.base,
      [lyra]: fontSize.sm,
      [cardScope.within(SMALL)]: { base: fontSize.sm, [maia]: fontSize.base },
    },
    lineHeight: {
      base: leading.snug,
      [vega]: leading.normal,
      [lyra]: lineHeight.sm,
      [maia]: lineHeight.base,
    },
  }),

  // cn-card-description
  description: css({
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: leading.relaxed },
  }),

  // The component's own classes: beside the title and description, at the end.
  action: css({
    gridColumnStart: 2,
    // `row-span-2 row-start-1` as longhands: `gridRow: "span 2"` would leave the end at `auto`.
    gridRowStart: 1,
    gridRowEnd: "span 2",
    alignSelf: "start",
    justifySelf: "end",
  }),

  // cn-card-content
  content: css({ paddingInline: cardCtx.spacing }),

  // cn-card-footer: a tinted band in Nova, a rule in Lyra, padding alone in Vega and Maia.
  footer: css({
    display: "flex",
    alignItems: "center",
    paddingInline: cardCtx.spacing,
    paddingBlock: { base: cardCtx.spacing, [vega]: 0, [maia]: 0 },
    borderEndStartRadius: CORNER,
    borderEndEndRadius: CORNER,
    borderTopWidth: { base: "1px", [vega]: 0, [maia]: 0 },
    borderTopStyle: "solid",
    borderTopColor: theme.border,
    backgroundColor: {
      base: alpha.muted50,
      [vega]: "transparent",
      [lyra]: "transparent",
      [maia]: "transparent",
    },
  }),
}
