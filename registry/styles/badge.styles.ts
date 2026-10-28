/**
 * Badge, in every style: shadcn/ui's `bases/base/ui/badge.tsx` and `bases/aria/ui/badge.tsx` with the
 * `cn-badge*` rules of its style files (MIT). Nova is the base look; the other styles override what
 * differs.
 *
 * A badge rendered as a link (`[a]:hover:`) darkens on hover. Sera's badge is a label: no box, no
 * fill, small spaced capitals, each variant only a colour. Mira's and Sera's `text-[0.625rem]` made
 * `cn` drop `text-xs` and its line height, so theirs is inherited.
 */
import { recipe, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The badge is itself a link. */
const LINK_HOVER = ":is(a):hover"

export const badge = recipe({
  // cn-badge and the component's own classes.
  base: {
    display: "inline-flex",
    width: "fit-content",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    height: {
      [nova]: space[5],
      [vega]: space[5],
      [lyra]: space[5],
      [maia]: space[5],
      [mira]: space[5],
      [luma]: space[5],
      [rhea]: space[5],
    },
    gap: { base: space[1], [sera]: spacing(1.5) },
    borderRadius: {
      base: radius["4xl"],
      [lyra]: "0",
      [mira]: radius.full,
      [luma]: radius["3xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    borderWidth: { base: "1px", [sera]: "0" },
    borderColor: {
      base: "transparent",
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': theme.destructive,
    },
    paddingInlineStart: {
      base: space[2],
      ':has([data-icon="inline-start"])': spacing(1.5),
      [sera]: { base: "0", ':has([data-icon="inline-start"])': "0" },
    },
    paddingInlineEnd: {
      base: space[2],
      ':has([data-icon="inline-end"])': spacing(1.5),
      [sera]: { base: "0", ':has([data-icon="inline-end"])': "0" },
    },
    paddingBlock: { base: space["0.5"], [sera]: "0" },
    fontSize: { base: fontSize.xs, [mira]: "0.625rem", [sera]: "0.625rem" },
    lineHeight: { base: lineHeight.xs, [mira]: "inherit", [sera]: "inherit" },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.widest },
    boxShadow: {
      ":focus-visible": `0 0 0 3px ${alpha.ring50}`,
      '[aria-invalid="true"]': `0 0 0 3px ${surface.ringInvalid}`,
    },
    // `transition-all`, as the properties that move; Sera's `transition-colors`.
    transitionProperty: {
      base: "color, background-color, border-color, box-shadow",
      [sera]: "color, background-color, border-color",
    },
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    // `[&>svg]:size-3!`, over an icon's own size: `size-2.5` in Mira.
    [select.child("svg")]: {
      pointerEvents: "none",
      width: { base: space[3], [mira]: spacing(2.5) },
      height: { base: space[3], [mira]: spacing(2.5) },
    },
  },
  variants: {
    variant: {
      // cn-badge-variant-default
      default: {
        backgroundColor: {
          base: theme.primary,
          [LINK_HOVER]: alpha.primary80,
          [sera]: { base: "transparent", [LINK_HOVER]: "transparent" },
        },
        color: {
          base: theme.primaryForeground,
          [sera]: { base: theme.foreground, [LINK_HOVER]: alpha.foreground70 },
        },
      },
      // cn-badge-variant-secondary
      secondary: {
        backgroundColor: {
          base: theme.secondary,
          [LINK_HOVER]: alpha.secondary80,
          [sera]: { base: "transparent", [LINK_HOVER]: "transparent" },
        },
        color: {
          base: theme.secondaryForeground,
          [sera]: {
            base: theme.mutedForeground,
            [LINK_HOVER]: theme.foreground,
          },
        },
      },
      // cn-badge-variant-destructive: tinted, the ring in the destructive colour too.
      destructive: {
        backgroundColor: {
          base: surface.destructiveSoft,
          [LINK_HOVER]: alpha.destructive20,
          [sera]: { base: "transparent", [LINK_HOVER]: "transparent" },
        },
        color: {
          base: theme.destructive,
          [sera]: {
            base: theme.destructive,
            [LINK_HOVER]: alpha.destructive70,
          },
        },
        boxShadow: {
          ":focus-visible": `0 0 0 3px ${surface.ringInvalid}`,
          '[aria-invalid="true"]': `0 0 0 3px ${surface.ringInvalid}`,
        },
      },
      // cn-badge-variant-outline: Maia fills it with `input/30`, Mira with `input/20` (`/30` in dark).
      outline: {
        borderColor: {
          base: theme.border,
          ":focus-visible": theme.ring,
          '[aria-invalid="true"]': theme.destructive,
        },
        backgroundColor: {
          [LINK_HOVER]: theme.muted,
          [maia]: { base: alpha.input30, [LINK_HOVER]: theme.muted },
          [mira]: { base: surface.controlSoft, [LINK_HOVER]: theme.muted },
          [sera]: { [LINK_HOVER]: "transparent" },
        },
        color: {
          base: theme.foreground,
          [LINK_HOVER]: theme.mutedForeground,
          [sera]: { base: theme.foreground, [LINK_HOVER]: alpha.foreground70 },
        },
      },
      // cn-badge-variant-ghost
      ghost: {
        backgroundColor: {
          ":hover": `light-dark(${theme.muted}, ${alpha.muted50})`,
          [sera]: { ":hover": "transparent" },
        },
        color: {
          ":hover": theme.mutedForeground,
          [sera]: { base: theme.mutedForeground, ":hover": theme.foreground },
        },
      },
      // cn-badge-variant-link
      link: {
        color: { base: theme.primary, [sera]: theme.foreground },
        textUnderlineOffset: "4px",
        textDecorationLine: { ":hover": "underline" },
      },
    },
  },
  defaultVariants: { variant: "default" },
})
