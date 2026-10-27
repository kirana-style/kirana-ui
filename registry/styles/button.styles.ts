/**
 * Button, in every style: shadcn/ui's `bases/base/ui/button.tsx` and the `cn-button*` rules of its
 * style files (MIT), at commit `25af02b`.
 *
 * The base look is Nova, the default style; the seven others override what differs, under
 * `axes.style.*` inside each property. A style that overrides a value with state or breakpoint
 * entries restates them under its own condition. Each entry's comment names the upstream hook it
 * comes from.
 *
 * Kept from kirana-ui's earlier port, and different from upstream on purpose:
 * - `transition-all` became the properties that actually move (`docs/workflows.md`);
 * - `[&_svg:not([class*='size-'])]:size-*` became `controlIcons` (`./control.ts`): a size variant sets
 *   `ctx.iconSize`, and the icons read the nearest control's;
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
  leading,
  letterSpacing,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlIcons, controlShadow, focusRing, laterRings } from "./control"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/**
 * `rounded-[min(var(--radius-md),Npx)]`: the small sizes cap their corners in Nova and Vega. Mira
 * gives the extra-small ones `rounded-sm` (`miraValue`); the others keep the base's corners.
 */
const cappedRadius = (nova: string, vegaCap: string, miraValue: string) => ({
  base: `min(${radius.md}, ${nova})`,
  [vega]: `min(${radius.md}, ${vegaCap})`,
  [lyra]: "0",
  [maia]: radius["4xl"],
  [mira]: miraValue,
  [luma]: radius["4xl"],
  [rhea]: radius["2xl"],
  [sera]: "0",
})

