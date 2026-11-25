/**
 * Password Input, in every style: the registry's own, on Kirana UI Primitives' `PasswordInput`.
 * Nova is the base look; the other styles override what differs.
 *
 * It is an Input Group holding an Input and an inline-end addon with an icon button, drawn with that
 * group's handles (`input-group.styles.ts`): the root is the group's field (border, fill, rings,
 * height and corners in every style), the input is the group's input over the registry's Input, the
 * toggle a ghost Button sized as the group's `icon-xs` button inside an `inline-end` addon. The group
 * rings itself when its own control (`input-group-control`) has focus; this module rings the root the
 * same way when the password's input has focus, each style's colour and width as the group's. A
 * press on the toggle leaves focus in the input, so the field stays ringed while it is pressed.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { shadow } from "../core/scales"
import { alpha, surface, theme } from "../core/tokens"

const { vega, lyra, mira, luma, rhea, sera } = axes.style

/** The root holds its input focused, or a part marked invalid (the group's own condition). */
const FOCUSED = ':has([data-slot="password-input-input"]:focus-visible)'
const INVALID = ':has([data-slot][aria-invalid="true"])'

/** A focused field's ring of `width` in `color`, the invalid one over it, as the group draws them. */
const rings = (width: string, color: string) => ({
  base: `0 0 0 ${width} ${color}`,
  [INVALID]: `0 0 0 ${width} ${surface.ringInvalid}`,
})

/** The same, over Vega's `shadow-xs`. */
const ringsOverShadow = (width: string, color: string) => ({
  base: `0 0 0 ${width} ${color}, ${shadow.xs}`,
  [INVALID]: `0 0 0 ${width} ${surface.ringInvalid}, ${shadow.xs}`,
})

/** The border of a focused field: the ring's colour, the destructive one when invalid. */
const FOCUSED_BORDER = { base: theme.ring, [INVALID]: theme.destructive }

export const passwordInput = {
  // After the group's root: its focus, read from the password's input.
  root: css({
    borderColor: {
      [FOCUSED]: FOCUSED_BORDER,
      [luma]: { [FOCUSED]: FOCUSED_BORDER },
      [rhea]: { [FOCUSED]: FOCUSED_BORDER },
      // Sera's focus is its bottom border's alone.
      [sera]: { [FOCUSED]: { base: "transparent", [INVALID]: "transparent" } },
    },
    borderBottomColor: {
      [sera]: {
        [FOCUSED]: { base: theme.ring, [INVALID]: surface.borderInvalid },
      },
    },
    boxShadow: {
      [FOCUSED]: {
        ...rings("3px", alpha.ring50),
        [vega]: ringsOverShadow("3px", alpha.ring50),
        [lyra]: rings("1px", alpha.ring50),
        [mira]: rings("2px", alpha.ring30),
        [luma]: rings("3px", alpha.ring30),
        [rhea]: rings("3px", alpha.ring30),
        [sera]: { base: "none", [INVALID]: "none" },
      },
    },
  }),

  // The indicator holds the icon and draws no box of its own: the button sizes and centres the icon.
  indicator: css({ display: "contents" }),
}
