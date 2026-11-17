<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Resizable } from "@ui-sdk/svelte/resizable"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { resizable } from "../../../../styles/resizable.styles"
  import { setPanels } from "./context"
  import type { PanelEntry } from "./context"

  /**
   * ui-sdk's resizable group, with Ark UI's props: `defaultSize` is its `defaultLayout` (percent, in
   * panel order), and `panels` names them and their limits, which each panel hands ui-sdk. It writes
   * react-resizable-panels' `data-group` and the group's `aria-orientation`, which the state keys
   * read on React's ui-sdk base.
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
    panels?: PanelEntry[]
    defaultSize?: number[]
    orientation?: "horizontal" | "vertical"
    onResize?: (details: { size: number[] }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setPanels(() => panels)
</script>

<UisdkPart
  part={Resizable}
  slotName="resizable-panel-group"
  defaultLayout={defaultSize}
  {orientation}
  data-group=""
  aria-orientation={orientation}
  {...rest}
  onLayoutChange={(size: number[]) => onResize?.({ size })}
  sx={[resizable.group, resizable.groupUisdk, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
