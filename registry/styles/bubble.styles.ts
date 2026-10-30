/**
 * Bubble, in every style: shadcn/ui's `bases/base/ui/bubble.tsx` and `bases/aria/ui/bubble.tsx` with
 * the `cn-bubble*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs. A bubble's variant colours its content (`*:data-[slot=bubble-content]:`), which reads
 * it through `bubbleScope`; content drawn as a button or a link also takes a hover and a ring.
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"
import { messageScope } from "./scope.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A bubble, read by its content (`group/bubble`). */
export const bubbleScope = relation("bubble")

const AT_END = bubbleScope.parent('[data-align="end"]')
const IN_MESSAGE_AT_END = messageScope.within('[data-align="end"]')
const DEFAULT = bubbleScope.parent('[data-variant="default"]')
const SECONDARY = bubbleScope.parent('[data-variant="secondary"]')
const MUTED = bubbleScope.parent('[data-variant="muted"]')
const TINTED = bubbleScope.parent('[data-variant="tinted"]')
const OUTLINE = bubbleScope.parent('[data-variant="outline"]')
const GHOST = bubbleScope.parent('[data-variant="ghost"]')
const DESTRUCTIVE = bubbleScope.parent('[data-variant="destructive"]')

/** Content drawn as a button or a link: its hover. */
const PRESSABLE_HOVER = ":is(button, a):hover"

/** The fill a variant gives its content, and its hover when it is a button or a link. */
const fill = (rest: string, hover: string) => ({
  base: rest,
  [PRESSABLE_HOVER]: hover,
})

/** `mix(in oklch, <colour>, foreground 5%)`: a hovered secondary or muted bubble. */
const nudge = (colour: string) =>
  `color-mix(in oklch, ${colour}, ${theme.foreground} 5%)`

/** `oklch(from primary <l> calc(c * <k>) h)`: the tinted bubble, light and dark. */
const tint = (l: string, k: string) =>
  `oklch(from ${theme.primary} ${l} calc(c * ${k}) h)`

/** A value each style restates beside the ghost bubble's, which its read would otherwise tie. */
const unlessGhost = (
  values: Record<
    "base" | "vega" | "lyra" | "maia" | "mira" | "luma" | "rhea" | "sera",
    string
  >,
  ghost: string
) => ({
  base: values.base,
  [GHOST]: ghost,
  [vega]: { base: values.vega, [GHOST]: ghost },
  [lyra]: { base: values.lyra, [GHOST]: ghost },
  [maia]: { base: values.maia, [GHOST]: ghost },
  [mira]: { base: values.mira, [GHOST]: ghost },
  [luma]: { base: values.luma, [GHOST]: ghost },
  [rhea]: { base: values.rhea, [GHOST]: ghost },
  [sera]: { base: values.sera, [GHOST]: ghost },
})

