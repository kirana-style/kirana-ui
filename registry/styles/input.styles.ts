/**
 * Input, in every style: shadcn/ui's `bases/base/ui/input.tsx` and `bases/aria/ui/input.tsx` with the
 * `cn-input` rules of its style files (MIT), at commit `25af02b`. Nova is the base look; the other
 * styles override what differs.
 *
 * Text is `text-base` below `md` so iOS does not zoom into the field, `text-sm` from there; Lyra's
 * is `text-xs` at every width, Mira's `text-sm` then `text-xs`, restated under the breakpoint so
 * they hold there too. Sera's field is a line under the text: no fill, no ring, no corners.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  breakpoint,
  duration,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlShadow, controlTransition, laterRings } from "./control"
import {
  BUTTON_GROUP_CHILD,
  IN_OUTLINE_BUTTON_GROUP,
  FOCUSED_IN_BUTTON_GROUP,
  joinedInButtonGroup,
} from "./scope.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

// cn-input
export const input = css({
  width: "100%",
  minWidth: 0,
  outlineStyle: "none",
  ...controlTransition,
  // Luma's and Rhea's fill changes too; Sera's underline only moves its colour.
  transitionProperty: {
    base: "color, background-color, border-color",
    [vega]: "color, box-shadow",
    [luma]: "color, box-shadow, background-color",
    [rhea]: "color, box-shadow",
    [sera]: "color, border-color",
  },
  transitionDuration: { base: duration[150], [rhea]: duration[200] },
  pointerEvents: { ":disabled": "none" },
  cursor: { ":disabled": "not-allowed" },
  opacity: { ":disabled": 0.5 },

  height: {
    base: space[8],
    [vega]: space[9],
    [maia]: space[9],
    [mira]: space[7],
    [luma]: space[9],
    [sera]: space[10],
  },
  paddingInline: {
    base: space["2.5"],
    [maia]: space[3],
    [mira]: space[2],
    [luma]: space[3],
    // In a ButtonGroup, Sera's field takes room on both sides (`*:data-[slot=input]:px-4`).
    [sera]: { base: "0", [BUTTON_GROUP_CHILD]: space[4] },
  },
  paddingBlock: { base: space[1], [mira]: space["0.5"] },
  // A ButtonGroup's input takes the room left (`[&>input]:flex-1`).
  flex: { [BUTTON_GROUP_CHILD]: "1 1 0%" },
  // Sera's field is a line under the text, with no corners of its own.
  borderRadius: {
    [nova]: radius.lg,
    [vega]: radius.md,
    [lyra]: "0",
    [maia]: radius["4xl"],
    [mira]: radius.md,
    [luma]: radius["3xl"],
    [rhea]: radius["2xl"],
  },
  ...joinedInButtonGroup,
  ...FOCUSED_IN_BUTTON_GROUP,
  borderWidth: "1px",
  borderStyle: "solid",
  // Luma and Rhea draw no border until focused; Sera only the bottom one.
  borderColor: {
    base: theme.input,
    ":focus-visible": theme.ring,
    '[aria-invalid="true"]': surface.borderInvalid,
    [luma]: {
      base: "transparent",
      // Beside an outline part, upstream's `has-[>[data-variant=outline]]:` border.
      [IN_OUTLINE_BUTTON_GROUP]: {
        base: theme.border,
        ":focus-visible": theme.ring,
      },
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    [rhea]: {
      base: "transparent",
      [IN_OUTLINE_BUTTON_GROUP]: {
        base: theme.border,
        ":focus-visible": theme.ring,
      },
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    // Sera's focus and invalid colours are the bottom border's alone.
    [sera]: {
      base: "transparent",
      [IN_OUTLINE_BUTTON_GROUP]: {
        base: theme.border,
        ":focus-visible": theme.ring,
      },
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
  // `bg-transparent dark:bg-input/30`, filled while disabled; Vega keeps its fill then, Maia fills
  // with `input/30` in both modes, Mira with `input/20` (`/30` in dark), Luma and Rhea with `/50`.
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
  // `file:` utilities: the button a file input draws.
  "::file-selector-button": {
    display: "inline-flex",
    height: {
      base: space[6],
      [vega]: space[7],
      [maia]: space[7],
      [luma]: space[7],
      [sera]: space[7],
    },
    borderWidth: 0,
    backgroundColor: "transparent",
    color: theme.foreground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    fontWeight: fontWeight.medium,
  },
})
