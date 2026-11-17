<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuSeparator } from "@ui-sdk/svelte/menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { menuSeparator } from "../../../../styles/menu.styles"

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

<UisdkPart part={MenuSeparator} slotName="context-menu-separator" tag="div" {...rest} sx={[menuSeparator, className as Sx]}>
  {@render children?.()}
</UisdkPart>
