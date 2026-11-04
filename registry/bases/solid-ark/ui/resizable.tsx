import { Show, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterRoot,
} from "@ark-ui/solid"
import { resizable } from "../../../styles/resizable.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { SplitterPanelProps, SplitterRootProps } from "@ark-ui/solid"

function ResizableHandle(props: {
  id: `${string}:${string}`
  withHandle?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ withHandle: false } as const, props),
    ["id", "withHandle", "class", "sx"]
  )
  // Ark's required `id`, the two panels it sits between (`"a:b"`), declared here and passed on.
  return (
    <SplitterResizeTrigger
      id={local.id}
      asChild={(childProps) => (
        <div
          {...childProps()}
          data-slot="resizable-handle"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            resizable.handle,
            local.sx
          )}
        >
          <Show when={local.withHandle}>
            <div sx={resizable.grip} />
          </Show>
        </div>
      )}
    />
  )
}

function ResizablePanel(props: {
  id: string
  asChild?: SplitterPanelProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "id",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // Ark's required `id`, one of the group's `panels`, declared here and passed on.
  return (
    <SplitterPanel
      asChild={local.asChild}
      data-slot="resizable-panel"
      id={local.id}
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </SplitterPanel>
  )
}

function ResizablePanelGroup(props: {
  panels: SplitterRootProps["panels"]
  asChild?: SplitterRootProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "panels",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // Ark's Splitter names its panels on the group (`:panels`, `:default-size`), where
  // react-resizable-panels sizes each panel: its required `panels` is declared here and passed on.
  return (
    <SplitterRoot
      asChild={local.asChild}
      data-slot="resizable-panel-group"
      panels={local.panels}
      {...rest}
      {...styleProps(local.class, resizable.group, local.sx)}
    >
      {local.children}
    </SplitterRoot>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
