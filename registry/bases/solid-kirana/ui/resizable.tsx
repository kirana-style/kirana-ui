import {
  createContext,
  mergeProps,
  Show,
  splitProps,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Resizable } from "@kirana-ui/solid/resizable"
import { asRender } from "../../../lib/solid/element"
import { resizable } from "../../../styles/resizable.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/** A panel as the group names it, Ark UI's `panels` entry: its id and its limits, in percent. */
type PanelEntry = { id: string; minSize?: number; maxSize?: number }

/** A panel's share and limits, by its id: what the group is given for its panels. */
type PanelSizes = (id: string) => {
  defaultSize?: number
  minSize?: number
  maxSize?: number
}

const PanelSizesContext = createContext<PanelSizes>()

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
  // Ark's required `id`, the two panels it sits between (`"a:b"`), is declared and left out:
  // Kirana UI's handle knows them by its place between the panels. A handle never shrinks.
  return (
    <Resizable.Handle
      data-slot="resizable-handle"
      {...rest}
      {...styleProps(
        local.class,
        resizable.handle,
        resizable.handleKirana,
        local.sx
      )}
    >
      <Show when={local.withHandle}>
        <div sx={resizable.grip} />
      </Show>
    </Resizable.Handle>
  )
}

function ResizablePanel(props: {
  id: string
  asChild?: AsChild<"div">
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
  // Ark's required `id`, one of the group's `panels`: its share and limits come from there. It is
  // not the element's id, which several groups on a page would repeat.
  const sizes = useContext(PanelSizesContext)
  const own = () => sizes?.(local.id) ?? {}
  return (
    <Resizable.Panel
      render={asRender(local.asChild)}
      data-slot="resizable-panel"
      defaultSize={own().defaultSize}
      minSize={own().minSize}
      maxSize={own().maxSize}
      {...rest}
      {...styleProps(local.class, resizable.panelKirana, local.sx)}
    >
      {local.children}
    </Resizable.Panel>
  )
}

/**
 * Kirana UI's resizable group, with Solid's Ark UI parts' props: the panels by id (`panels`, each
 * with its limits) and their shares in order (`defaultSize`), which each panel takes as its own,
 * and `onResize` given the shares as `{ size }`. The group clips its panels, and a group inside
 * another's panel shrinks with it.
 */
function ResizablePanelGroup(props: {
  panels: readonly PanelEntry[]
  defaultSize?: readonly number[]
  orientation?: "horizontal" | "vertical"
  onResize?: (details: { size: number[] }) => void
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ orientation: "horizontal" } as const, props),
    [
      "panels",
      "defaultSize",
      "orientation",
      "onResize",
      "asChild",
      "class",
      "sx",
      "children",
    ]
  )
  // Inside another group's panel: the outer group's sizes are there to find.
  const nested = useContext(PanelSizesContext) !== undefined
  const sizes: PanelSizes = (id) => {
    const index = local.panels.findIndex((panel) => panel.id === id)
    const panel = local.panels[index]
    return {
      defaultSize: index === -1 ? undefined : local.defaultSize?.[index],
      minSize: panel?.minSize,
      maxSize: panel?.maxSize,
    }
  }
  return (
    <PanelSizesContext.Provider value={sizes}>
      <Resizable.Group
        render={asRender(local.asChild)}
        data-slot="resizable-panel-group"
        orientation={local.orientation}
        {...rest}
        onSizesChange={(size: number[]) => local.onResize?.({ size })}
        {...styleProps(
          local.class,
          resizable.group,
          resizable.groupKirana,
          nested && resizable.groupNestedKirana,
          local.sx
        )}
      >
        {local.children}
      </Resizable.Group>
    </PanelSizesContext.Provider>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
