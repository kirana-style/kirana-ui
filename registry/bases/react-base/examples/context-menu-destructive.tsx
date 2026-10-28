import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu"
import { page } from "../../../styles/page.styles"
import { containerSize, fontSize, lineHeight } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"

const styles = {
  flexAspectVideoWFullMaxW: css({
    display: "flex",
    aspectRatio: "16 / 9",
    width: "100%",
    maxWidth: containerSize.xs,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.xl,
    borderWidth: "1px",
    borderColor: theme.border,
    borderStyle: "dashed",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  hiddenPointerFineInlineB: css({
    display: {
      "*": null,
      base: "none",
      "@media (pointer: fine)": "inline-block",
    },
  }),
  hiddenPointerCoarseInlin: css({
    display: {
      "*": null,
      base: "none",
      "@media (pointer: coarse)": "inline-block",
    },
  }),
}

export default function ContextMenuDestructive() {
  return (
    <div sx={page.example}>
      <ContextMenu>
        <ContextMenuTrigger sx={styles.flexAspectVideoWFullMaxW}>
          <span sx={styles.hiddenPointerFineInlineB}>Right click here</span>
          <span sx={styles.hiddenPointerCoarseInlin}>Long press here</span>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="PencilIcon"
                tabler="IconPencil"
                hugeicons="EditIcon"
                phosphor="PencilIcon"
                remixicon="RiPencilLine"
              />
              Edit
            </ContextMenuItem>
            <ContextMenuItem>
              <IconPlaceholder
                lucide="ShareIcon"
                tabler="IconShare2"
                hugeicons="Share03Icon"
                phosphor="ShareIcon"
                remixicon="RiShareLine"
              />
              Share
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem variant="destructive">
              <IconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              />
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
