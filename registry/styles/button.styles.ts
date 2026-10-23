/**
 * Button, in every style: shadcn/ui's `bases/base/ui/button.tsx` and the `cn-button*` rules of its
 * style files (MIT), at commit `25af02b`.
 *
 * The base look is Nova, the default style; Vega, Lyra and Maia override what differs, under
 * `axes.style.*` inside each property. A style that overrides a value with state or breakpoint
 * entries restates them under its own condition. Each entry's comment names the upstream hook it
 * comes from.
 *
 * Kept from kirana-ui's earlier port, and different from upstream on purpose:
 * - `transition-all` became the properties that actually move (`docs/workflows.md`);
 * - `[&_svg:not([class*='size-'])]:size-*` became `ctx.iconSize`, which the `Icon` primitive reads;
 * - the button-group corners (`in-data-[slot=button-group]:rounded-*`) wait for ButtonGroup, so a
 *   relation with no anchor in the build is not read.
 */
import { css, recipe } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlShadow, focusRing } from "./ring"

const { vega, lyra, maia } = axes.style

/** `rounded-[min(var(--radius-md),Npx)]`: the small sizes cap their corners. */
const cappedRadius = (nova: string, vegaCap: string) => ({
  base: `min(${radius.md}, ${nova})`,
  [vega]: `min(${radius.md}, ${vegaCap})`,
  [lyra]: "0",
  [maia]: radius["4xl"],
})

/** `px-*` with `has-data-[icon=inline-*]:p*-*`: a side holding an icon draws in. */
const inlinePadding = (
  side: "inline-start" | "inline-end",
  rest: { base: string; maia: string },
  withIcon: { base: string; maia: string }
) => ({
  base: rest.base,
  [maia]: rest.maia,
  [`:has([data-icon="${side}"])`]: {
    base: withIcon.base,
    [maia]: withIcon.maia,
  },
})

