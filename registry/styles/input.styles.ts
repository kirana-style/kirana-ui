/**
 * Input, in every style: shadcn/ui's `bases/base/ui/input.tsx` and `bases/aria/ui/input.tsx` with the
 * `cn-input` rules of its style files (MIT), at commit `25af02b`. Nova is the base look; Vega, Lyra
 * and Maia override what differs.
 *
 * Text is `text-base` below `md` so iOS does not zoom into the field, `text-sm` from there; Lyra's
 * is `text-xs` at every width, restated under the breakpoint so it holds there too.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlShadow, controlTransition } from "./control"

const { vega, lyra, maia } = axes.style

export const input = css({
  width: "100%",
  minWidth: 0,
  outlineStyle: "none",
  ...controlTransition,
  pointerEvents: { ":disabled": "none" },
  cursor: { ":disabled": "not-allowed" },
  opacity: { ":disabled": 0.5 },

  height: { base: space[8], [vega]: space[9], [maia]: space[9] },
  paddingInline: { base: space["2.5"], [maia]: space[3] },
  paddingBlock: space[1],
  borderRadius: {
    base: radius.lg,
    [vega]: radius.md,
    [lyra]: "0",
    [maia]: radius["4xl"],
  },
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: {
    base: theme.input,
    ":focus-visible": theme.ring,
    '[aria-invalid="true"]': surface.borderInvalid,
  },
  boxShadow: controlShadow(alpha.ring50, surface.ringInvalid),
  // `bg-transparent dark:bg-input/30`, filled while disabled; Vega keeps its fill then, Maia fills
  // with `input/30` in both modes.
  backgroundColor: {
    base: surface.control,
    ":disabled": surface.controlDisabled,
    [vega]: { ":disabled": surface.control },
    [maia]: { base: alpha.input30, ":disabled": alpha.input30 },
  },
  fontSize: {
    base: fontSize.base,
    [breakpoint.md]: fontSize.sm,
    [lyra]: { base: fontSize.xs, [breakpoint.md]: fontSize.xs },
  },
  lineHeight: {
    base: lineHeight.base,
    [breakpoint.md]: lineHeight.sm,
    [lyra]: { base: lineHeight.xs, [breakpoint.md]: lineHeight.xs },
  },

  "::placeholder": { color: theme.mutedForeground },
  // `file:` utilities: the button a file input draws.
  "::file-selector-button": {
    display: "inline-flex",
    height: { base: space[6], [vega]: space[7], [maia]: space[7] },
    borderWidth: 0,
    backgroundColor: "transparent",
    color: theme.foreground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: lineHeight.xs },
    fontWeight: fontWeight.medium,
  },
})
