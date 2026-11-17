<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialogTitle } from "@ui-sdk/svelte/alert-dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { alertDialog } from "../../../../styles/alert-dialog.styles"

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

<UisdkPart part={AlertDialogTitle} slotName="alert-dialog-title" tag="h2" {...rest} sx={[alertDialog.title, className as Sx]}>
  {@render children?.()}
</UisdkPart>