export const button = recipe({
  // cn-button and the component's own classes.
  base: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    outlineStyle: "none",
    userSelect: "none",
    transitionProperty:
      "color, background-color, border-color, box-shadow, translate",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    pointerEvents: { ":disabled": "none" },
    opacity: { ":disabled": 0.5 },
    [ctx.iconSize]: "1rem",

    borderWidth: "1px",
    borderStyle: "solid",
    backgroundClip: "padding-box",
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: lineHeight.xs },
    fontWeight: fontWeight.medium,
    // `active:not-aria-[haspopup]:translate-y-px`: a button that opens a menu does not press in.
    translate: { ":not([aria-haspopup]):active": "0 1px" },
    borderColor: {
      base: "transparent",
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    boxShadow: {
      ":focus-visible": focusRing(alpha.ring50),
      '[aria-invalid="true"]': focusRing(surface.ringInvalid),
    },
  },
  variants: {
    variant: {
      // cn-button-variant-default
      default: {
        backgroundColor: { base: theme.primary, ":hover": alpha.primary80 },
        color: theme.primaryForeground,
      },
      // cn-button-variant-outline. Vega adds `shadow-xs`; Maia fills with `input/30` in both modes.
      outline: {
        borderColor: {
          base: surface.outlineBorder,
          [maia]: theme.border,
          ":focus-visible": theme.ring,
          '[aria-invalid="true"]': surface.borderInvalid,
        },
        backgroundColor: {
          base: surface.outlineBackground,
          ":hover": surface.outlineHover,
          '[aria-expanded="true"]': {
            base: surface.outlineExpanded,
            ":hover": surface.outlineHover,
          },
          [maia]: {
            base: alpha.input30,
            ":hover": alpha.input50,
            '[aria-expanded="true"]': {
              base: theme.muted,
              ":hover": theme.muted,
            },
          },
        },
        color: {
          ":hover": theme.foreground,
          '[aria-expanded="true"]': theme.foreground,
        },
        boxShadow: controlShadow(alpha.ring50, surface.ringInvalid),
      },
      // cn-button-variant-secondary
      secondary: {
        backgroundColor: {
          base: theme.secondary,
          ":hover": `color-mix(in oklch, ${theme.secondary}, ${theme.foreground} 5%)`,
          '[aria-expanded="true"]': theme.secondary,
        },
        color: theme.secondaryForeground,
      },
      // cn-button-variant-ghost. Open, it is `muted`; `dark:hover:bg-muted/50` still wins on hover.
      ghost: {
        backgroundColor: {
          ":hover": surface.hover,
          '[aria-expanded="true"]': {
            base: theme.muted,
            ":hover": surface.hover,
          },
        },
        color: {
          ":hover": theme.foreground,
          '[aria-expanded="true"]': theme.foreground,
        },
      },
      // cn-button-variant-destructive: tinted, with a destructive focus ring.
      destructive: {
        backgroundColor: {
          base: surface.destructiveSoft,
          ":hover": surface.destructiveSoftHover,
        },
        color: theme.destructive,
        borderColor: { ":focus-visible": alpha.destructive40 },
        boxShadow: { ":focus-visible": focusRing(surface.ringInvalid) },
      },
      // cn-button-variant-link
      link: {
        color: theme.primary,
        textUnderlineOffset: "4px",
        textDecorationLine: { ":hover": "underline" },
      },
    },
    size: {
      // cn-button-size-default
      default: {
        height: { base: space[8], [vega]: space[9], [maia]: space[9] },
        gap: space["1.5"],
        paddingInlineStart: inlinePadding(
          "inline-start",
          { base: space["2.5"], maia: space[3] },
          { base: space[2], maia: space["2.5"] }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          { base: space["2.5"], maia: space[3] },
          { base: space[2], maia: space["2.5"] }
        ),
      },
      // cn-button-size-xs
      xs: {
        height: space[6],
        gap: space[1],
        borderRadius: cappedRadius("10px", "8px"),
        paddingInlineStart: inlinePadding(
          "inline-start",
          { base: space[2], maia: space["2.5"] },
          { base: space["1.5"], maia: space[2] }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          { base: space[2], maia: space["2.5"] },
          { base: space["1.5"], maia: space[2] }
        ),
        fontSize: fontSize.xs,
        lineHeight: lineHeight.xs,
        [ctx.iconSize]: "0.75rem",
      },
      // cn-button-size-sm. Nova's `text-[0.8rem]` made `cn` drop `text-sm` and its line height, so
      // the line height is inherited; Vega and Maia keep `text-sm`, Lyra its `text-xs`.
      sm: {
        height: { base: space[7], [vega]: space[8], [maia]: space[8] },
        gap: space[1],
        borderRadius: cappedRadius("12px", "10px"),
        paddingInlineStart: inlinePadding(
          "inline-start",
          { base: space["2.5"], maia: space[3] },
          { base: space["1.5"], maia: space[2] }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          { base: space["2.5"], maia: space[3] },
          { base: space["1.5"], maia: space[2] }
        ),
        fontSize: { base: "0.8rem", [vega]: fontSize.sm, [maia]: fontSize.sm },
        lineHeight: {
          base: "inherit",
          [vega]: lineHeight.sm,
          [maia]: lineHeight.sm,
        },
        [ctx.iconSize]: { base: "0.875rem", [vega]: "1rem", [maia]: "1rem" },
      },
      // cn-button-size-lg
      lg: {
        height: { base: space[9], [vega]: space[10], [maia]: space[10] },
        gap: space["1.5"],
        paddingInlineStart: inlinePadding(
          "inline-start",
          { base: space["2.5"], maia: space[4] },
          { base: space[2], maia: space[3] }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          { base: space["2.5"], maia: space[4] },
          { base: space[2], maia: space[3] }
        ),
      },
      // cn-button-size-icon
      icon: {
        width: { base: space[8], [vega]: space[9], [maia]: space[9] },
        height: { base: space[8], [vega]: space[9], [maia]: space[9] },
      },
      // cn-button-size-icon-xs
      "icon-xs": {
        width: space[6],
        height: space[6],
        borderRadius: cappedRadius("10px", "8px"),
        [ctx.iconSize]: "0.75rem",
      },
      // cn-button-size-icon-sm: no icon size of its own, so its icon stays at 1rem.
      "icon-sm": {
        width: { base: space[7], [vega]: space[8], [maia]: space[8] },
        height: { base: space[7], [vega]: space[8], [maia]: space[8] },
        borderRadius: cappedRadius("12px", "10px"),
      },
      // cn-button-size-icon-lg
      "icon-lg": {
        width: { base: space[9], [vega]: space[10], [maia]: space[10] },
        height: { base: space[9], [vega]: space[10], [maia]: space[10] },
      },
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

/**
 * Text given to a button, trimmed to its capitals so they sit centred: a flex container centres
 * the line box, not the capitals, and Chrome's whole-pixel baseline moved them up to 2px. Kept
 * from kirana-ui's earlier port; browsers without `text-box` show the untrimmed text.
 */
export const buttonLabel = css({ textBox: "trim-both cap alphabetic" })
