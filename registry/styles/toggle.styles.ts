/**
 * Toggle, in every style: shadcn/ui's `bases/base/ui/toggle.tsx` and `bases/aria/ui/toggle.tsx` with
 * the `cn-toggle*` rules of its style files (MIT). Nova is the base look; the other styles override
 * what differs. Toggle Group's items are toggles too (`toggle-group.styles.ts`).
 *
 * A pressed toggle is muted: Base UI marks it with `aria-pressed`, React Aria with `data-selected`
 * (`cn-toggle-aria`). Upstream's `data-[state=on]:` is Radix's and matches neither.
 */
import { recipe, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  shadow,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlIcons } from "./control"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A toggle, read by what is inside it (`group/toggle`): its icon, filled while it is pressed. */
export const toggleScope = relation("toggle")

/** Inside a pressed toggle: Base UI's `aria-pressed`, React Aria's `data-selected`. */
export const IN_PRESSED_TOGGLE = toggleScope.within('[aria-pressed="true"]')
export const IN_SELECTED_TOGGLE = toggleScope.within("[data-selected]")

/** `px-*` with `has-data-[icon=inline-*]:p*-*`: a side holding an icon draws in. */
export const togglePadding = (
  side: "inline-start" | "inline-end",
  rest: Record<string, string>,
  withIcon: Record<string, string>
) => ({ ...rest, [`:has([data-icon="${side}"])`]: withIcon })

/** A size's padding on both sides: `rest` without an icon, `withIcon` beside one. */
const padding = (
  rest: Record<string, string>,
  withIcon: Record<string, string>
) => ({
  paddingInlineStart: togglePadding("inline-start", rest, withIcon),
  paddingInlineEnd: togglePadding("inline-end", rest, withIcon),
})

/** `h-N min-w-N`. */
const square = (sizes: Record<string, string>) => ({
  height: sizes,
  minWidth: sizes,
})

export const toggle = recipe({
  // cn-toggle, cn-toggle-aria and the component's own classes.
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { base: space[1], [sera]: space["1.5"] },
    whiteSpace: "nowrap",
    outlineStyle: "none",
    pointerEvents: { ":disabled": "none" },
    opacity: { ":disabled": 0.5 },
    ...controlIcons,
    [ctx.iconSize]: { base: "1rem", [sera]: "0.875rem" },
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [luma]: radius["3xl"],
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
      [mira]: lineHeight.xs,
      [sera]: lineHeight.xs,
    },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.widest },
    // `transition-all` in Nova, Lyra and Mira, as the properties that move.
    transitionProperty: {
      base: "color, background-color, border-color, box-shadow",
      [vega]: "color, box-shadow",
      [maia]: "color, background-color, border-color",
      [luma]: "color, background-color, border-color",
      [rhea]: "color, background-color, border-color",
      [sera]: "color, background-color, border-color",
    },
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    color: { ":hover": theme.foreground },
    backgroundColor: {
      base: "transparent",
      ":hover": theme.muted,
      '[aria-pressed="true"]': theme.muted,
      "[data-selected]": theme.muted,
    },
    borderColor: {
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    // `focus-visible:ring-[3px]`, in `ring/50`, `ring/30` from Luma on.
    boxShadow: {
      ":focus-visible": {
        base: `0 0 0 3px ${alpha.ring50}`,
        [luma]: `0 0 0 3px ${alpha.ring30}`,
        [rhea]: `0 0 0 3px ${alpha.ring30}`,
        [sera]: `0 0 0 3px ${alpha.ring30}`,
        '[aria-invalid="true"]': `0 0 0 3px ${surface.ringInvalid}`,
      },
    },
  },
  variants: {
    variant: {
      // cn-toggle-variant-default
      default: {},
      // cn-toggle-variant-outline
      outline: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: {
          base: theme.input,
          ":focus-visible": theme.ring,
          '[aria-invalid="true"]': surface.borderInvalid,
        },
        boxShadow: { [vega]: shadow.xs },
      },
    },
    size: {
      // cn-toggle-size-default
      default: {
        ...square({
          base: space[8],
          [vega]: space[9],
          [maia]: space[9],
          [mira]: space[7],
          [luma]: space[9],
          [sera]: space[10],
        }),
        ...padding(
          {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [sera]: space[6],
          },
          {
            base: space[2],
            [maia]: space["2.5"],
            [mira]: space["1.5"],
            [luma]: space["2.5"],
            [sera]: space[4],
          }
        ),
      },
      // cn-toggle-size-sm. Nova's `text-[0.8rem]` and Mira's `text-[0.625rem]` made `cn` drop the
      // base's text and its line height, so theirs is inherited.
      sm: {
        ...square({
          base: space[7],
          [vega]: space[8],
          [maia]: space[8],
          [mira]: space[6],
          [luma]: space[8],
          [sera]: space[9],
        }),
        ...padding(
          {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [sera]: space[4],
          },
          {
            base: space["1.5"],
            [maia]: space[2],
            [luma]: space[2],
            [sera]: space[3],
          }
        ),
        borderRadius: {
          base: `min(${radius.md}, 12px)`,
          [mira]: `min(${radius.md}, 8px)`,
        },
        fontSize: {
          base: "0.8rem",
          [vega]: fontSize.sm,
          [maia]: fontSize.sm,
          [mira]: "0.625rem",
          [luma]: fontSize.sm,
          [rhea]: fontSize.sm,
        },
        lineHeight: {
          base: "inherit",
          [vega]: lineHeight.sm,
          [maia]: lineHeight.sm,
          [mira]: "inherit",
          [luma]: lineHeight.sm,
          [rhea]: lineHeight.sm,
        },
        // `size-3.5` in Nova, `size-3` in Mira; the others keep the base's.
        [ctx.iconSize]: {
          base: "0.875rem",
          [vega]: "1rem",
          [lyra]: "1rem",
          [maia]: "1rem",
          [mira]: "0.75rem",
          [luma]: "1rem",
          [rhea]: "1rem",
          [sera]: "0.875rem",
        },
      },
      // cn-toggle-size-lg
      lg: {
        ...square({
          base: space[9],
          [vega]: space[10],
          [maia]: space[10],
          [mira]: space[8],
          [luma]: space[10],
          [sera]: space[11],
        }),
        ...padding(
          {
            base: space["2.5"],
            [maia]: space[4],
            [luma]: space[4],
            [sera]: space[8],
          },
          {
            base: space[2],
            [maia]: space[3],
            [luma]: space[3],
            [sera]: space[5],
          }
        ),
      },
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})
