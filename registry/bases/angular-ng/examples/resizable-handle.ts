import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"

const styles = {
  tallNarrowFrame: css({
    minHeight: "200px",
    maxWidth: containerSize.sm,
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  pane: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  fontSemibold: css({ fontWeight: fontWeight.semibold }),
}

@Component({
  selector: "resizable-handle",
  imports: [ResizableHandle, ResizablePanel, ResizablePanelGroup, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiResizablePanelGroup
        orientation="horizontal"
        [sx]="styles.tallNarrowFrame"
      >
        <div kuiResizablePanel [defaultSize]="25">
          <div [sx]="styles.pane">
            <span [sx]="styles.fontSemibold">Sidebar</span>
          </div>
        </div>
        <div kuiResizableHandle withHandle></div>
        <div kuiResizablePanel [defaultSize]="75">
          <div [sx]="styles.pane">
            <span [sx]="styles.fontSemibold">Content</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ResizableHandleExample {
  protected readonly styles = styles
  protected readonly page = page
}
