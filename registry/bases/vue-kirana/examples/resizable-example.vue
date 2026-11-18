<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
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

const sizes = ref<number[]>([30, 70])
</script>

<template>
  <ExampleWrapper>
    <!-- ResizableHorizontal -->
    <Example title="Horizontal">
      <ResizablePanelGroup
        :panels="[{ id: 'a1' }, { id: 'a2' }]"
        :default-size="[25, 75]"
        orientation="horizontal"
        :sx="styles.tallFrame"
      >
        <ResizablePanel id="a1">
          <div :sx="styles.pane">
            <span :sx="styles.fontSemibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="a1:a2" />
        <ResizablePanel id="a2">
          <div :sx="styles.pane">
            <span :sx="styles.fontSemibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
    <!-- ResizableVertical -->
    <Example title="Vertical">
      <ResizablePanelGroup
        :panels="[{ id: 'b1' }, { id: 'b2' }]"
        :default-size="[25, 75]"
        orientation="vertical"
        :sx="styles.tallFrame"
      >
        <ResizablePanel id="b1">
          <div :sx="styles.pane">
            <span :sx="styles.fontSemibold">Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="b1:b2" />
        <ResizablePanel id="b2">
          <div :sx="styles.pane">
            <span :sx="styles.fontSemibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
    <!-- ResizableWithHandle -->
    <Example title="With Handle">
      <ResizablePanelGroup
        :panels="[{ id: 'c1' }, { id: 'c2' }]"
        :default-size="[25, 75]"
        orientation="horizontal"
        :sx="styles.tallFrame"
      >
        <ResizablePanel id="c1">
          <div :sx="styles.pane">
            <span :sx="styles.fontSemibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="c1:c2" with-handle />
        <ResizablePanel id="c2">
          <div :sx="styles.pane">
            <span :sx="styles.fontSemibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
    <!-- ResizableNested -->
    <Example title="Nested">
      <ResizablePanelGroup
        :panels="[{ id: 'd1' }, { id: 'd2' }]"
        :default-size="[50, 50]"
        orientation="horizontal"
        :sx="styles.bordered"
      >
        <ResizablePanel id="d1">
          <div :sx="styles.flexH200PxItemsCenterJus">
            <span :sx="styles.fontSemibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="d1:d2" />
        <ResizablePanel id="d2">
          <ResizablePanelGroup
            :panels="[{ id: 'e1' }, { id: 'e2' }]"
            :default-size="[25, 75]"
            orientation="vertical"
          >
            <ResizablePanel id="e1">
              <div :sx="styles.pane">
                <span :sx="styles.fontSemibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle id="e1:e2" />
            <ResizablePanel id="e2">
              <div :sx="styles.pane">
                <span :sx="styles.fontSemibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
    <!-- ResizableControlled -->
    <Example title="Controlled">
      <ResizablePanelGroup
        :panels="[
          { id: 'left', minSize: 20 },
          { id: 'right', minSize: 30 },
        ]"
        :default-size="[30, 70]"
        orientation="horizontal"
        :sx="styles.tallFrame"
        @resize="(details: { size: number[] }) => (sizes = details.size)"
      >
        <ResizablePanel id="left">
          <div :sx="styles.stack">
            <span :sx="styles.fontSemibold"
              >{{ Math.round(sizes[0] ?? 30) }}%</span
            >
          </div>
        </ResizablePanel>
        <ResizableHandle id="left:right" />
        <ResizablePanel id="right">
          <div :sx="styles.stack">
            <span :sx="styles.fontSemibold"
              >{{ Math.round(sizes[1] ?? 70) }}%</span
            >
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  </ExampleWrapper>
</template>
