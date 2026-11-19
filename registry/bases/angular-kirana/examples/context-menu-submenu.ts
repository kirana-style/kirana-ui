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
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
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
  selector: "context-menu-submenu",
  imports: [
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
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
              Copy
              <span kuiContextMenuShortcut>⌘C</span>
            </div>
            <div kuiContextMenuItem>
              Cut
              <span kuiContextMenuShortcut>⌘X</span>
            </div>
          </div>
          <ng-container kuiContextMenuSub>
            <div kuiContextMenuSubTrigger>More Tools</div>
            <div kuiContextMenuSubContent>
              <div kuiContextMenuGroup>
                <div kuiContextMenuItem>Save Page...</div>
                <div kuiContextMenuItem>Create Shortcut...</div>
                <div kuiContextMenuItem>Name Window...</div>
              </div>
              <div kuiContextMenuSeparator></div>
              <div kuiContextMenuGroup>
                <div kuiContextMenuItem>Developer Tools</div>
              </div>
              <div kuiContextMenuSeparator></div>
              <div kuiContextMenuGroup>
                <div kuiContextMenuItem variant="destructive">Delete</div>
              </div>
            </div>
          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ContextMenuSubmenu {
  protected readonly styles = styles
  protected readonly page = page
}
