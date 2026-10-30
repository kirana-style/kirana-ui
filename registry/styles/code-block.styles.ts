/**
 * Code Block, in every style: shadcn/ui's `bases/base/ui/code-block.tsx` and
 * `bases/aria/ui/code-block.tsx` with the `cn-code-block*` rules of its style files (MIT). Nova is
 * the base look; the other styles override what differs. Luma and Rhea fill the block, the others
 * outline it. A block writes its size and variant as attributes and anchors `codeBlockScope`, which
 * its parts read; its content anchors `codeBlockContentScope`, which its lines read (numbered,
 * wrapped).
 *
 * Its spacing comes in four steps: Nova's, one for Vega, Maia, Rhea and Sera, one for Lyra and
 * Mira, and Luma's, each with a smaller value at `sm`.
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, font, radius, theme } from "../core/tokens"
import { scrollFade, scrollFadeX } from "./scroll-fade.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A code block, read by its parts (`group/code-block`). */
export const codeBlockScope = relation("code-block")
/** Its content, read by its code and lines (`in-data-numbered:`, `in-data-wrap:`). */
export const codeBlockContentScope = relation("code-block-content")

const SMALL = codeBlockScope.within('[data-size="sm"]')
const DESTRUCTIVE = codeBlockScope.within('[data-variant="destructive"]')
const WITH_HEADER = codeBlockScope.within(
  ':has([data-slot="code-block-header"])'
)
const WITH_FOOTER = codeBlockScope.within(
  ':has([data-slot="code-block-footer"])'
)
const HOVERED = codeBlockScope.within(":hover")
const FOCUSED = codeBlockScope.within(":focus-within")
const NUMBERED = codeBlockContentScope.within("[data-numbered]")
const WRAPPED = codeBlockContentScope.within("[data-wrap]")

/** Floating over the block, as its own child (`[[data-slot=code-block]>&]:`). */
const FLOATING = ':is([data-slot="code-block"] > *)'
const COARSE = "@media (pointer: coarse)"

type Step = { nova: string; wide: string; tight: string; luma: string }

/** A step for each style, and its smaller one at `sm`, restated in each style. */
const stepped = (rest: Step, small: Step) => ({
  base: rest.nova,
  [SMALL]: small.nova,
  [vega]: { base: rest.wide, [SMALL]: small.wide },
  [maia]: { base: rest.wide, [SMALL]: small.wide },
  [rhea]: { base: rest.wide, [SMALL]: small.wide },
  [sera]: { base: rest.wide, [SMALL]: small.wide },
  [lyra]: { base: rest.tight, [SMALL]: small.tight },
  [mira]: { base: rest.tight, [SMALL]: small.tight },
  [luma]: { base: rest.luma, [SMALL]: small.luma },
})

/** The edge's padding: `p-3` in Nova, `p-4`, `p-3` in Lyra and Mira, `p-5` in Luma. */
const EDGE: Step = {
  nova: space[3],
  wide: space[4],
  tight: space[3],
  luma: space[5],
}
const EDGE_SMALL: Step = {
  nova: spacing(2.5),
  wide: space[3],
  tight: space[2],
  luma: space[3],
}

/** A line's bleed to the content's edges: `-mx-*` against its `px-*`. */
const negative = (step: Step): Step => ({
  nova: `calc(${step.nova} * -1)`,
  wide: `calc(${step.wide} * -1)`,
  tight: `calc(${step.tight} * -1)`,
  luma: `calc(${step.luma} * -1)`,
})

/** The content's top or bottom at one style's step: `2` beside a header or footer, `1.5` at `sm`. */
const besideStep = (
  next: string,
  nextSmall: string,
  rest: string,
  small: string
) => ({
  base: rest,
  [next]: spacing(2),
  [SMALL]: { base: small, [next]: nextSmall },
})

/** Each style's focus ring, as the content's (`has-[>[data-slot=code-block-content]:focus-visible]:`). */
const RING = {
  base: `0 0 0 3px ${alpha.ring50}`,
  [lyra]: `0 0 0 1px ${alpha.ring50}`,
  [mira]: `0 0 0 2px ${alpha.ring30}`,
  [luma]: `0 0 0 3px ${alpha.ring30}`,
  [rhea]: `0 0 0 3px ${alpha.ring30}`,
  [sera]: `0 0 0 2px ${alpha.ring30}`,
}
const CONTENT_FOCUSED = ':has(> [data-slot="code-block-content"]:focus-visible)'

