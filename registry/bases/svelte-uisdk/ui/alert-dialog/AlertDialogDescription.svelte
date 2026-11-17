<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialogDescription } from "@ui-sdk/svelte/alert-dialog"

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

<UisdkPart part={AlertDialogDescription} slotName="alert-dialog-description" tag="p" {...rest} sx={[alertDialog.description, className as Sx]}>
  {@render children?.()}
</UisdkPart>
