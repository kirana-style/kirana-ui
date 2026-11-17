<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialogBackdrop } from "@ui-sdk/svelte/alert-dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { backdropMotion } from "../../../../styles/overlay.styles"
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

<UisdkPart part={AlertDialogBackdrop} slotName="alert-dialog-overlay" tag="div" {...rest} sx={[backdropMotion, alertDialog.overlay, className as Sx]}>
  {@render children?.()}
</UisdkPart>
