/**
 * File Upload, in every style: files chosen with a button or dropped on an area, then listed, on
 * Kirana UI Primitives' `FileUpload`. The registry's own component, drawn in the language of the
 * parts it is built from: the dropzone is Empty's dashed area (`empty.root`, given the border width
 * Empty leaves to its page), the trigger is an outline Button, and a listed file is an outline Item
 * (`item.root`) with a ghost Button to remove it. Those handles carry every style's corners,
 * padding and type; what is written here is the same in every style: the gaps between the parts,
 * the dropzone's states, and a file's name and size.
 *
 * The dropzone's border and surface change while files are dragged over it (`data-dragging`), as
 * they do on hover, and it draws the control's ring on focus. A disabled dropzone is half visible
 * and takes no pointer; the buttons dim as disabled Buttons do.
 */
import { css } from "@kirana-style/core"

import {
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../core/scales"
import { fileUploadState, when } from "../core/states"
import { alpha, theme } from "../core/tokens"
import { controlIcons, focusRing, laterRings } from "./control"

export const fileUpload = {
  // The root: its parts in a column, each at its own width but the list and the dropzone.
  root: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space[3],
  }),

  // Over `empty.root`: its dashed border drawn, its states and the control's ring.
  dropzone: css({
    borderWidth: "1px",
    outlineStyle: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    borderColor: {
      ":focus-visible": theme.ring,
      ...when(fileUploadState.dropzone.dragging, theme.ring),
    },
    backgroundColor: {
      ":hover": alpha.muted50,
      ...when(fileUploadState.dropzone.dragging, theme.muted),
    },
    boxShadow: {
      ":focus-visible": focusRing(alpha.ring50, laterRings(alpha.ring30)),
    },
    pointerEvents: when(fileUploadState.dropzone.disabled, "none"),
    opacity: when(fileUploadState.dropzone.disabled, 0.5),
  }),

  // The list of files: gone while it holds none.
  list: css({
    display: { base: "flex", ":empty": "none" },
    alignSelf: "stretch",
    flexDirection: "column",
    gap: space[2],
    marginBlock: "0",
    paddingInlineStart: "0",
    listStyleType: "none",
  }),

  // Over `item.root`: one line, its icons at the control's size.
  item: css({
    flexWrap: { "*": null, base: "nowrap" },
    ...controlIcons,
  }),

  // The file's icon, before its name.
  itemIcon: css({ color: theme.mutedForeground }),

  // The file's name: as wide as the line allows, cut short with an ellipsis.
  itemName: css({
    flex: "1 1 0%",
    minWidth: "0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),

  // The file's size, in muted figures of one width.
  itemSize: css({
    flexShrink: 0,
    whiteSpace: "nowrap",
    color: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontVariantNumeric: "tabular-nums",
  }),
}
