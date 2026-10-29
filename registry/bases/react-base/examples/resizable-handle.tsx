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

export default function ResizableHandleDemo() {
  return (
    <div sx={page.example}>
      <ResizablePanelGroup orientation="horizontal" sx={styles.tallNarrowFrame}>
        <ResizablePanel defaultSize="25%">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
