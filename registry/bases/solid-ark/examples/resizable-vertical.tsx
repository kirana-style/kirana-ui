import { css } from "@kirana-style/core"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

export default function ResizableVertical() {
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

  return (
    <div sx={page.example}>
      <ResizablePanelGroup
        panels={[{ id: "a1" }, { id: "a2" }]}
        defaultSize={[25, 75]}
        orientation="vertical"
        sx={styles.tallNarrowFrame}
      >
        <ResizablePanel id="a1">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="a1:a2" />
        <ResizablePanel id="a2">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
