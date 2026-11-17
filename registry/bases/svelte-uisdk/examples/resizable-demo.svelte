<script lang="ts">
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
</script>

<div sx={page.example}>
  <ResizablePanelGroup panels={[{ id: 'a1' }, { id: 'a2' }]} defaultSize={[50, 50]} orientation="horizontal" sx={styles.frame}>
    <ResizablePanel id="a1">
      <div sx={styles.flexH200PxItemsCenterJus}>
        <span sx={styles.fontSemibold}>
          One
        </span>
      </div>
    </ResizablePanel>
    <ResizableHandle id="a1:a2" withHandle />
    <ResizablePanel id="a2">
      <ResizablePanelGroup panels={[{ id: 'b1' }, { id: 'b2' }]} defaultSize={[25, 75]} orientation="vertical">
        <ResizablePanel id="b1">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>
              Two
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="b1:b2" withHandle />
        <ResizablePanel id="b2">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>
              Three
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
