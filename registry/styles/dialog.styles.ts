/**
 * Dialog, in every style: shadcn/ui's `bases/base/ui/dialog.tsx` (and `bases/aria`'s, which only
 * differs in its motion states) with the `cn-dialog-*` rules of its style files (MIT), at commit
 * `25af02b`. Nova is the base look; Vega, Lyra and Maia override what differs.
 *
 * The component composes each part with its motion from `overlay.styles.ts`:
 * `[backdropMotion, dialog.overlay]` and `[modalMotion, dialog.content]`. The close button is a
 * ghost `icon-sm` Button placed by `dialog.close`.
 *
 * Different from upstream on purpose:
 * - sides that follow the reading direction are logical (`right-2` is `insetInlineEnd`, Lyra's
 *   `text-left` is `start`), as shadcn/ui's RTL transform writes them. The content stays centred
 *   by the physical `left: 50%` and `translate`, which are right in both directions;
 * - `supports-backdrop-filter:` is dropped: a browser without `backdrop-filter` ignores it anyway.
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  blur,
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
  zIndex,
} from "../core/scales"
import { alpha, font, radius, theme } from "../core/tokens"

const { nova, vega, lyra, maia } = axes.style

/** The content's padding, which Nova's footer reaches back across. */
const PADDING = space[4]

export const dialog = {
  // cn-dialog-overlay
  overlay: css({
    position: "fixed",
    inset: 0,
    isolation: "isolate",
    zIndex: zIndex.overlay,
    backgroundColor: { base: "rgb(0 0 0 / 0.1)", [maia]: "rgb(0 0 0 / 0.8)" },
    backdropFilter: `blur(${blur.xs})`,
  }),

  // cn-dialog-content and the component's own classes.
  content: css({
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
    // `sm:max-w-sm`, `sm:max-w-md` in Vega and Maia: each style restates its width under the
    // breakpoint, where it differs.
    maxWidth: {
      base: "calc(100% - 2rem)",
      [breakpoint.sm]: {
        base: containerSize.sm,
        [vega]: containerSize.md,
        [maia]: containerSize.md,
      },
    },
    gap: { base: space[4], [vega]: space[6], [maia]: space[6] },
    padding: { base: PADDING, [vega]: space[6], [maia]: space[6] },
    borderRadius: { base: radius.xl, [lyra]: "0", [maia]: radius["4xl"] },
    // `ring-1 ring-foreground/10`, `/5` in Maia.
    boxShadow: {
      base: `0 0 0 1px ${alpha.foreground10}`,
      [maia]: `0 0 0 1px ${alpha.foreground5}`,
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: leading.relaxed },
  }),

  // React Aria's Dialog, inside the modal: it lays out as the content does.
  inner: css({ display: "inherit", gap: "inherit", outlineStyle: "none" }),

  // cn-dialog-close
  close: css({
    position: "absolute",
    top: { base: space[2], [vega]: space[4], [maia]: space[4] },
    insetInlineEnd: { base: space[2], [vega]: space[4], [maia]: space[4] },
  }),

  // cn-dialog-header
  header: css({
    display: "flex",
    flexDirection: "column",
    gap: { base: space[2], [lyra]: space[1] },
    textAlign: { [lyra]: "start" },
  }),

  // cn-dialog-footer and the component's own classes: a column, reversed so the primary action
  // is on top, then a row to the end from `sm`. Nova's footer is a tinted band to the content's
  // edges; the other styles draw none, so its look is Nova's alone, with no value for the rest.
  footer: css({
    display: "flex",
    flexDirection: { base: "column-reverse", [breakpoint.sm]: "row" },
    justifyContent: { [breakpoint.sm]: "flex-end" },
    gap: space[2],
    marginInline: { [nova]: `calc(${PADDING} * -1)` },
    marginBottom: { [nova]: `calc(${PADDING} * -1)` },
    padding: { [nova]: PADDING },
    borderTopWidth: { [nova]: "1px" },
    borderTopStyle: { [nova]: "solid" },
    borderTopColor: { [nova]: theme.border },
    borderEndStartRadius: { [nova]: radius.xl },
    borderEndEndRadius: { [nova]: radius.xl },
    backgroundColor: { [nova]: alpha.muted50 },
  }),

  // cn-dialog-title and cn-font-heading. Vega sets no size, so its title is the content's `text-sm`.
  title: css({
    fontFamily: font.heading,
    fontWeight: fontWeight.medium,
    // Vega's title has no size of its own: the content's.
    fontSize: {
      [nova]: fontSize.base,
      [lyra]: fontSize.sm,
      [maia]: fontSize.base,
    },
    lineHeight: { base: "1", [lyra]: lineHeight.sm },
  }),

  // cn-dialog-description: its links are underlined, and darken on hover.
  description: css({
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: leading.relaxed },
    [select.child("a")]: {
      textDecorationLine: "underline",
      textUnderlineOffset: "3px",
    },
    // The link's own hover is in the target: a condition nested under it would be the
    // description's (KF-014).
    [select.child("a:hover")]: { color: theme.foreground },
  }),
}
