/**
 * Alert Dialog, in every style: shadcn/ui's `bases/base/ui/alert-dialog.tsx` and
 * `bases/aria/ui/alert-dialog.tsx` with the `cn-alert-dialog-*` rules of its style files (MIT). Nova
 * is the base look; the other styles override what differs. It comes and goes as a modal does
 * (`[backdropMotion, alertDialog.overlay]`, `[modalMotion, alertDialog.content]`).
 *
 * The parts read the content (`alertDialogScope`, upstream's `group/alert-dialog-content`): from
 * `sm`, a default-sized dialog lines its header up at the start, with a media beside the title and
 * description, and a small one sets its two actions side by side.
 *
 * Different from upstream on purpose: `supports-backdrop-filter:` is dropped, as Dialog's.
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  blur,
  breakpoint,
  containerSize,
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
import { alpha, font, radius, surface, theme } from "../core/tokens"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The content, read by its parts for its size and whether it holds a media. */
export const alertDialogScope = relation("alert-dialog-content")

const DEFAULT = alertDialogScope.within('[data-size="default"]')
const SMALL = alertDialogScope.within('[data-size="sm"]')
const WITH_MEDIA = ':has([data-slot="alert-dialog-media"])'
const IN_MEDIA_DIALOG = alertDialogScope.within(WITH_MEDIA)

/** The content's padding, which Nova's footer reaches back across. */
const PADDING = space[4]

/** `size-10`, `size-16` in the larger styles, `size-8` in Mira. */
const MEDIA = {
  base: space[10],
  [vega]: space[16],
  [maia]: space[16],
  [mira]: space[8],
  [luma]: space[16],
  [rhea]: space[16],
  [sera]: space[16],
}

/** Its icon: `size-6`, `size-8`, `size-4` in Mira. */
const MEDIA_ICON = {
  base: space[6],
  [vega]: space[8],
  [maia]: space[8],
  [mira]: space[4],
  [luma]: space[8],
  [rhea]: space[8],
  [sera]: space[8],
}

