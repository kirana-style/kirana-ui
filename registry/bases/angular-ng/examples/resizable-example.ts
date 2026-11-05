import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { Example, ExampleWrapper } from "../components/example"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"

const styles = {
  tallFrame: css({
    minHeight: "200px",
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
  bordered: css({
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
  stack: css({
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: space[2],
    padding: space[6],
  }),
}

@Component({
  selector: "resizable-example",
  imports: [
    Example,
    ExampleWrapper,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- ResizableHorizontal -->
      <div kuiExample title="Horizontal">
        <div
          kuiResizablePanelGroup
          orientation="horizontal"
          [sx]="styles.tallFrame"
        >
          <div kuiResizablePanel [defaultSize]="25">
            <div [sx]="styles.pane">
              <span [sx]="styles.fontSemibold">Sidebar</span>
            </div>
          </div>
          <div kuiResizableHandle></div>
          <div kuiResizablePanel [defaultSize]="75">
            <div [sx]="styles.pane">
              <span [sx]="styles.fontSemibold">Content</span>
            </div>
          </div>
        </div>
      </div>
      <!-- ResizableVertical -->
      <div kuiExample title="Vertical">
        <div
          kuiResizablePanelGroup
          orientation="vertical"
          [sx]="styles.tallFrame"
        >
          <div kuiResizablePanel [defaultSize]="25">
            <div [sx]="styles.pane">
              <span [sx]="styles.fontSemibold">Header</span>
            </div>
          </div>
          <div kuiResizableHandle></div>
          <div kuiResizablePanel [defaultSize]="75">
            <div [sx]="styles.pane">
              <span [sx]="styles.fontSemibold">Content</span>
            </div>
          </div>
        </div>
      </div>
      <!-- ResizableWithHandle -->
      <div kuiExample title="With Handle">
        <div
          kuiResizablePanelGroup
          orientation="horizontal"
          [sx]="styles.tallFrame"
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
      <!-- ResizableNested -->
      <div kuiExample title="Nested">
        <div
          kuiResizablePanelGroup
          orientation="horizontal"
          [sx]="styles.bordered"
        >
          <div kuiResizablePanel [defaultSize]="50">
            <div [sx]="styles.flexH200PxItemsCenterJus">
              <span [sx]="styles.fontSemibold">One</span>
            </div>
          </div>
          <div kuiResizableHandle></div>
          <div kuiResizablePanel [defaultSize]="50">
            <div kuiResizablePanelGroup orientation="vertical">
              <div kuiResizablePanel [defaultSize]="25">
                <div [sx]="styles.pane">
                  <span [sx]="styles.fontSemibold">Two</span>
                </div>
              </div>
              <div kuiResizableHandle></div>
              <div kuiResizablePanel [defaultSize]="75">
                <div [sx]="styles.pane">
                  <span [sx]="styles.fontSemibold">Three</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ResizableControlled -->
      <div kuiExample title="Controlled">
        <div
          kuiResizablePanelGroup
          orientation="horizontal"
          [sx]="styles.tallFrame"
          (layoutChange)="sizes.set($event)"
        >
          <div kuiResizablePanel [defaultSize]="30">
            <div [sx]="styles.stack">
              <span [sx]="styles.fontSemibold">
                {{ Math.round(sizes()[0] ?? 30) }}
                %
              </span>
            </div>
          </div>
          <div kuiResizableHandle></div>
          <div kuiResizablePanel [defaultSize]="70">
            <div [sx]="styles.stack">
              <span [sx]="styles.fontSemibold">
                {{ Math.round(sizes()[1] ?? 70) }}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ResizableExample {
  protected readonly Math = Math
  protected readonly sizes = signal([30, 70])
  protected readonly styles = styles
}
