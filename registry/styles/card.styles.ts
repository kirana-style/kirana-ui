/**
 * Card, in every style: shadcn/ui's `bases/base/ui/card.tsx` with the `cn-card-*` rules of its style
 * files (MIT), at commit `25af02b`. Nova is the base look; the other styles override what differs.
 *
 * The card sets its rhythm once (`cardCtx.spacing`, upstream's `--card-spacing`), by style and size,
 * and every part pads by it. Different from upstream on purpose:
 * - `*:[img:first-child]:rounded-t-xl` reaches a first or last image as a contextual style, which
 *   an image's own corners override;
 * - `[.border-b]:pb-(--card-spacing)` on the header and `[.border-t]:pt-…` on the footers of Vega and the styles after it react to
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
  letterSpacing,
  lineHeight,
  shadow,
  space,
} from "../core/scales"
import { alpha, font, radius, surface, theme } from "../core/tokens"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The card, read by its title for its size (`group/card`). */
export const cardScope = relation("card")

const SMALL = '[data-size="sm"]'
const WITH_FOOTER = ':has([data-slot="card-footer"])'
const HOLDS_CHOICES = ':has(> [data-slot="questionnaire-choices"])'

/** Rhea's corners: `rounded-[min(var(--radius-4xl),24px)]`. */
const RHEA_CORNER = `min(${radius["4xl"]}, 24px)`
/** `rounded-*-xl` and each style's own: the footer's corners. Sera's footer sets none. */
const FOOTER_CORNER = {
  [nova]: radius.xl,
  [vega]: radius.xl,
  [lyra]: "0",
  [maia]: radius.xl,
  [mira]: radius.lg,
  [luma]: radius["4xl"],
  [rhea]: RHEA_CORNER,
}
/** The outer corners of an image at an edge, and the header's: square in Lyra and Sera. */
const CORNER = { ...FOOTER_CORNER, [sera]: "0" }

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
      [luma]: space[6],
      [rhea]: space[5],
      [sera]: space[8],
      [SMALL]: {
        base: space[3],
        [vega]: space[4],
        [maia]: space[4],
        [luma]: space[4],
        [rhea]: space[4],
        [sera]: space[5],
      },
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
        [mira]: cardCtx.spacing,
        [luma]: cardCtx.spacing,
        [rhea]: cardCtx.spacing,
        [sera]: cardCtx.spacing,
      },
    },
    // Sera's card has no corners of its own.
    borderRadius: {
      [nova]: radius.xl,
      [vega]: radius.xl,
      [lyra]: "0",
      [maia]: radius["2xl"],
      [mira]: radius.lg,
      [luma]: radius["4xl"],
      [rhea]: RHEA_CORNER,
    },
    // `ring-1 ring-foreground/10`, with `shadow-xs` under it in Vega; Luma, Rhea and Sera ring it at
    // `/5` (Luma and Rhea `/10` in dark) over a shadow.
    boxShadow: {
      base: `0 0 0 1px ${alpha.foreground10}`,
      [vega]: `0 0 0 1px ${alpha.foreground10}, ${shadow.xs}`,
      [luma]: `0 0 0 1px ${surface.ringSoft}, ${shadow.md}`,
      [rhea]: `0 0 0 1px ${surface.ringSoft}, ${shadow.sm}`,
      [sera]: `0 0 0 1px ${alpha.foreground5}, ${shadow.sm}`,
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
    },
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
    gap: {
      base: space[1],
      [maia]: space[2],
      [luma]: space["1.5"],
      [rhea]: space["1.5"],
      [sera]: space["1.5"],
    },
    paddingInline: cardCtx.spacing,
    borderStartStartRadius: CORNER,
    borderStartEndRadius: CORNER,
    gridTemplateColumns: { ':has([data-slot="card-action"])': "1fr auto" },
    gridTemplateRows: { ':has([data-slot="card-description"])': "auto auto" },
  }),

  // cn-card-title and cn-font-heading. A small card's title is `text-sm` in Nova, Vega and Lyra;
  // Sera's is a spaced, uppercase `text-lg`.
  title: css({
    fontFamily: font.heading,
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    fontSize: {
      base: fontSize.base,
      [lyra]: fontSize.sm,
      [mira]: fontSize.sm,
      [sera]: fontSize.lg,
      [cardScope.within(SMALL)]: {
        base: fontSize.sm,
        [maia]: fontSize.base,
        [luma]: fontSize.base,
        [rhea]: fontSize.base,
        [sera]: fontSize.lg,
      },
    },
    lineHeight: {
      base: leading.snug,
      [vega]: leading.normal,
      [lyra]: lineHeight.sm,
      [maia]: lineHeight.base,
      [mira]: lineHeight.sm,
      [luma]: lineHeight.base,
      [rhea]: lineHeight.base,
      [sera]: lineHeight.lg,
    },
    letterSpacing: { [sera]: letterSpacing.wider },
    textTransform: { [sera]: "uppercase" },
  }),

  // cn-card-description
  description: css({
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
      [sera]: leading.relaxed,
    },
  }),

  // The component's own classes: beside the title and description, at the end.
  // cn-card-action
  action: css({
    gridColumnStart: 2,
    // `row-span-2 row-start-1` as longhands: `gridRow: "span 2"` would leave the end at `auto`.
    gridRowStart: 1,
    gridRowEnd: "span 2",
    alignSelf: "start",
    justifySelf: "end",
  }),

  // cn-card-content
  // In Vega, content holding a questionnaire's choices stacks them:
  // `.cn-card-content:has(> [data-slot=questionnaire-choices])`.
  content: css({
    paddingInline: cardCtx.spacing,
    display: { [vega]: { [HOLDS_CHOICES]: "flex" } },
    flexDirection: { [vega]: { [HOLDS_CHOICES]: "column" } },
    gap: { [vega]: { [HOLDS_CHOICES]: space[3] } },
  }),

  // cn-card-footer: a tinted band in Nova, a rule in Lyra, padding alone in Vega and Maia.
  footer: css({
    display: "flex",
    alignItems: "center",
    paddingInline: cardCtx.spacing,
    // Nova and Lyra draw the footer as a band under a rule; Vega and Maia only pad its sides.
    paddingBlock: { [nova]: cardCtx.spacing, [lyra]: cardCtx.spacing },
    borderEndStartRadius: FOOTER_CORNER,
    borderEndEndRadius: FOOTER_CORNER,
    borderTopWidth: { [nova]: "1px", [lyra]: "1px" },
    // The rule's colour in every style: the reset gives an element no border colour of its own.
    borderTopStyle: "solid",
    borderTopColor: theme.border,
    backgroundColor: { [nova]: alpha.muted50 },
  }),
}
