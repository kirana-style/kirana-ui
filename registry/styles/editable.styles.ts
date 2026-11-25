/**
 * Editable, in every style: text edited in place, on Kirana UI Primitives' Editable, the registry's
 * own component in shadcn/ui's language. Its triggers are the registry's Button.
 *
 * The preview and the input are the same box: both take the input's chrome (`input.styles.ts`), its
 * height, padding, border width, corners and text in each style, and the preview drops what makes
 * it a field (its border colour, its fill and Vega's shadow), keeping a surface on hover. So nothing
 * moves when editing starts. The primitive hides the part not in use with the `hidden` attribute,
 * so neither sets `display`: the root is a flex row, which makes the preview's `<span>` a block.
 *
 * The gap in the row is written here once, the same in every style.
 */
import { css } from "@kirana-style/core"

import { axes } from "../core/axes"
import { space } from "../core/scales"
import { editableState, when } from "../core/states"
import { theme } from "../core/tokens"

const { vega, sera } = axes.style

const { preview } = editableState

export const editable = {
  root: css({
    display: "flex",
    alignItems: "center",
    gap: space[1],
    width: "100%",
    minWidth: 0,
  }),

  // Over `input`: the text as it reads, in the input's box, with a surface on hover.
  preview: css({
    flex: "1 1 0%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    // The text in the middle of the box, as the input draws it.
    alignContent: "center",
    color: when(preview.placeholder, theme.mutedForeground),
    cursor: {
      base: "text",
      ...when(preview.disabled, "not-allowed"),
      ...when(preview.readonly, {
        base: "default",
        ...when(preview.disabled, "not-allowed"),
      }),
    },
    opacity: when(preview.disabled, 0.5),
    borderColor: { "*": null, base: "transparent" },
    // Sera's field is its bottom line: the preview draws it only while focused.
    borderBottomColor: {
      "*": null,
      base: "transparent",
      [sera]: { base: "transparent", ":focus-visible": theme.ring },
    },
    backgroundColor: {
      "*": null,
      base: "transparent",
      ":hover": {
        base: theme.muted,
        ...when(preview.readonly, "transparent"),
        ...when(preview.disabled, "transparent"),
      },
    },
    // The focus ring stays; Vega's shadow under a field goes.
    boxShadow: { [vega]: { base: "none" } },
  }),

  // Over `input`: it takes the row's room, as the preview does.
  input: css({ flex: "1 1 0%" }),
}
