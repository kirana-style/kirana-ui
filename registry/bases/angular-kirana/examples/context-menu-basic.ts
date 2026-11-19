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
  selector: "context-menu-basic",
  imports: [
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
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
            <div kuiContextMenuItem>Back</div>
            <div kuiContextMenuItem disabled>Forward</div>
            <div kuiContextMenuItem>Reload</div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ContextMenuBasic {
  protected readonly styles = styles
  protected readonly page = page
}
