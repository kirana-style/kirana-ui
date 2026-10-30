/**
 * Relations a component reads of another it may be installed without: optional, so a read with no
 * anchor in the project never matches. Here, in a module both install, rather than in either's.
 */
import { relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { radius } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A tooltip's content, read by a Kbd inside it (`in-data-[slot=tooltip-content]:`). */
export const tooltipScope = relation("tooltip-content", { optional: true })

/** An InputGroup, read by what sits inside it (`in-data-[slot=input-group]:`). */
export const inputGroupScope = relation("input-group", { optional: true })

/** An InputGroup's addon, read by a Kbd inside it. */
export const inputGroupAddonScope = relation("input-group-addon", {
  optional: true,
})

/** A dropdown menu's content, read by an Item inside it (`in-data-[slot=dropdown-menu-content]:`). */
export const dropdownMenuScope = relation("dropdown-menu-content", {
  optional: true,
})

/** A Message, read by its parts and by a Bubble inside it (`group/message`). */
export const messageScope = relation("message", { optional: true })

/** Inside a tooltip's content. */
export const IN_TOOLTIP = tooltipScope.within()

/** Inside an InputGroup. */
export const IN_INPUT_GROUP = inputGroupScope.within()

/** Inside an InputGroup's addon, and as its own child (`[&>kbd]:`). */
export const IN_ADDON = inputGroupAddonScope.within()
export const CHILD_OF_ADDON = inputGroupAddonScope.parent()

/**
 * A ButtonGroup joins what it holds, which reads the group as upstream's group reaches into it: the
 * element's own condition on where it sits (`:is(…)`), no relation, since anything may be put in a
 * group. Inside one (`in-data-[slot=button-group]:`).
 */
export const IN_BUTTON_GROUP = ':is([data-slot="button-group"] *)'

/** A ButtonGroup's own child (`*:`, `[&>…]:`). */
export const BUTTON_GROUP_CHILD = ':is([data-slot="button-group"] > *)'

/** A child of a ButtonGroup that holds an outline part (`has-[>[data-variant=outline]]:*:`). */
export const IN_OUTLINE_BUTTON_GROUP =
  ':is([data-slot="button-group"]:has(> [data-variant="outline"]) > *)'

const ROW = '[data-slot="button-group"]:not([data-orientation="vertical"])'
const COLUMN = '[data-slot="button-group"][data-orientation="vertical"]'

/** A part of a row (`*:data-slot:`), one after another (`[&>[data-slot]~[data-slot]]:`), the last. */
const IN_ROW = `:is(${ROW} > [data-slot])`
const ROW_LATER = `:is(${ROW} > [data-slot] ~ [data-slot])`
const COLUMN_PART = `:is(${COLUMN} > [data-slot])`
const COLUMN_LATER = `:is(${COLUMN} > [data-slot] ~ [data-slot])`
const LAST = ":not(:has(~ [data-slot]))"

/**
 * React Aria's Select wraps its trigger (`[data-slot="select"]`): the wrapper is the group's part,
 * and upstream's React Aria group squares every descendant's far corners (`**:data-slot:`), the
 * trigger's among them.
 */
const ROW_SELECT_TRIGGER = `:is(${ROW} > [data-slot="select"] > [data-slot="select-trigger"])`

/**
 * A part (`[data-slot]`), one more condition on the corners: a part's own corners under an attribute
 * and a style (a small Select's) would otherwise outrank the group's, which upstream's win.
 */
const PART = "[data-slot]"

/** The group's outer corners (`[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!`). */
const END = {
  base: radius.lg,
  [vega]: radius.md,
  [lyra]: "0",
  [maia]: radius["4xl"],
  [mira]: radius.md,
  [luma]: radius["4xl"],
  [rhea]: radius["2xl"],
  [sera]: "0",
}

/**
 * A part of a ButtonGroup, joined to its neighbours: square where they meet, the outer corners the
 * group's, one border between two parts, and a focused part above the others. Each condition sits
 * under `IN_BUTTON_GROUP` and `PART` too, so it outranks a part's own corners inside a group.
 * A part that is not positioned already sets `FOCUSED_IN_BUTTON_GROUP` too, for its `z-index`.
 */
export const joinedInButtonGroup = {
  zIndex: { [IN_BUTTON_GROUP]: { ":focus-visible": 10 } },
  borderTopLeftRadius: {
    [IN_BUTTON_GROUP]: { [PART]: { [ROW_LATER]: "0", [COLUMN_LATER]: "0" } },
  },
  borderTopRightRadius: {
    [IN_BUTTON_GROUP]: {
      [PART]: {
        [IN_ROW]: { base: "0", [LAST]: END },
        [COLUMN_LATER]: "0",
        [ROW_SELECT_TRIGGER]: "0",
      },
    },
  },
  borderBottomLeftRadius: {
    [IN_BUTTON_GROUP]: {
      [PART]: {
        [ROW_LATER]: "0",
        [COLUMN_PART]: { base: "0", [LAST]: END },
      },
    },
  },
  borderBottomRightRadius: {
    [IN_BUTTON_GROUP]: {
      [PART]: {
        [IN_ROW]: { base: "0", [LAST]: END },
        [COLUMN_PART]: { base: "0", [LAST]: END },
        [ROW_SELECT_TRIGGER]: "0",
      },
    },
  },
  borderLeftWidth: { [IN_BUTTON_GROUP]: { [ROW_LATER]: "0" } },
  borderTopWidth: { [IN_BUTTON_GROUP]: { [COLUMN_LATER]: "0" } },
} as const

/** `*:focus-visible:relative`, for a part not positioned already. */
export const FOCUSED_IN_BUTTON_GROUP = {
  position: { [IN_BUTTON_GROUP]: { ":focus-visible": "relative" } },
} as const
