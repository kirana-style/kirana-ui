import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { containerSize, fontSize, lineHeight } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
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
  selector: "context-menu-shortcuts",
  imports: [
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
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
              Back
              <span kuiContextMenuShortcut>⌘[</span>
            </div>
            <div kuiContextMenuItem disabled>
              Forward
              <span kuiContextMenuShortcut>⌘]</span>
            </div>
            <div kuiContextMenuItem>
              Reload
              <span kuiContextMenuShortcut>⌘R</span>
            </div>
          </div>
          <div kuiContextMenuSeparator></div>
          <div kuiContextMenuGroup>
            <div kuiContextMenuItem>
              Save
              <span kuiContextMenuShortcut>⌘S</span>
            </div>
            <div kuiContextMenuItem>
              Save As...
              <span kuiContextMenuShortcut>⇧⌘S</span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ContextMenuShortcuts {
  protected readonly styles = styles
  protected readonly page = page
}
