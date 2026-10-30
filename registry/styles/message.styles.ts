/**
 * Message, in every style: shadcn/ui's `bases/base/ui/message.tsx` (the same on both bases) with the
 * `cn-message*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs. A message anchors `messageScope` (`scope.styles.ts`, since a Bubble reads it too), which its parts read: its side (`data-align`),
 * whether it has a footer, and whether it holds a ghost bubble.
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { radius, theme } from "../core/tokens"
import { messageScope } from "./scope.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

const AT_END = messageScope.within('[data-align="end"]')
const WITH_FOOTER = messageScope.within(':has([data-slot="message-footer"])')
const WITH_GHOST = messageScope.within(':has([data-variant="ghost"])')

/**
 * `px-*` of a header or footer, `px-0` beside a ghost bubble: restated inside each style, which
 * the ghost's read would otherwise tie.
 */
const ghostless = (value: string) => ({ base: value, [WITH_GHOST]: "0" })
const sidePadding = {
  ...ghostless(space[3]),
  [vega]: ghostless(space[3]),
  [lyra]: ghostless(spacing(2.5)),
  [maia]: ghostless(spacing(3.5)),
  [mira]: ghostless(spacing(2.5)),
  [luma]: ghostless(spacing(3.5)),
  [rhea]: ghostless(space[3]),
  [sera]: ghostless(space[4]),
}

/** A header's or footer's text: `text-xs font-medium text-muted-foreground`, Mira's `0.625rem`. */
const caption = {
  display: "flex",
  maxWidth: "100%",
  minWidth: "0",
  alignItems: "center",
  fontSize: { base: fontSize.xs, [mira]: "0.625rem" },
  // Mira's arbitrary size keeps the message's `leading-relaxed`.
  lineHeight: { base: lineHeight.xs, [mira]: "inherit" },
  fontWeight: fontWeight.medium,
  color: theme.mutedForeground,
  paddingInline: sidePadding,
  textTransform: { [sera]: "uppercase" },
  letterSpacing: { [sera]: letterSpacing.wide },
} as const

export const message = {
  // cn-message-group
  group: css({
    display: "flex",
    minWidth: "0",
    flexDirection: "column",
    gap: { base: space[2], [lyra]: spacing(1.5), [mira]: spacing(1.5) },
  }),
  // cn-message
  root: css(messageScope.anchor, {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: "0",
    flexDirection: { '[data-align="end"]': "row-reverse" },
    gap: { base: space[2], [lyra]: spacing(1.5), [mira]: spacing(1.5) },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),
  // cn-message-avatar
  avatar: css({
    display: "flex",
    width: "fit-content",
    minWidth: space[8],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    overflow: "hidden",
    borderRadius: radius.full,
    backgroundColor: theme.muted,
    translate: { [WITH_FOOTER]: `0 calc(${space[8]} * -1)` },
  }),
  // cn-message-content
  content: css({
    display: "flex",
    width: "100%",
    minWidth: "0",
    flexDirection: "column",
    overflowWrap: "break-word",
    gap: { base: spacing(2.5), [lyra]: space[2], [mira]: space[2] },
    // `group-data-[align=end]/message:*:data-slot:self-end`
    [select.child("[data-slot]")]: { alignSelf: { [AT_END]: "flex-end" } },
  }),
  // cn-message-header
  header: css(caption),
  // cn-message-footer
  footer: css({ ...caption, justifyContent: { [AT_END]: "flex-end" } }),
}
