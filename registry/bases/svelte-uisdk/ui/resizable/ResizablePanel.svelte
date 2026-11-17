<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ResizablePanel } from "@ui-sdk/svelte/resizable"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { usePanels } from "./context"

  /** A panel, its limits from its group's `panels` entry, as Ark UI's splitter reads them. */
  let {
    id,
    class: className,
    children,
    ...rest
  }: {
    id: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const panels = usePanels()
  const entry = $derived(panels?.()?.find((panel) => panel.id === id))
</script>

<UisdkPart
  part={ResizablePanel}
  slotName="resizable-panel"
  {id}
  minSize={entry?.minSize}
  maxSize={entry?.maxSize}
  collapsible={entry?.collapsible}
  collapsedSize={entry?.collapsedSize}
  {...rest}
  sx={className as Sx}
>
  {@render children?.()}
</UisdkPart>
