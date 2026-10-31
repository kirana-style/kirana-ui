/**
 * Attachment, in every style: shadcn/ui's `bases/base/ui/attachment.tsx` and
 * `bases/aria/ui/attachment.tsx` with the `cn-attachment*` rules of its style files (MIT). Nova is
 * the base look; the other styles override what differs. An attachment writes its size, orientation
 * and state as attributes and anchors `attachmentScope`, which its parts read.
 *
 * Its padding follows what it holds: `px-* py-*` around content alone, `p-*` once it holds media
 * (upstream's `has-data-[slot=…]:` rules, the media's winning where both hold).
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx, shimmerCtx } from "../core/context"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, theme } from "../core/tokens"
import { scrollFadeX } from "./scroll-fade.styles"
import { shimmerProperties } from "./shimmer.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** An attachment, read by its parts (`group/attachment`). */
export const attachmentScope = relation("attachment")

const SMALL = attachmentScope.within('[data-size="sm"]')
const EXTRA_SMALL = attachmentScope.within('[data-size="xs"]')
const VERTICAL = attachmentScope.within('[data-orientation="vertical"]')
const FAILED = attachmentScope.within('[data-state="error"]')
const IDLE = attachmentScope.within('[data-state="idle"]')
const DONE = attachmentScope.within('[data-state="done"]')
const WORKING_UPLOAD = attachmentScope.within('[data-state="uploading"]')
const WORKING_PROCESS = attachmentScope.within('[data-state="processing"]')

/** `value` while the attachment uploads or is processed. */
const working = <V>(value: V) => ({
  [WORKING_UPLOAD]: value,
  [WORKING_PROCESS]: value,
})

const HAS_CONTENT = ':has([data-slot="attachment-content"])'
const HAS_MEDIA = ':has([data-slot="attachment-media"])'

/**
 * A side's padding: `content` around content alone, `media` once it holds media (upstream's `p-*`
 * outranks its `px-*` where both rules hold).
 */
const around = (media: string, content: string) => ({
  [HAS_CONTENT]: { base: content, [HAS_MEDIA]: media },
  [HAS_MEDIA]: media,
})

/** The corners: each style's, and each style's smaller ones at `xs`. */
const corners = (rest: Record<string, string>, xs: Record<string, string>) => ({
  base: rest.nova,
  [vega]: rest.vega,
  [lyra]: rest.lyra,
  [maia]: rest.maia,
  [mira]: rest.mira,
  [luma]: rest.luma,
  [rhea]: rest.rhea,
  [sera]: rest.sera,
  '[data-size="xs"]': {
    base: xs.nova,
    [vega]: xs.vega,
    [lyra]: xs.lyra,
    [maia]: xs.maia,
    [mira]: xs.mira,
    [luma]: xs.luma,
    [rhea]: xs.rhea,
    [sera]: xs.sera,
  },
})

