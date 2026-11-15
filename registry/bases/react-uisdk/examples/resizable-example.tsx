import { css } from "@kirana-style/core"

import * as React from "react"
import type { Layout } from "react-resizable-panels"

import { Example, ExampleWrapper } from "../components/example"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable"
import { fontWeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"

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

export default function ResizableExample() {
  return (
    <ExampleWrapper>
      <ResizableHorizontal />
      <ResizableVertical />
      <ResizableWithHandle />
      <ResizableNested />
      <ResizableControlled />
    </ExampleWrapper>
  )
}

function ResizableHorizontal() {
  return (
    <Example title="Horizontal">
      <ResizablePanelGroup orientation="horizontal" sx={styles.tallFrame}>
        <ResizablePanel defaultSize="25%">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}

function ResizableVertical() {
  return (
    <Example title="Vertical">
      <ResizablePanelGroup orientation="vertical" sx={styles.tallFrame}>
        <ResizablePanel defaultSize="25%">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div sx={styles.pane}>
            <span sx={styles.fontSemibold}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}

function ResizableWithHandle() {
  return (
    <Example title="With Handle">
      <ResizablePanelGroup orientation="horizontal" sx={styles.tallFrame}>
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
    </Example>
  )
}

function ResizableNested() {
  return (
    <Example title="Nested">
      <ResizablePanelGroup orientation="horizontal" sx={styles.bordered}>
        <ResizablePanel defaultSize="50%">
          <div sx={styles.flexH200PxItemsCenterJus}>
            <span sx={styles.fontSemibold}>One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="25%">
              <div sx={styles.pane}>
                <span sx={styles.fontSemibold}>Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="75%">
              <div sx={styles.pane}>
                <span sx={styles.fontSemibold}>Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}

function ResizableControlled() {
  const [layout, setLayout] = React.useState<Layout>({})

  return (
    <Example title="Controlled">
      <ResizablePanelGroup
        orientation="horizontal"
        sx={styles.tallFrame}
        onLayoutChange={setLayout}
      >
        <ResizablePanel defaultSize="30%" id="left" minSize="20%">
          <div sx={styles.stack}>
            <span sx={styles.fontSemibold}>
              {Math.round(layout.left ?? 30)}%
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="70%" id="right" minSize="30%">
          <div sx={styles.stack}>
            <span sx={styles.fontSemibold}>
              {Math.round(layout.right ?? 70)}%
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  )
}
