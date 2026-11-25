/**
 * Tags Input, in every style: short texts held as tags, on Kirana UI Primitives' TagsInput. It is
 * drawn with Combobox's chips (`combobox.styles.ts`), so it follows every style as they do: the root
 * is the chips' field (`[combobox.chips, tagsInput.root]`), growing by rows as its tags wrap; its
 * list leaves the layout (`combobox.contents`), so the tags and the input share the field's rows; a
 * tag is a chip (`[combobox.chip, tagsInput.item]`), its remove button the chip's
 * (`combobox.chipRemove` over a ghost `icon-xs` Button), the input the chips' input
 * (`[combobox.chipInput, tagsInput.input]`).
 *
 * What differs from the chips: its padding draws in once
 * it holds a tag of its own; a disabled field dims as a whole, as Input does, and a read-only one
 * shows its tags without their remove buttons. A tag edited in place shows its input (hidden by the
 * primitive otherwise), as wide as its text, between a least and a most width that are the same in
 * every style (`min-w-8`, `max-w-40`).
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { space } from "../core/scales"
import { tagsInputState, when } from "../core/states"

const { vega, maia, luma, rhea, sera } = axes.style

/** A read-only tag's end padding: the chip's own, since it draws no remove button. */
const READONLY_END = {
  base: space["1.5"],
  [maia]: space[2],
  [luma]: space[2],
  [sera]: space[2],
}

export const tagsInput = {
  // Over `combobox.chips`, whose border and ring it keeps (focus anywhere inside it): the padding
  // a tag draws in, and the disabled look.
  root: css({
    paddingInline: {
      ':has([data-slot="tags-input-item"])': {
        base: space[1],
        [vega]: space["1.5"],
        [maia]: space["1.5"],
        [luma]: space["1.5"],
        [sera]: "0",
      },
    },
    cursor: { ...when(tagsInputState.root.disabled, "not-allowed") },
    opacity: { ...when(tagsInputState.root.disabled, 0.5) },
  }),

  // Over `combobox.chip`: the room its remove button takes, kept while read-only (no button
  // then); a disabled field dims itself, so its tags do not dim again.
  item: css({
    paddingInlineEnd: {
      ':has([data-slot="tags-input-item-remove"])': {
        base: "0",
        [rhea]: space["0.5"],
        // Said under the button's own condition too, so read-only wins where both hold.
        ...when(tagsInputState.item.readonly, READONLY_END),
      },
      ...when(tagsInputState.item.readonly, READONLY_END),
      // The chip's own rule for its remove button, which a tag never holds, answered the same way.
      ':has([data-slot="combobox-chip-remove"])': when(
        tagsInputState.item.readonly,
        READONLY_END
      ),
    },
    pointerEvents: { ":has(:disabled)": null },
    cursor: { ":has(:disabled)": null },
    opacity: { ":has(:disabled)": null },
  }),

  // A tag's input while it is edited: as wide as its text.
  itemInput: css({
    minWidth: space[8],
    maxWidth: space[40],
    fieldSizing: "content",
    paddingInline: "0",
    backgroundColor: "transparent",
    outlineStyle: "none",
  }),

  // Over `combobox.chipRemove`: a read-only tag has none.
  itemRemove: css({
    display: { ...when(tagsInputState.itemRemove.readonly, "none") },
  }),

  // Over `combobox.chipInput`.
  input: css({
    cursor: { ":disabled": "not-allowed" },
  }),

  // The clear button, at the end of the field's last row.
  clear: css({ marginInlineStart: "auto" }),
}
