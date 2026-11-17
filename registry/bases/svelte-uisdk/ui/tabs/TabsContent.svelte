<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { TabsPanel } from "@ui-sdk/svelte/tabs"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { tabs } from "../../../../styles/tabs.styles"

  let {
    value,
    class: className,
    children,
    ...rest
  }: {
   value: string 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={TabsPanel} slotName="tabs-content" tag="div" value={value} {...rest} sx={[tabs.content, className as Sx]}>
  {@render children?.()}
</UisdkPart>
