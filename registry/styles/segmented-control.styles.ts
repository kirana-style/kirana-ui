/**
 * Segmented Control, in every style: one value chosen from a few, on Kirana UI Primitives' Toggle
 * Group with a single value that cannot be emptied. The registry's own component in shadcn/ui's
 * language, drawn as Tabs' default list: the track is `tabs.list` and `tabs.listDefault`, each item
 * `tabs.trigger`, so the corners, paddings, type and colours follow every style as Tabs' do.
 *
 * An item is a toggle, which marks itself pressed with `aria-pressed` (`toggleState.pressed`), not
 * a tab's attribute, so the chosen surface (the inset background, its edge in dark, Nova's and
 * Vega's raised shadow) is restated here under that state, with the values Tabs' chosen trigger
 * takes in each style.
 *
 * The chosen surface is the item's own background: it moves with the chosen item rather than
 * sliding between items, since the toggle group gives no position for its pressed toggle to slide
 * a shared surface to, and the move is measured by no script.
 *
 * The sizes are the track's height one step under or two steps over each style's Tabs list
 * (`data-size`, which the root and every item write); a small control's text is `text-xs`. An
 * item's side padding is Tabs' own at every size, an icon's side drawn in as a tab's is.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { fontSize, lineHeight, shadow, space } from "../core/scales"
import { toggleState, when } from "../core/states"
import { alpha, surface, theme } from "../core/tokens"

const { nova, vega, maia, luma, rhea, sera } = axes.style

const SM = '[data-size="sm"]'
const LG = '[data-size="lg"]'

/** The focus ring Tabs' trigger draws: `focus-visible:ring-[3px] ring-ring/50`. */
const RING = `0 0 0 3px ${alpha.ring50}`
/** Nova's and Vega's chosen item is raised, as Tabs' chosen trigger in a default list. */
const RAISED = {
  ...when(toggleState.pressed, shadow.sm),
  ":focus-visible": {
    base: RING,
    ...when(toggleState.pressed, `${RING}, ${shadow.sm}`),
  },
}

export const segmentedControl = {
  // Over `tabs.list` and `tabs.listDefault`: a row whose height follows the size.
  root: css({
    height: {
      [SM]: space[7],
      [LG]: space[10],
      [vega]: { [SM]: space[8], [LG]: space[11] },
      [maia]: { [SM]: space[8], [LG]: space[11] },
      [luma]: { [SM]: space[8], [LG]: space[11] },
      [sera]: { [SM]: space[9], [LG]: space[12] },
    },
  }),

  // Over `tabs.trigger`: the chosen item's surface, and the sizes' text and widths.
  item: css({
    color: when(toggleState.pressed, theme.foreground),
    // The chosen item's edge shows in dark; Luma's and Rhea's never show.
    borderColor: {
      ...when(toggleState.pressed, surface.tabActiveBorder),
      [luma]: when(toggleState.pressed, "transparent"),
      [rhea]: when(toggleState.pressed, "transparent"),
    },
    // Chosen: `background` in light, `input/30` in dark.
    backgroundColor: when(toggleState.pressed, surface.outlineBackground),
    boxShadow: { [nova]: RAISED, [vega]: RAISED },
    fontSize: { [SM]: fontSize.xs },
    lineHeight: { [SM]: lineHeight.xs },
  }),
}
