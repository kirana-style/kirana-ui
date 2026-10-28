/**
 * Textarea, in every style: shadcn/ui's `bases/base/ui/textarea.tsx` and `bases/aria/ui/textarea.tsx`
 * with the `cn-textarea` rules of its style files (MIT). Nova is the base look; the other styles
 * override what differs.
 *
 * It is Input's field, grown to its content (`field-sizing-content`, at least `min-h-16`), with
 * the same rings, fills and text sizes; the later styles (Maia onward) cannot be resized by hand,
 * and Sera's field is a line under the text.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  breakpoint,
  duration,
  fontSize,
  leading,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlShadow, controlTransition, laterRings } from "./control"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

// cn-textarea
export const textarea = css({
  display: "flex",
  fieldSizing: "content",
  minHeight: space[16],
  width: "100%",
  outlineStyle: "none",
  ...controlTransition,
  transitionProperty: {
    base: "color, background-color, border-color",
    [vega]: "color, box-shadow",
    [luma]: "color, box-shadow, background-color",
    [rhea]: "color, box-shadow",
    [sera]: "color, border-color",
  },
  transitionDuration: { base: duration[150], [rhea]: duration[200] },
  cursor: { ":disabled": "not-allowed" },
  opacity: { ":disabled": 0.5 },
  resize: {
    [maia]: "none",
    [mira]: "none",
    [luma]: "none",
    [rhea]: "none",
    [sera]: "none",
  },

  paddingInline: {
    base: space["2.5"],
    [maia]: space[3],
    [mira]: space[2],
    [luma]: space[3],
    [sera]: "0",
  },
  paddingBlock: {
    base: space[2],
    [maia]: space[3],
    [luma]: space[3],
    [sera]: space[3],
  },
  borderRadius: {
    [nova]: radius.lg,
    [vega]: radius.md,
    [lyra]: "0",
    [maia]: radius.xl,
    [mira]: radius.md,
    [luma]: radius["2xl"],
    [rhea]: radius["2xl"],
    [sera]: "0",
  },
  borderWidth: "1px",
  borderStyle: "solid",
  // Luma and Rhea draw no border until focused; Sera only the bottom one.
  borderColor: {
    base: theme.input,
    ":focus-visible": theme.ring,
    '[aria-invalid="true"]': surface.borderInvalid,
    [luma]: {
      base: "transparent",
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    [rhea]: {
      base: "transparent",
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    // Sera's focus and invalid colours are the bottom border's alone.
    [sera]: {
      base: "transparent",
      ":focus-visible": "transparent",
      '[aria-invalid="true"]': "transparent",
    },
  },
  borderBottomColor: {
    [sera]: {
      base: theme.input,
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
  },
  boxShadow: controlShadow(
    alpha.ring50,
    surface.ringInvalid,
    laterRings(alpha.ring30, { sera: "none" }),
    laterRings(surface.ringInvalid, { sera: "none" })
  ),
  // As Input's: `bg-transparent dark:bg-input/30`, filled while disabled in Nova and Lyra; the
  // others keep their fill.
  backgroundColor: {
    base: surface.control,
    ":disabled": surface.controlDisabled,
    [vega]: { ":disabled": surface.control },
    [maia]: { base: alpha.input30, ":disabled": alpha.input30 },
    [mira]: { base: surface.controlSoft, ":disabled": surface.controlSoft },
    [luma]: { base: alpha.input50, ":disabled": alpha.input50 },
    [rhea]: { base: alpha.input50, ":disabled": alpha.input50 },
    [sera]: { base: "transparent", ":disabled": "transparent" },
  },
  fontSize: {
    base: fontSize.base,
    [breakpoint.md]: fontSize.sm,
    [lyra]: { base: fontSize.xs, [breakpoint.md]: fontSize.xs },
    [mira]: { base: fontSize.sm, [breakpoint.md]: fontSize.xs },
  },
  lineHeight: {
    base: lineHeight.base,
    [breakpoint.md]: lineHeight.sm,
    [lyra]: { base: lineHeight.xs, [breakpoint.md]: lineHeight.xs },
    [mira]: { base: lineHeight.sm, [breakpoint.md]: leading.relaxed },
  },

  "::placeholder": { color: theme.mutedForeground },
})