/** `px-*` with `has-data-[icon=inline-*]:p*-*`: a side holding an icon draws in. */
const inlinePadding = (
  side: "inline-start" | "inline-end",
  rest: Record<string, string>,
  withIcon: Record<string, string>
) => ({
  ...rest,
  [`:has([data-icon="${side}"])`]: withIcon,
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
    ...controlIcons,
    // Sera's icons are `size-3.5`.
    [ctx.iconSize]: { base: "1rem", [sera]: "0.875rem" },

    borderWidth: "1px",
    borderStyle: "solid",
    backgroundClip: "padding-box",
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [luma]: radius["4xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
      [sera]: fontSize.xs,
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
      [sera]: lineHeight.xs,
    },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    // Sera sets its buttons in spaced capitals.
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.widest },
    // `active:not-aria-[haspopup]:translate-y-px`: a button that opens a menu does not press in.
    translate: { ":not([aria-haspopup]):active": "0 1px" },
    borderColor: {
      base: "transparent",
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    boxShadow: {
      ":focus-visible": focusRing(alpha.ring50, laterRings(alpha.ring30)),
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
      // cn-button-variant-outline. Vega adds `shadow-xs`; Maia fills with `input/30` in both modes;
      // Mira fills only in dark; Luma and Rhea are clear in dark, Sera in both.
      outline: {
        borderColor: {
          base: surface.outlineBorder,
          [maia]: theme.border,
          [mira]: theme.border,
          [luma]: theme.border,
          [rhea]: theme.border,
          [sera]: theme.border,
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
          [mira]: {
            base: surface.control,
            ":hover": surface.outlineHoverInput,
            '[aria-expanded="true"]': {
              base: surface.outlineExpanded,
              ":hover": surface.outlineExpanded,
            },
          },
          [luma]: {
            base: surface.outlineQuiet,
            ":hover": surface.outlineQuietHover,
            '[aria-expanded="true"]': {
              base: surface.outlineQuietExpanded,
              ":hover": surface.outlineQuietHover,
            },
          },
          [rhea]: {
            base: surface.outlineQuiet,
            ":hover": surface.outlineQuietHover,
            '[aria-expanded="true"]': {
              base: surface.outlineQuietExpanded,
              ":hover": surface.outlineQuietHover,
            },
          },
          [sera]: {
            base: "transparent",
            ":hover": surface.outlineQuietHover,
            '[aria-expanded="true"]': {
              base: theme.muted,
              ":hover": surface.outlineQuietHover,
            },
          },
        },
        color: {
          ":hover": theme.foreground,
          '[aria-expanded="true"]': theme.foreground,
        },
        boxShadow: controlShadow(
          alpha.ring50,
          surface.ringInvalid,
          laterRings(alpha.ring30)
        ),
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
        boxShadow: {
          ":focus-visible": focusRing(surface.ringInvalid),
        },
      },
      // cn-button-variant-link: underlined at rest in Sera.
      link: {
        color: theme.primary,
        textUnderlineOffset: "4px",
        textDecorationLine: { ":hover": "underline", [sera]: "underline" },
      },
    },
    size: {
      // cn-button-size-default. Mira's icons are `size-3.5`.
      default: {
        height: {
          base: space[8],
          [vega]: space[9],
          [maia]: space[9],
          [mira]: space[7],
          [luma]: space[9],
          [sera]: space[10],
        },
        gap: { base: space["1.5"], [mira]: space[1] },
        paddingInlineStart: inlinePadding(
          "inline-start",
          {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [rhea]: space[3],
            [sera]: space[6],
          },
          {
            base: space[2],
            [maia]: space["2.5"],
            [mira]: space["1.5"],
            [luma]: space["2.5"],
            [rhea]: space["2.5"],
            [sera]: space[4],
          }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [rhea]: space[3],
            [sera]: space[6],
          },
          {
            base: space[2],
            [maia]: space["2.5"],
            [mira]: space["1.5"],
            [luma]: space["2.5"],
            [rhea]: space["2.5"],
            [sera]: space[4],
          }
        ),
        [ctx.iconSize]: { [mira]: "0.875rem" },
      },
      // cn-button-size-xs. Mira's is smaller still, `text-[0.625rem]`: as with Nova's small button,
      // `cn` then drops the base's `text-xs/relaxed`, so its line height is inherited.
      xs: {
        height: { base: space[6], [mira]: space[5], [sera]: space[7] },
        gap: space[1],
        borderRadius: cappedRadius("10px", "8px", radius.sm),
        paddingInlineStart: inlinePadding(
          "inline-start",
          {
            base: space[2],
            [maia]: space["2.5"],
            [luma]: space["2.5"],
            [rhea]: space["2.5"],
            [sera]: space[3],
          },
          {
            base: space["1.5"],
            [maia]: space[2],
            [luma]: space[2],
            [rhea]: space[2],
            [sera]: space[2],
          }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          {
            base: space[2],
            [maia]: space["2.5"],
            [luma]: space["2.5"],
            [rhea]: space["2.5"],
            [sera]: space[3],
          },
          {
            base: space["1.5"],
            [maia]: space[2],
            [luma]: space[2],
            [rhea]: space[2],
            [sera]: space[2],
          }
        ),
        fontSize: { base: fontSize.xs, [mira]: "0.625rem" },
        lineHeight: { base: lineHeight.xs, [mira]: "inherit" },
        // Restated for Sera, whose base sets `size-3.5`.
        [ctx.iconSize]: {
          base: "0.75rem",
          [mira]: "0.625rem",
          [sera]: "0.75rem",
        },
      },
      // cn-button-size-sm. Nova's `text-[0.8rem]` made `cn` drop `text-sm` and its line height, so
      // the line height is inherited; the others keep the base's text.
      sm: {
        height: {
          base: space[7],
          [vega]: space[8],
          [maia]: space[8],
          [mira]: space[6],
          [luma]: space[8],
          [sera]: space[9],
        },
        gap: space[1],
        borderRadius: cappedRadius("12px", "10px", radius.md),
        paddingInlineStart: inlinePadding(
          "inline-start",
          {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [rhea]: space[3],
            [sera]: space[4],
          },
          {
            base: space["1.5"],
            [maia]: space[2],
            [luma]: space[2],
            [rhea]: space[2],
            [sera]: space[3],
          }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [rhea]: space[3],
            [sera]: space[4],
          },
          {
            base: space["1.5"],
            [maia]: space[2],
            [luma]: space[2],
            [rhea]: space[2],
            [sera]: space[3],
          }
        ),
        fontSize: {
          base: "0.8rem",
          [vega]: fontSize.sm,
          [maia]: fontSize.sm,
          [luma]: fontSize.sm,
          [rhea]: fontSize.sm,
        },
        lineHeight: {
          base: "inherit",
          [vega]: lineHeight.sm,
          [maia]: lineHeight.sm,
          [luma]: lineHeight.sm,
          [rhea]: lineHeight.sm,
        },
        [ctx.iconSize]: {
          base: "0.875rem",
          [vega]: "1rem",
          [maia]: "1rem",
          [mira]: "0.75rem",
          [luma]: "1rem",
          [rhea]: "1rem",
        },
      },
      // cn-button-size-lg
      lg: {
        height: {
          base: space[9],
          [vega]: space[10],
          [maia]: space[10],
          [mira]: space[8],
          [luma]: space[10],
          [sera]: space[11],
        },
        gap: { base: space["1.5"], [mira]: space[1] },
        paddingInlineStart: inlinePadding(
          "inline-start",
          {
            base: space["2.5"],
            [maia]: space[4],
            [luma]: space[4],
            [rhea]: space[4],
            [sera]: space[8],
          },
          {
            base: space[2],
            [maia]: space[3],
            [luma]: space[3],
            [rhea]: space[3],
            [sera]: space[5],
          }
        ),
        paddingInlineEnd: inlinePadding(
          "inline-end",
          {
            base: space["2.5"],
            [maia]: space[4],
            [luma]: space[4],
            [rhea]: space[4],
            [sera]: space[8],
          },
          {
            base: space[2],
            [maia]: space[3],
            [luma]: space[3],
            [rhea]: space[3],
            [sera]: space[5],
          }
        ),
      },
      // cn-button-size-icon
      icon: {
        width: {
          base: space[8],
          [vega]: space[9],
          [maia]: space[9],
          [mira]: space[7],
          [luma]: space[9],
          [sera]: space[10],
        },
        height: {
          base: space[8],
          [vega]: space[9],
          [maia]: space[9],
          [mira]: space[7],
          [luma]: space[9],
          [sera]: space[10],
        },
        [ctx.iconSize]: { [mira]: "0.875rem" },
      },
      // cn-button-size-icon-xs
      "icon-xs": {
        width: { base: space[6], [mira]: space[5], [sera]: space[7] },
        height: { base: space[6], [mira]: space[5], [sera]: space[7] },
        borderRadius: cappedRadius("10px", "8px", radius.sm),
        // Restated for Sera, whose base sets `size-3.5`.
        [ctx.iconSize]: {
          base: "0.75rem",
          [mira]: "0.625rem",
          [sera]: "0.75rem",
        },
      },
      // cn-button-size-icon-sm: no icon size of its own but Mira's, so its icon stays at the base's.
      "icon-sm": {
        width: {
          base: space[7],
          [vega]: space[8],
          [maia]: space[8],
          [mira]: space[6],
          [luma]: space[8],
          [sera]: space[9],
        },
        height: {
          base: space[7],
          [vega]: space[8],
          [maia]: space[8],
          [mira]: space[6],
          [luma]: space[8],
          [sera]: space[9],
        },
        borderRadius: cappedRadius("12px", "10px", radius.md),
        [ctx.iconSize]: { [mira]: "0.75rem" },
      },
      // cn-button-size-icon-lg
      "icon-lg": {
        width: {
          base: space[9],
          [vega]: space[10],
          [maia]: space[10],
          [mira]: space[8],
          [luma]: space[10],
          [sera]: space[11],
        },
        height: {
          base: space[9],
          [vega]: space[10],
          [maia]: space[10],
          [mira]: space[8],
          [luma]: space[10],
          [sera]: space[11],
        },
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
