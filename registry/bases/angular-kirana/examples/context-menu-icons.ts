import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { containerSize, fontSize, lineHeight } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu"

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

@Component({
  selector: "context-menu-icons",
  imports: [
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiContextMenu>
        <div kuiContextMenuTrigger [sx]="styles.flexAspectVideoWFullMaxW">
          <span [sx]="styles.hiddenPointerFineInlineB">Right click here</span>
          <span [sx]="styles.hiddenPointerCoarseInlin">Long press here</span>
        </div>
        <div kuiContextMenuContent>
          <div kuiContextMenuGroup>
            <div kuiContextMenuItem>
              <svg
                iconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="Copy01Icon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              ></svg>
              Copy
            </div>
            <div kuiContextMenuItem>
              <svg
                iconPlaceholder
                lucide="ScissorsIcon"
                tabler="IconCut"
                hugeicons="ScissorIcon"
                phosphor="ScissorsIcon"
                remixicon="RiScissorsLine"
              ></svg>
              Cut
            </div>
            <div kuiContextMenuItem>
              <svg
                iconPlaceholder
                lucide="ClipboardPasteIcon"
                tabler="IconClipboard"
                hugeicons="ClipboardIcon"
                phosphor="ClipboardIcon"
                remixicon="RiClipboardLine"
              ></svg>
              Paste
            </div>
          </div>
          <div kuiContextMenuSeparator></div>
          <div kuiContextMenuGroup>
            <div kuiContextMenuItem variant="destructive">
              <svg
                iconPlaceholder
                lucide="TrashIcon"
                tabler="IconTrash"
                hugeicons="DeleteIcon"
                phosphor="TrashIcon"
                remixicon="RiDeleteBinLine"
              ></svg>
              Delete
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ContextMenuIcons {
  protected readonly styles = styles
  protected readonly page = page
}