export const bubble = {
  // cn-bubble-group
  group: css({
    display: "flex",
    minWidth: "0",
    flexDirection: "column",
    gap: space[2],
  }),
  // cn-bubble and its variants' own: cn-bubble-variant-default, cn-bubble-variant-secondary,
  // cn-bubble-variant-muted, cn-bubble-variant-tinted, cn-bubble-variant-outline,
  // cn-bubble-variant-ghost and cn-bubble-variant-destructive colour the content, below.
  root: css(bubbleScope.anchor, {
    position: "relative",
    display: "flex",
    width: "fit-content",
    minWidth: "0",
    flexDirection: "column",
    gap: space[1],
    maxWidth: { base: "80%", '[data-variant="ghost"]': "100%" },
    alignSelf: {
      '[data-align="end"]': "flex-end",
      [IN_MESSAGE_AT_END]: "flex-end",
    },
    borderStyle: { '[data-variant="ghost"]': "none" },
  }),
  // cn-bubble-content
  content: css({
    width: "fit-content",
    maxWidth: "100%",
    minWidth: "0",
    overflow: "hidden",
    overflowWrap: "break-word",
    textAlign: { ":is(button)": "left" },
    transitionProperty: {
      ":is(button, a)": "color, background-color, border-color",
    },
    transitionDuration: { ":is(button, a)": duration[150] },
    transitionTimingFunction: { ":is(button, a)": easing.inOut },
    alignSelf: { [AT_END]: "flex-end" },
    borderWidth: "1px",
    borderColor: {
      base: "transparent",
      [OUTLINE]: theme.border,
      ":is(button, a):focus-visible": theme.ring,
    },
    borderRadius: unlessGhost(
      {
        base: radius.xl,
        vega: radius.xl,
        lyra: "0",
        maia: radius["3xl"],
        mira: radius.lg,
        luma: radius["3xl"],
        rhea: radius["3xl"],
        sera: "0",
      },
      "0"
    ),
    paddingInline: unlessGhost(
      {
        base: space[3],
        vega: space[3],
        lyra: spacing(2.5),
        maia: spacing(3.5),
        mira: spacing(2.5),
        luma: spacing(3.5),
        rhea: space[3],
        sera: space[4],
      },
      "0"
    ),
    paddingBlock: unlessGhost(
      {
        base: space[2],
        vega: space[2],
        lyra: space[2],
        maia: spacing(2.5),
        mira: spacing(1.5),
        luma: spacing(2.5),
        rhea: spacing(2.5),
        sera: space[3],
      },
      "0"
    ),
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: leading.relaxed,
    outlineStyle: { ":is(button, a)": "none" },
    boxShadow: {
      ":is(button, a):focus-visible": {
        base: `0 0 0 3px ${alpha.ring50}`,
        [lyra]: `0 0 0 1px ${alpha.ring50}`,
        [mira]: `0 0 0 2px ${alpha.ring30}`,
        [luma]: `0 0 0 3px ${alpha.ring30}`,
        [rhea]: `0 0 0 3px ${alpha.ring30}`,
        [sera]: `0 0 0 2px ${alpha.ring30}`,
      },
    },
    backgroundColor: {
      [DEFAULT]: fill(theme.primary, alpha.primary80),
      [SECONDARY]: fill(theme.secondary, nudge(theme.secondary)),
      [MUTED]: fill(theme.muted, nudge(theme.muted)),
      [TINTED]: fill(
        `light-dark(${tint("0.93", "0.4")}, ${tint("0.3", "0.4")})`,
        `light-dark(${tint("0.88", "0.5")}, ${tint("0.35", "0.5")})`
      ),
      [OUTLINE]: fill(
        theme.background,
        `light-dark(${theme.muted}, ${alpha.input30})`
      ),
      [GHOST]: fill(
        "transparent",
        `light-dark(${theme.muted}, ${alpha.muted50})`
      ),
      [DESTRUCTIVE]: fill(
        `light-dark(${alpha.destructive10}, ${alpha.destructive20})`,
        `light-dark(${alpha.destructive20}, ${alpha.destructive30})`
      ),
    },
    color: {
      [DEFAULT]: theme.primaryForeground,
      [SECONDARY]: theme.secondaryForeground,
      [TINTED]: theme.foreground,
      [OUTLINE]: { [PRESSABLE_HOVER]: theme.foreground },
      [GHOST]: { [PRESSABLE_HOVER]: theme.foreground },
      [DESTRUCTIVE]: theme.destructive,
    },
  }),
  // cn-bubble-reactions
  reactions: css({
    position: "absolute",
    zIndex: 10,
    display: "flex",
    width: "fit-content",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: space[1],
    borderRadius: { base: radius.full, [lyra]: "0", [sera]: "0" },
    boxShadow: {
      base: `0 0 0 3px ${theme.card}`,
      [lyra]: `0 0 0 2px ${theme.card}`,
      [mira]: `0 0 0 2px ${theme.card}`,
    },
    backgroundColor: theme.muted,
    paddingInline: {
      base: spacing(1.5),
      [sera]: space[2],
      ":has(button)": "0",
    },
    paddingBlock: { base: spacing(0.5), ":has(button)": "0" },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
    },
    // cn-bubble-reactions-side-top and cn-bubble-reactions-side-bottom: overlapping the bubble's edge.
    top: { '[data-side="top"]': "0" },
    bottom: { '[data-side="bottom"]': "0" },
    translate: {
      '[data-side="top"]': "0 -75%",
      '[data-side="bottom"]': "0 75%",
    },
    // cn-bubble-reactions-align-start and cn-bubble-reactions-align-end
    left: { '[data-align="start"]': space[3] },
    right: { '[data-align="end"]': space[3] },
  }),
}
