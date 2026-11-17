<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DialogDescription } from "@ui-sdk/svelte/dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { sheet } from "../../../../styles/sheet.styles"

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

<UisdkPart part={DialogDescription} slotName="sheet-description" tag="p" {...rest} sx={[sheet.description, className as Sx]}>
  {@render children?.()}
</UisdkPart>