export const alertDialog = {
  // cn-alert-dialog-overlay (cn-alert-dialog-overlay-aria)
  overlay: css({
    position: "fixed",
    inset: 0,
    isolation: "isolate",
    zIndex: zIndex.overlay,
    backgroundColor: {
      base: "rgb(0 0 0 / 0.1)",
      [maia]: "rgb(0 0 0 / 0.8)",
      [mira]: "rgb(0 0 0 / 0.8)",
      [luma]: "rgb(0 0 0 / 0.3)",
      [rhea]: "rgb(0 0 0 / 0.3)",
      [sera]: "rgb(0 0 0 / 0.2)",
    },
    backdropFilter: {
      base: `blur(${blur.xs})`,
      [luma]: `blur(${blur.sm})`,
      [rhea]: `blur(${blur.sm})`,
      [sera]: `blur(${blur.sm})`,
    },
  }),

  // cn-alert-dialog-content (cn-alert-dialog-content-aria) and the component's own classes.
  content: css(alertDialogScope.anchor, {
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: zIndex.popover,
    display: "grid",
    width: "100%",
    translate: "-50% -50%",
    outlineStyle: "none",
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    // `max-w-xs`, and from `sm` a default-sized dialog's own width.
    maxWidth: {
      base: containerSize.xs,
      '[data-size="sm"]': { base: containerSize.xs, [mira]: space[64] },
      '[data-size="default"]': {
        [breakpoint.sm]: {
          base: containerSize.sm,
          [vega]: containerSize.lg,
          [maia]: containerSize.md,
          [luma]: containerSize.md,
          [rhea]: containerSize.md,
          [sera]: containerSize.md,
        },
      },
    },
    gap: {
      base: space[4],
      [vega]: space[6],
      [maia]: space[6],
      [mira]: space[3],
      [luma]: space[6],
      [rhea]: space[6],
      [sera]: space[6],
    },
    padding: {
      base: PADDING,
      [vega]: space[6],
      [maia]: space[6],
      [luma]: space[6],
      [rhea]: space[6],
      [sera]: space[6],
    },
    borderRadius: {
      base: radius.xl,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [luma]: radius["4xl"],
      [rhea]: `min(${radius["4xl"]}, 24px)`,
      [sera]: "0",
    },
    boxShadow: {
      base: `0 0 0 1px ${alpha.foreground10}`,
      [maia]: `0 0 0 1px ${alpha.foreground5}`,
      [luma]: `0 0 0 1px ${surface.ringSoft}, ${shadow.xl}`,
      [rhea]: `0 0 0 1px ${surface.ringSoft}, ${shadow.xl}`,
      [sera]: `0 0 0 1px ${alpha.foreground10}, ${shadow.md}`,
    },
  }),

  // React Aria's Dialog, inside the modal: it lays out as the content does.
  inner: css({ display: "inherit", gap: "inherit", outlineStyle: "none" }),

  // cn-alert-dialog-header: centred, or at the start from `sm` in a default-sized dialog; a media
  // takes a row above, or a column beside.
  header: css({
    display: "grid",
    gridTemplateRows: {
      base: "auto 1fr",
      [WITH_MEDIA]: "auto auto 1fr",
      [breakpoint.sm]: { [DEFAULT]: { [WITH_MEDIA]: "auto 1fr" } },
    },
    placeItems: {
      base: "center",
      [breakpoint.sm]: { [DEFAULT]: "start" },
    },
    rowGap: { base: spacing(1.5), [mira]: space[1], [sera]: space[2] },
    columnGap: {
      base: spacing(1.5),
      [mira]: space[1],
      [sera]: space[2],
      [WITH_MEDIA]: {
        base: space[4],
        [vega]: space[6],
        [maia]: space[6],
        [luma]: space[6],
        [rhea]: space[6],
        [sera]: space[6],
      },
    },
    textAlign: { base: "center", [breakpoint.sm]: { [DEFAULT]: "left" } },
  }),

  // cn-alert-dialog-media: two rows tall beside the text from `sm`.
  media: css({
    display: "inline-flex",
    width: MEDIA,
    height: MEDIA,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space[2],
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [maia]: radius.full,
      [luma]: radius.full,
      [rhea]: radius.full,
      [sera]: "0",
    },
    backgroundColor: theme.muted,
    gridRow: { [breakpoint.sm]: { [DEFAULT]: "span 2 / span 2" } },
    [select.child("svg")]: { width: MEDIA_ICON, height: MEDIA_ICON },
  }),

  // cn-alert-dialog-title and cn-font-heading: beside a media from `sm`.
  title: css({
    fontFamily: font.heading,
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    fontSize: {
      base: fontSize.base,
      [vega]: fontSize.lg,
      [lyra]: fontSize.sm,
      [maia]: fontSize.lg,
      [mira]: fontSize.sm,
      [luma]: fontSize.lg,
      [rhea]: fontSize.lg,
      [sera]: fontSize.lg,
    },
    lineHeight: {
      base: lineHeight.base,
      [vega]: lineHeight.lg,
      [lyra]: lineHeight.sm,
      [maia]: lineHeight.lg,
      [mira]: lineHeight.sm,
      [luma]: lineHeight.lg,
      [rhea]: lineHeight.lg,
      [sera]: lineHeight.lg,
    },
    letterSpacing: { [sera]: letterSpacing.wider },
    textTransform: { [sera]: "uppercase" },
    gridColumnStart: {
      [breakpoint.sm]: { [DEFAULT]: { [IN_MEDIA_DIALOG]: 2 } },
    },
  }),

  // cn-alert-dialog-description: its links are underlined, and darken on hover.
  description: css({
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
      [sera]: leading.relaxed,
    },
    textWrap: { base: "balance", [breakpoint.md]: "pretty" },
    marginTop: { [sera]: space["0.5"] },
    [select.child("a")]: {
      textDecorationLine: "underline",
      textUnderlineOffset: "3px",
    },
    [select.child("a:hover")]: { color: theme.foreground },
  }),

  // cn-alert-dialog-action, cn-alert-dialog-cancel: Buttons with no rules of their own.

  // cn-alert-dialog-footer: a column, reversed so the action is on top, then a row to the end from
  // `sm`; a small dialog's actions share a row. Nova's is a tinted band to the content's edges.
  footer: css({
    display: { base: "flex", [SMALL]: "grid" },
    gridTemplateColumns: { [SMALL]: "repeat(2, minmax(0, 1fr))" },
    flexDirection: { base: "column-reverse", [breakpoint.sm]: "row" },
    justifyContent: { [breakpoint.sm]: "flex-end" },
    gap: space[2],
    marginInline: { [nova]: `calc(${PADDING} * -1)` },
    marginBottom: { [nova]: `calc(${PADDING} * -1)` },
    padding: { [nova]: PADDING },
    borderTopWidth: { [nova]: "1px" },
    borderTopColor: { [nova]: theme.border },
    borderEndStartRadius: { [nova]: radius.xl },
    borderEndEndRadius: { [nova]: radius.xl },
    backgroundColor: { [nova]: alpha.muted50 },
  }),
}
