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
  frame: css({
    maxWidth: containerSize.sm,
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
  flexH200PxItemsCenterJus: css({
    display: "flex",
    height: { "*": null, base: "200px" },
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  fontSemibold: css({ fontWeight: fontWeight.semibold }),
  pane: css({
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
}

@Component({
  selector: "resizable-demo",
  imports: [ResizableHandle, ResizablePanel, ResizablePanelGroup, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiResizablePanelGroup orientation="horizontal" [sx]="styles.frame">
        <div kuiResizablePanel [defaultSize]="50">
          <div [sx]="styles.flexH200PxItemsCenterJus">
            <span [sx]="styles.fontSemibold">One</span>
          </div>
        </div>
        <div kuiResizableHandle withHandle></div>
        <div kuiResizablePanel [defaultSize]="50">
          <div kuiResizablePanelGroup orientation="vertical">
            <div kuiResizablePanel [defaultSize]="25">
              <div [sx]="styles.pane">
                <span [sx]="styles.fontSemibold">Two</span>
              </div>
            </div>
            <div kuiResizableHandle withHandle></div>
            <div kuiResizablePanel [defaultSize]="75">
              <div [sx]="styles.pane">
                <span [sx]="styles.fontSemibold">Three</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ResizableDemo {
  protected readonly styles = styles
  protected readonly page = page
}