export const attachment = {
  // cn-attachment, cn-attachment-size-default, cn-attachment-size-sm, cn-attachment-size-xs,
  // cn-attachment-orientation-horizontal and cn-attachment-orientation-vertical.
  root: css(attachmentScope.anchor, {
    position: "relative",
    display: "flex",
    width: {
      base: "fit-content",
      '[data-orientation="vertical"]': {
        base: space[24],
        [HAS_CONTENT]: spacing(30),
      },
    },
    maxWidth: "100%",
    // Upstream's own `min-w-0` outranks the horizontal hook's `min-w-40`.
    minWidth: "0",
    flexShrink: 0,
    flexWrap: "wrap",
    flexDirection: { '[data-orientation="vertical"]': "column" },
    alignItems: { '[data-orientation="horizontal"]': "center" },
    borderWidth: "1px",
    borderStyle: { '[data-state="idle"]': "dashed" },
    borderColor: {
      base: theme.border,
      '[data-state="error"]': alpha.destructive30,
    },
    borderRadius: corners(
      {
        nova: radius.xl,
        vega: radius.xl,
        lyra: "0",
        maia: radius["2xl"],
        mira: radius.lg,
        luma: radius["3xl"],
        rhea: radius["2xl"],
        sera: "0",
      },
      {
        nova: radius.lg,
        vega: radius.lg,
        lyra: "0",
        maia: radius.xl,
        mira: radius.md,
        luma: radius["2xl"],
        rhea: radius.xl,
        sera: "0",
      }
    ),
    backgroundColor: {
      base: theme.card,
      ":has(> a, > button)": { ":hover": alpha.muted50 },
    },
    color: theme.cardForeground,
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    boxShadow: {
      ":focus-within": {
        base: `0 0 0 1px ${alpha.ring50}`,
        [mira]: `0 0 0 1px ${alpha.ring30}`,
        [luma]: `0 0 0 1px ${alpha.ring30}`,
        [rhea]: `0 0 0 1px ${alpha.ring30}`,
        [sera]: `0 0 0 1px ${alpha.ring30}`,
      },
    },
    gap: {
      '[data-size="default"]': space[2],
      '[data-size="sm"]': spacing(2.5),
      '[data-size="xs"]': spacing(1.5),
    },
    paddingInline: {
      '[data-size="default"]': {
        ...around(space[2], spacing(2.5)),
        [lyra]: around(spacing(1.5), space[2]),
        [mira]: around(spacing(1.5), space[2]),
        [sera]: around(spacing(2.5), space[3]),
      },
      '[data-size="sm"]': {
        ...around(spacing(1.5), space[2]),
        [lyra]: around(space[1], spacing(1.5)),
        [mira]: around(space[1], spacing(1.5)),
        [sera]: around(space[2], spacing(2.5)),
      },
      '[data-size="xs"]': {
        ...around(space[1], spacing(1.5)),
        [lyra]: around(space[1], spacing(1.5)),
        [mira]: around(space[1], spacing(1.5)),
        [sera]: around(spacing(1.5), space[2]),
      },
    },
    paddingBlock: {
      '[data-size="default"]': {
        ...around(space[2], space[2]),
        [lyra]: around(spacing(1.5), spacing(1.5)),
        [mira]: around(spacing(1.5), spacing(1.5)),
        [sera]: around(spacing(2.5), spacing(2.5)),
      },
      '[data-size="sm"]': {
        ...around(spacing(1.5), spacing(1.5)),
        [lyra]: around(space[1], space[1]),
        [mira]: around(space[1], space[1]),
        [sera]: around(space[2], space[2]),
      },
      '[data-size="xs"]': {
        ...around(space[1], space[1]),
        [lyra]: around(space[1], space[1]),
        [mira]: around(space[1], space[1]),
        [sera]: around(spacing(1.5), spacing(1.5)),
      },
    },
    fontSize: {
      '[data-size="default"]': {
        base: fontSize.sm,
        [lyra]: fontSize.xs,
        [mira]: fontSize.xs,
      },
      '[data-size="sm"]': fontSize.xs,
      '[data-size="xs"]': fontSize.xs,
    },
    lineHeight: {
      '[data-size="default"]': {
        base: lineHeight.sm,
        [lyra]: lineHeight.xs,
        [mira]: lineHeight.xs,
      },
      '[data-size="sm"]': lineHeight.xs,
      '[data-size="xs"]': lineHeight.xs,
    },
  }),
  // cn-attachment-media
  media: css({
    position: "relative",
    display: "flex",
    aspectRatio: "1 / 1",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    // Standing, the media fills the attachment's width at every size.
    width: {
      base: space[10],
      [SMALL]: { base: space[8], [VERTICAL]: "100%" },
      [EXTRA_SMALL]: { base: space[7], [VERTICAL]: "100%" },
      [VERTICAL]: "100%",
    },
    borderRadius: {
      base: radius.lg,
      [lyra]: "0",
      [maia]: radius.xl,
      [mira]: radius.md,
      [luma]: radius["2xl"],
      [sera]: "0",
      [EXTRA_SMALL]: {
        base: radius.md,
        [lyra]: "0",
        [maia]: radius.lg,
        [mira]: radius.sm,
        [luma]: radius.xl,
        [sera]: "0",
      },
    },
    backgroundColor: { base: theme.muted, [FAILED]: alpha.destructive10 },
    color: { base: theme.foreground, [FAILED]: theme.destructive },
    // `[&_svg:not([class*='size-'])]:size-4`, `size-3.5` at `xs`, `size-6` standing.
    [ctx.iconSize]: {
      base: "1rem",
      [EXTRA_SMALL]: { base: "0.875rem", [VERTICAL]: "1.5rem" },
      [VERTICAL]: "1.5rem",
    },
    [select.descendant("svg")]: {
      pointerEvents: "none",
      width: ctx.iconSize,
      height: ctx.iconSize,
    },
  }),
  // cn-attachment-media-variant-icon: no rule of its own.
  // cn-attachment-media-variant-image: dimmed until uploaded.
  mediaImage: css({
    opacity: { base: 0.6, [IDLE]: 1, [DONE]: 1 },
    [select.child("img")]: {
      aspectRatio: "1 / 1",
      width: "100%",
      objectFit: "cover",
    },
  }),
  // cn-attachment-content
  content: css({
    maxWidth: "100%",
    minWidth: "0",
    flex: "1 1 0%",
    lineHeight: leading.tight,
    paddingInline: { [VERTICAL]: space[1] },
  }),
  // cn-attachment-title, shimmering while it uploads or is processed.
  title: css({
    display: "block",
    maxWidth: "100%",
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  titleWorking: css({
    [shimmerCtx.highlight]: working(shimmerProperties[shimmerCtx.highlight]),
    backgroundImage: working(shimmerProperties.backgroundImage),
    backgroundRepeat: working(shimmerProperties.backgroundRepeat),
    backgroundSize: working(shimmerProperties.backgroundSize),
    backgroundPosition: working(shimmerProperties.backgroundPosition),
    backgroundClip: working(shimmerProperties.backgroundClip),
    WebkitTextFillColor: working(shimmerProperties.WebkitTextFillColor),
    animationName: working(shimmerProperties.animationName),
    animationDuration: working(shimmerProperties.animationDuration),
    animationTimingFunction: working(shimmerProperties.animationTimingFunction),
    animationIterationCount: working(shimmerProperties.animationIterationCount),
    animationDirection: working(shimmerProperties.animationDirection),
  }),
  // cn-attachment-description
  description: css({
    display: "block",
    maxWidth: "100%",
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginTop: spacing(0.5),
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: {
      base: theme.mutedForeground,
      [FAILED]: `color-mix(in oklab, ${theme.destructive} 80%, transparent)`,
    },
  }),
  // cn-attachment-actions
  actions: css({
    position: { base: "relative", [VERTICAL]: "absolute" },
    zIndex: 20,
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    top: { [VERTICAL]: space[3] },
    right: { [VERTICAL]: space[3] },
    gap: { [VERTICAL]: space[1] },
  }),
  // cn-attachment-action: no rule of its own; a ghost `icon-xs` Button.
  // cn-attachment-trigger
  trigger: css({
    position: "absolute",
    inset: "0",
    zIndex: 10,
    outlineStyle: "none",
  }),
  // cn-attachment-group
  group: css(scrollFadeX, {
    display: "flex",
    minWidth: "0",
    gap: space[3],
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    scrollSnapType: "x mandatory",
    scrollPaddingInline: space[1],
    paddingBlock: space[1],
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
    [select.child('[data-slot="attachment"]')]: {
      flex: "none",
      scrollSnapAlign: "start",
    },
  }),
}
