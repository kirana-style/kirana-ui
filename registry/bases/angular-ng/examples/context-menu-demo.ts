import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
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
  w48: css({ width: { "*": null, base: space[48] } }),
  w44: css({ width: { "*": null, base: space[44] } }),
}

@Component({
  selector: "context-menu-demo",
  imports: [
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
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
        <div kuiContextMenuContent [sx]="styles.w48">
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
            <ng-container kuiContextMenuSub>
              <div kuiContextMenuSubTrigger>More Tools</div>
              <div kuiContextMenuSubContent [sx]="styles.w44">
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
          <div kuiContextMenuSeparator></div>
          <div kuiContextMenuGroup>
            <div kuiContextMenuCheckboxItem checked>Show Bookmarks</div>
            <div kuiContextMenuCheckboxItem>Show Full URLs</div>
          </div>
          <div kuiContextMenuSeparator></div>
          <div kuiContextMenuGroup>
            <div kuiContextMenuRadioGroup value="pedro">
              <div kuiContextMenuLabel>People</div>
              <div kuiContextMenuRadioItem value="pedro">Pedro Duarte</div>
              <div kuiContextMenuRadioItem value="colm">Colm Tuite</div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ContextMenuDemo {
  protected readonly styles = styles
  protected readonly page = page
}
