/**
 * Copy Button, in every style: the registry's own component in shadcn/ui's language, a Button
 * (`button.styles.ts`, every variant and size, its look in every style) that copies a value and
 * shows that it did for a moment. It writes `data-copied` while it shows, and anchors
 * `copyButtonScope`, which its icon reads.
 *
 * Its icon holds two icons in one cell, a copy icon and a check: the copy icon is shown at rest
 * and the check while the button is copied, each fading and growing in as the other fades and
 * shrinks out. The swap's timing and the hidden icon's scale are written here once, the same in
 * every style; without motion the icons change at once.
 */
import { css, relation, select } from "@kirana-style/core"

import { duration, easing } from "../core/scales"

/** The button, read by its icon for whether it is showing that it copied. */
export const copyButtonScope = relation("copy-button")

const COPIED = copyButtonScope.within("[data-copied]")
const REDUCED = "@media (prefers-reduced-motion: reduce)"

/** One icon's swap: its opacity and scale move, and stop moving without motion. */
const swap = {
  transitionProperty: "opacity, scale",
  transitionDuration: { base: duration[200], [REDUCED]: "0s" },
  transitionTimingFunction: easing.inOut,
}

export const copyButton = {
  // The button over the registry's Button: the anchor its icon reads.
  root: css(copyButtonScope.anchor, {}),

  // The two icons laid over each other in one cell, as wide as one, the button's icon size.
  icon: css({
    display: "inline-grid",
    placeItems: "center",
    flexShrink: 0,
    [select.child("svg")]: { gridArea: "1 / 1" },
    // The copy icon: shown at rest, out while copied.
    [select.child("svg:first-child")]: {
      ...swap,
      opacity: { base: 1, [COPIED]: 0 },
      scale: { base: 1, [COPIED]: 0.5 },
    },
    // The check: out at rest, shown while copied.
    [select.child("svg:last-child")]: {
      ...swap,
      opacity: { base: 0, [COPIED]: 1 },
      scale: { base: 0.5, [COPIED]: 1 },
    },
  }),
}
