import { css } from "@kirana-style/core"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

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

export default function ResizableDemo() {
  return (
    <div sx={page.example}>
      <ResizablePanelGroup orientation="horizontal" sx={styles.frame}>
        <ResizablePanel defaultSize="50%">
          <div sx={styles.flexH200PxItemsCenterJus}>
            <span sx={styles.fontSemibold}>One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="25%">
              <div sx={styles.pane}>
                <span sx={styles.fontSemibold}>Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="75%">
              <div sx={styles.pane}>
                <span sx={styles.fontSemibold}>Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
