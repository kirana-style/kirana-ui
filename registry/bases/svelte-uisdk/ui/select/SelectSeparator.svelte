<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { SelectSeparator } from "@ui-sdk/svelte/select"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { menuSeparator } from "../../../../styles/menu.styles"
  import { select } from "../../../../styles/select.styles"

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

<UisdkPart part={SelectSeparator} slotName="select-separator" tag="div" {...rest} sx={[menuSeparator, select.separator, className as Sx]}>
  {@render children?.()}
</UisdkPart>
