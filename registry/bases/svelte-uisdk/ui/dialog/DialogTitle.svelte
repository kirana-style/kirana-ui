<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DialogTitle } from "@ui-sdk/svelte/dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { dialog } from "../../../../styles/dialog.styles"

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

<UisdkPart part={DialogTitle} slotName="dialog-title" tag="h2" {...rest} sx={[dialog.title, className as Sx]}>
  {@render children?.()}
</UisdkPart>
