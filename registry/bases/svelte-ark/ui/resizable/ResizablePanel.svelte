<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { SplitterPanelProps } from "@ark-ui/svelte"

  import { SplitterPanel } from "@ark-ui/svelte"

  let {
    id, asChild,
    class: className,
    children,
    ...rest
  }: {
    id: string
    asChild?: SplitterPanelProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark's required `id`, one of the group's `panels`, declared here and passed on.
</script>

<SplitterPanel {asChild} data-slot="resizable-panel" id={id} {...rest} sx={className as Sx}>
  {@render children?.()}
</SplitterPanel>
