<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { PaneGroup } from "paneforge"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { resizable } from "../../../../styles/resizable.styles"
  import { PANELS } from "./context"
  import type { PanelEntry, PanelsContext } from "./context"

  /**
   * paneforge's group. The panels are named on the group (`panels`, `defaultSize`), as on the Ark
   * UI parts, where paneforge sizes each pane: each pane reads its own entry by its id.
   * `onResize` gets the sizes as `details.size`, the Ark UI parts' shape.
   */
  let {
    panels,
    defaultSize,
    orientation = "horizontal",
    onResize,
    class: className,
    children,
    ...rest
  }: {
    panels: PanelEntry[]
    defaultSize?: number[]
    orientation?: "horizontal" | "vertical"
    onResize?: (details: { size: number[] }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setContext<PanelsContext>(PANELS, {
    panels: () => panels,
    defaultSize: () => defaultSize,
  })
</script>

<PaneGroup
  data-slot="resizable-panel-group"
  direction={orientation}
  onLayoutChange={(layout: number[]) => onResize?.({ size: layout })}
  {...rest}
  sx={[resizable.group, className as Sx]}
>
  {@render children?.()}
</PaneGroup>
