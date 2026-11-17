<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { TabsList } from "@ui-sdk/svelte/tabs"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { tabs } from "../../../../styles/tabs.styles"

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
   variant?: "default" | "line" 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={TabsList} slotName="tabs-list" tag="div" data-variant={variant} {...rest} sx={[tabs.list, variant === 'line' ? tabs.listLine : tabs.listDefault, className as Sx]}>
  {@render children?.()}
</UisdkPart>
