/**
 * Time Field, in every style: the registry's own, on Kirana UI Primitives' `TimeField`. Nova is the
 * base look; the other styles override what differs.
 *
 * The root is a group of segments, not an input, so it draws the registry's Input (`input`, from
 * `input.styles.ts`: its height, padding, border, fill, corners and text in every style) and this
 * module gives that chrome the group's states: ringed while a segment has focus (`:focus-within`, as
 * the input's `:focus-visible`), red while the time is invalid, dimmed and filled while disabled,
 * each in every style's colour and width as the input's. A segment is the time's hour, minute,
 * second or day period, or the text between them; the focused one is filled as a highlighted menu
 * row is (`accent`), an empty one shows its placeholder in the input's placeholder colour. A
 * segment's padding is a quarter of the base spacing and its corners `radius.sm` (square in Lyra and
 * Sera), the same in every style.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { shadow, space } from "../core/scales"
import { timeFieldState, when } from "../core/states"
import { alpha, radius, surface, theme } from "../core/tokens"
import { focusRing, laterRings } from "./control"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A segment of the root has focus. */
const FOCUSED = ":focus-within"
const { invalid: INVALID, disabled: DISABLED } = timeFieldState.root

export const timeField = {
  // After the Input: the group's focus, invalid and disabled states.
  root: css({
    display: "flex",
    alignItems: "center",
    cursor: { base: "text", ...when(DISABLED, "not-allowed") },
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
    pointerEvents: when(DISABLED, "none"),
    opacity: when(DISABLED, 0.5),
    borderColor: {
      [FOCUSED]: theme.ring,
      ...when(INVALID, surface.borderInvalid),
      [luma]: {
        [FOCUSED]: theme.ring,
        ...when(INVALID, surface.borderInvalid),
      },
      [rhea]: {
        [FOCUSED]: theme.ring,
        ...when(INVALID, surface.borderInvalid),
      },
      // Sera's focus and invalid colours are the bottom border's alone.
      [sera]: { [FOCUSED]: "transparent", ...when(INVALID, "transparent") },
    },
    borderBottomColor: {
      [sera]: {
        [FOCUSED]: theme.ring,
        ...when(INVALID, surface.borderInvalid),
      },
    },
    boxShadow: {
      [FOCUSED]: focusRing(
        alpha.ring50,
        laterRings(alpha.ring30, { sera: "none" })
      ),
      ...when(
        INVALID,
        focusRing(
          surface.ringInvalid,
          laterRings(surface.ringInvalid, { sera: "none" })
        )
      ),
      [vega]: {
        [FOCUSED]: `0 0 0 3px ${alpha.ring50}, ${shadow.xs}`,
        ...when(INVALID, `0 0 0 3px ${surface.ringInvalid}, ${shadow.xs}`),
      },
    },
    // The Input's fill while disabled, in each style.
    backgroundColor: {
      ...when(DISABLED, surface.controlDisabled),
      [vega]: when(DISABLED, surface.control),
      [maia]: when(DISABLED, alpha.input30),
      [mira]: when(DISABLED, surface.controlSoft),
      [luma]: when(DISABLED, alpha.input50),
      [rhea]: when(DISABLED, alpha.input50),
      [sera]: when(DISABLED, "transparent"),
    },
  }),

  // One segment: a part that is typed, or the text between two (no padding, never focused).
  segment: css({
    whiteSpace: "pre",
    outlineStyle: "none",
    caretColor: "transparent",
    paddingInline: {
      base: space["0.5"],
      ...when(timeFieldState.segment.segment.literal, "0"),
    },
    borderRadius: { base: radius.sm, [lyra]: "0", [sera]: "0" },
    backgroundColor: { ":focus": theme.accent },
    color: {
      ":focus": theme.accentForeground,
      ...when(timeFieldState.segment.placeholder, {
        base: theme.mutedForeground,
        ":focus": theme.accentForeground,
      }),
    },
  }),
}
