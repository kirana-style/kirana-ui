import { createContext, createMemo, omit, Show, useContext } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Resizable,
  ResizableHandle as ResizableHandlePrimitive,
  ResizablePanel as ResizablePanelPrimitive,
} from "@ui-sdk/solid/resizable"
import type { Accessor } from "solid-js"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { resizable } from "../../../styles/resizable.styles"

/** A panel's entry in its group's `panels`, as Ark UI's splitter takes it. */
type PanelEntry = {
  id: string
  minSize?: number
  maxSize?: number
  collapsible?: boolean
  collapsedSize?: number
}

/** The group's panels, which each panel reads its limits from. */
const PanelsContext = createContext<Accessor<PanelEntry[] | undefined> | null>(
  null
)

/**
 * ui-sdk's handle, which finds its panels from its place: Ark UI's `id` (`"a1:a2"`) is taken and
 * not needed. It writes react-resizable-panels' `data-separator`, which the state keys read.
 */
function ResizableHandle(props: {
  id: `${string}:${string}`
  withHandle?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "id", "withHandle", "class", "sx")
  return (
    <UisdkPart
      part={ResizableHandlePrimitive}
      slotName="resizable-handle"
      data-separator=""
      {...rest}
      {...styleProps(props.class, resizable.handle, props.sx)}
    >
      <Show when={props.withHandle}>
        <div sx={resizable.grip} />
      </Show>
    </UisdkPart>
  )
}

/** A panel, its limits from its group's `panels` entry, as Ark UI's splitter reads them. */
function ResizablePanel(props: {
  id: string
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  const panels = useContext(PanelsContext)
  const entry = createMemo(() =>
    panels?.()?.find((panel) => panel.id === props.id)
  )
  return (
    <UisdkPart
      part={ResizablePanelPrimitive}
      slotName="resizable-panel"
      asChild={props.asChild}
      minSize={entry()?.minSize}
      maxSize={entry()?.maxSize}
      collapsible={entry()?.collapsible}
      collapsedSize={entry()?.collapsedSize}
      {...rest}
      {...styleProps(props.class, props.sx)}
    />
  )
}

/**
 * ui-sdk's resizable group, with Ark UI's props: `defaultSize` is its `defaultLayout` (percent, in
 * panel order), `onResize` is called with `{ size }`, and `panels` names them and their limits,
 * which each panel hands ui-sdk. It writes react-resizable-panels' `data-group` and the group's
 * `aria-orientation`, which the state keys read.
 */
function ResizablePanelGroup(props: {
  panels: PanelEntry[]
  defaultSize?: number[]
  orientation?: "horizontal" | "vertical"
  onResize?: (details: { size: number[] }) => void
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "panels",
    "defaultSize",
    "orientation",
    "onResize",
    "asChild",
    "class",
    "sx"
  )
  const orientation = () => props.orientation ?? "horizontal"
  return (
    <PanelsContext value={() => props.panels}>
      <UisdkPart
        part={Resizable}
        slotName="resizable-panel-group"
        asChild={props.asChild}
        defaultLayout={props.defaultSize}
        orientation={orientation()}
        data-group=""
        aria-orientation={orientation()}
        {...rest}
        onLayoutChange={(size: number[]) => props.onResize?.({ size })}
        {...styleProps(
          props.class,
          resizable.group,
          resizable.groupUisdk,
          props.sx
        )}
      />
    </PanelsContext>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
