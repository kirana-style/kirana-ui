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
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu"

const styles = {
  gridWFullMaxWSmGridCols2: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
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
  selector: "context-menu-sides",
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
      <div [sx]="styles.gridWFullMaxWSmGridCols2">
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspectVideoWFullMaxW">
            <span [sx]="styles.hiddenPointerFineInlineB"
              >Right click (top)</span
            >
            <span [sx]="styles.hiddenPointerCoarseInlin">Long press (top)</span>
          </div>
          <div kuiContextMenuContent side="top">
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>Back</div>
              <div kuiContextMenuItem>Forward</div>
              <div kuiContextMenuItem>Reload</div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspectVideoWFullMaxW">
            <span [sx]="styles.hiddenPointerFineInlineB"
              >Right click (right)</span
            >
            <span [sx]="styles.hiddenPointerCoarseInlin"
              >Long press (right)</span
            >
          </div>
          <div kuiContextMenuContent side="right">
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>Back</div>
              <div kuiContextMenuItem>Forward</div>
              <div kuiContextMenuItem>Reload</div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspectVideoWFullMaxW">
            <span [sx]="styles.hiddenPointerFineInlineB"
              >Right click (bottom)</span
            >
            <span [sx]="styles.hiddenPointerCoarseInlin"
              >Long press (bottom)</span
            >
          </div>
          <div kuiContextMenuContent side="bottom">
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>Back</div>
              <div kuiContextMenuItem>Forward</div>
              <div kuiContextMenuItem>Reload</div>
            </div>
          </div>
        </ng-container>
        <ng-container kuiContextMenu>
          <div kuiContextMenuTrigger [sx]="styles.flexAspectVideoWFullMaxW">
            <span [sx]="styles.hiddenPointerFineInlineB"
              >Right click (left)</span
            >
            <span [sx]="styles.hiddenPointerCoarseInlin"
              >Long press (left)</span
            >
          </div>
          <div kuiContextMenuContent side="left">
            <div kuiContextMenuGroup>
              <div kuiContextMenuItem>Back</div>
              <div kuiContextMenuItem>Forward</div>
              <div kuiContextMenuItem>Reload</div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class ContextMenuSides {
  protected readonly styles = styles
  protected readonly page = page
}
