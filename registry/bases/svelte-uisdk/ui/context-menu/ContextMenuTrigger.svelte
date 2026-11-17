<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuContextTrigger } from "@ui-sdk/svelte/menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { contextMenu } from "../../../../styles/context-menu.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- A div, as Base UI's trigger: a region, not a button. -->
<UisdkPart part={MenuContextTrigger} slotName="context-menu-trigger" tag="div" {...rest} sx={[contextMenu.trigger, className as Sx]}>
  {@render children?.()}
</UisdkPart>
