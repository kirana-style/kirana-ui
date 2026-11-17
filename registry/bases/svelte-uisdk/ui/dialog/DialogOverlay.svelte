<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DialogBackdrop } from "@ui-sdk/svelte/dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { backdropMotion } from "../../../../styles/overlay.styles"
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

<UisdkPart part={DialogBackdrop} slotName="dialog-overlay" tag="div" {...rest} sx={[backdropMotion, dialog.overlay, className as Sx]}>
  {@render children?.()}
</UisdkPart>