/** Luma's and Rhea's hairline: `ring-1 ring-foreground/5`, `/10` in the dark. */
const HAIRLINE = `0 0 0 1px light-dark(color-mix(in oklab, ${theme.foreground} 5%, transparent), color-mix(in oklab, ${theme.foreground} 10%, transparent))`
const HAIRLINE_DESTRUCTIVE = `0 0 0 1px light-dark(color-mix(in oklab, ${theme.destructive} 15%, transparent), ${alpha.destructive20})`

/** `bg-foreground/5`, `/10` in the dark. */
const FOREGROUND_TINT = `light-dark(color-mix(in oklab, ${theme.foreground} 5%, transparent), color-mix(in oklab, ${theme.foreground} 10%, transparent))`

export const codeBlock = {
  // cn-code-block, cn-code-block-variant-default and cn-code-block-variant-destructive.
  root: css(codeBlockScope.anchor, {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: "0",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: {
      base: radius.lg,
      [lyra]: "0",
      [maia]: { base: radius.xl, '[data-size="sm"]': radius.lg },
      [mira]: radius.md,
      [luma]: { base: radius["2xl"], '[data-size="sm"]': radius.xl },
      [rhea]: { base: radius["2xl"], '[data-size="sm"]': radius.xl },
      [sera]: "0",
    },
    fontSize: { base: fontSize.sm, '[data-size="sm"]': fontSize.xs },
    lineHeight: { base: lineHeight.sm, '[data-size="sm"]': lineHeight.xs },
    borderWidth: { base: "1px", [luma]: "0", [rhea]: "0" },
    borderColor: {
      base: theme.input,
      [CONTENT_FOCUSED]: theme.ring,
      '[data-variant="destructive"]': {
        base: `light-dark(${alpha.destructive30}, ${alpha.destructive40})`,
        [CONTENT_FOCUSED]: `light-dark(${alpha.destructive30}, ${alpha.destructive40})`,
      },
    },
    color: {
      base: theme.foreground,
      '[data-variant="destructive"]': theme.destructive,
    },
    // The outline's `dark:bg-input/30`; Luma and Rhea fill the block instead.
    backgroundColor: {
      base: `light-dark(transparent, ${alpha.input30})`,
      [luma]: {
        base: theme.muted,
        '[data-variant="destructive"]': `light-dark(color-mix(in oklab, ${theme.destructive} 5%, transparent), ${alpha.destructive10})`,
      },
      [rhea]: {
        base: theme.muted,
        '[data-variant="destructive"]': `light-dark(color-mix(in oklab, ${theme.destructive} 5%, transparent), ${alpha.destructive10})`,
      },
      '[data-variant="destructive"]': "transparent",
    },
    boxShadow: {
      [CONTENT_FOCUSED]: RING,
      [luma]: {
        base: HAIRLINE,
        '[data-variant="destructive"]': HAIRLINE_DESTRUCTIVE,
        [CONTENT_FOCUSED]: `0 0 0 3px ${alpha.ring30}`,
      },
      [rhea]: {
        base: HAIRLINE,
        '[data-variant="destructive"]': HAIRLINE_DESTRUCTIVE,
        [CONTENT_FOCUSED]: `0 0 0 3px ${alpha.ring30}`,
      },
    },
  }),
  // cn-code-block-header
  header: css({
    display: "flex",
    minWidth: "0",
    flexShrink: 0,
    alignItems: "center",
    gap: space[2],
    paddingInline: stepped(EDGE, EDGE_SMALL),
    paddingTop: stepped(EDGE, EDGE_SMALL),
    color: { base: theme.mutedForeground, [DESTRUCTIVE]: theme.destructive },
    [select.child(':has(> [data-slot="code-block-title"])')]: { minWidth: "0" },
  }),
  // cn-code-block-footer
  footer: css({
    display: "flex",
    minWidth: "0",
    flexShrink: 0,
    alignItems: "center",
    gap: space[2],
    paddingInline: stepped(EDGE, EDGE_SMALL),
    paddingBottom: stepped(EDGE, EDGE_SMALL),
    color: theme.mutedForeground,
  }),
  // cn-code-block-title
  title: css({
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    // `font-sans`: the design's family.
    fontFamily: font.sans,
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
      [SMALL]: fontSize.xs,
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
      [SMALL]: lineHeight.xs,
    },
    fontWeight: fontWeight.medium,
    color: { base: theme.foreground, [DESTRUCTIVE]: theme.destructive },
    // `size-4`, `size-3.5` in Nova, Lyra and Mira and at `sm`.
    [ctx.iconSize]: {
      base: "0.875rem",
      [vega]: { base: "1rem", [SMALL]: "0.875rem" },
      [maia]: { base: "1rem", [SMALL]: "0.875rem" },
      [luma]: { base: "1rem", [SMALL]: "0.875rem" },
      [rhea]: { base: "1rem", [SMALL]: "0.875rem" },
      [sera]: { base: "1rem", [SMALL]: "0.875rem" },
    },
    [select.descendant("svg")]: {
      pointerEvents: "none",
      display: "inline-block",
      verticalAlign: "middle",
      width: ctx.iconSize,
      height: ctx.iconSize,
    },
    [select.child("svg")]: { marginInlineEnd: spacing(1.5) },
  }),
  // cn-code-block-actions: in the header, or floating over the block's corner.
  actions: css({
    marginInlineStart: "auto",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    gap: space[1],
    marginBlock: { base: `calc(${space[1]} * -1)`, [FLOATING]: "0" },
    marginInlineEnd: { base: `calc(${spacing(1.5)} * -1)`, [FLOATING]: "0" },
    position: { [FLOATING]: "absolute" },
    zIndex: { [FLOATING]: 10 },
    opacity: {
      [FLOATING]: { base: 0, [HOVERED]: 1, [FOCUSED]: 1, [COARSE]: 1 },
    },
    transitionProperty: { [FLOATING]: "opacity" },
    transitionDuration: { [FLOATING]: duration[150] },
    transitionTimingFunction: { [FLOATING]: easing.inOut },
    top: {
      [FLOATING]: {
        base: space[2],
        [vega]: { base: space[3], [SMALL]: space[2] },
        [maia]: { base: space[3], [SMALL]: space[2] },
        [rhea]: { base: space[3], [SMALL]: space[2] },
        [sera]: { base: space[3], [SMALL]: space[2] },
        [luma]: { base: space[4], [SMALL]: space[2] },
        [SMALL]: spacing(1.5),
      },
    },
    insetInlineEnd: {
      [FLOATING]: {
        base: space[2],
        [vega]: { base: space[3], [SMALL]: space[2] },
        [maia]: { base: space[3], [SMALL]: space[2] },
        [rhea]: { base: space[3], [SMALL]: space[2] },
        [sera]: { base: space[3], [SMALL]: space[2] },
        [luma]: { base: space[4], [SMALL]: space[2] },
        [SMALL]: spacing(1.5),
      },
    },
    // Floating, its buttons stand on the page: `*:[button]:bg-background ring-1 ring-foreground/10`.
    [select.child("button")]: {
      backgroundColor: { [FLOATING]: theme.background },
      boxShadow: {
        [FLOATING]: `0 0 0 1px color-mix(in oklab, ${theme.foreground} 10%, transparent)`,
      },
    },
    [select.child('[data-slot="button"]:hover')]: {
      backgroundColor: { [luma]: FOREGROUND_TINT, [rhea]: FOREGROUND_TINT },
    },
  }),
  // cn-code-block-copy-button: Luma's and Rhea's hover.
  copyButton: css({
    backgroundColor: {
      [luma]: { ":hover": FOREGROUND_TINT },
      [rhea]: { ":hover": FOREGROUND_TINT },
    },
  }),
  // cn-code-block-content
  content: css(scrollFadeX, codeBlockContentScope.anchor, {
    minHeight: "0",
    minWidth: "0",
    overflow: "auto",
    scrollbarWidth: "thin",
    textAlign: "start",
    fontFamily: fontFamily.mono,
    outlineStyle: "none",
    lineHeight: leading.relaxed,
    paddingInline: stepped(EDGE, EDGE_SMALL),
    paddingTop: {
      ...besideStep(WITH_HEADER, spacing(1.5), EDGE.nova, EDGE_SMALL.nova),
      [vega]: besideStep(WITH_HEADER, spacing(1.5), EDGE.wide, EDGE_SMALL.wide),
      [maia]: besideStep(WITH_HEADER, spacing(1.5), EDGE.wide, EDGE_SMALL.wide),
      [rhea]: besideStep(WITH_HEADER, spacing(1.5), EDGE.wide, EDGE_SMALL.wide),
      [sera]: besideStep(WITH_HEADER, spacing(1.5), EDGE.wide, EDGE_SMALL.wide),
      [lyra]: besideStep(
        WITH_HEADER,
        spacing(1.5),
        EDGE.tight,
        EDGE_SMALL.tight
      ),
      [mira]: besideStep(
        WITH_HEADER,
        spacing(1.5),
        EDGE.tight,
        EDGE_SMALL.tight
      ),
      [luma]: besideStep(WITH_HEADER, spacing(1.5), EDGE.luma, EDGE_SMALL.luma),
    },
    paddingBottom: {
      ...besideStep(WITH_FOOTER, spacing(2), EDGE.nova, EDGE_SMALL.nova),
      [vega]: besideStep(WITH_FOOTER, spacing(2), EDGE.wide, EDGE_SMALL.wide),
      [maia]: besideStep(WITH_FOOTER, spacing(2), EDGE.wide, EDGE_SMALL.wide),
      [rhea]: besideStep(WITH_FOOTER, spacing(2), EDGE.wide, EDGE_SMALL.wide),
      [sera]: besideStep(WITH_FOOTER, spacing(2), EDGE.wide, EDGE_SMALL.wide),
      [lyra]: besideStep(WITH_FOOTER, spacing(2), EDGE.tight, EDGE_SMALL.tight),
      [mira]: besideStep(WITH_FOOTER, spacing(2), EDGE.tight, EDGE_SMALL.tight),
      [luma]: besideStep(WITH_FOOTER, spacing(2), EDGE.luma, EDGE_SMALL.luma),
    },
  }),
  // Wrapped: `data-wrap:scroll-fade-y data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap`.
  contentWrap: css(scrollFade, {
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
  }),
  // cn-code-block-code
  code: css({
    display: "grid",
    minHeight: "1lh",
    minWidth: { base: "max-content", [WRAPPED]: "0" },
    alignContent: "start",
    gridTemplateColumns: { [NUMBERED]: "auto 1fr" },
  }),
  // cn-code-block-line and its variants: cn-code-block-line-variant-default,
  // cn-code-block-line-variant-highlighted, cn-code-block-line-variant-added and
  // cn-code-block-line-variant-removed.
  line: css({
    position: "relative",
    display: { base: "block", [NUMBERED]: "grid" },
    minHeight: "1lh",
    gridColumn: { [NUMBERED]: "span 2 / span 2" },
    gridTemplateColumns: { [NUMBERED]: "subgrid" },
    counterIncrement: { [NUMBERED]: "line" },
    columnGap: { [NUMBERED]: space[3] },
    marginInline: stepped(negative(EDGE), negative(EDGE_SMALL)),
    paddingInline: stepped(EDGE, EDGE_SMALL),
    backgroundColor: {
      '[data-variant="highlighted"]': {
        base: theme.muted,
        [luma]: FOREGROUND_TINT,
        [rhea]: FOREGROUND_TINT,
      },
      '[data-variant="added"]': {
        base: theme.muted,
        [luma]: FOREGROUND_TINT,
        [rhea]: FOREGROUND_TINT,
      },
      '[data-variant="removed"]': alpha.destructive10,
    },
    // The line's number, from the content's counter.
    "::before": {
      content: {
        [NUMBERED]: "counter(line)",
        "@supports (content: counter(line) / '')": {
          [NUMBERED]: "counter(line) / ''",
        },
      },
      userSelect: "none",
      minWidth: space[6],
      textAlign: "end",
      color: theme.mutedForeground,
    },
    // A diff's mark at the line's start.
    "::after": {
      position: "absolute",
      top: "0",
      insetInlineStart: space[1],
      userSelect: "none",
      color: {
        base: theme.mutedForeground,
        '[data-variant="removed"]': theme.destructive,
      },
      content: {
        '[data-variant="added"]': "'+'",
        '[data-variant="removed"]': "'−'",
      },
    },
  }),
  lineContent: css({ minWidth: "0" }),
}
