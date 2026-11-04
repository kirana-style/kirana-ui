<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { DialogBackdropProps } from "@ark-ui/svelte"

  import { DialogBackdrop } from "@ark-ui/svelte"

  import { dialog } from "../../../../styles/dialog.styles"
  import { backdropMotion } from "../../../../styles/overlay.styles"

  let {
    asChild,
    class: className,
    ...rest
  }: {
    asChild?: DialogBackdropProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<DialogBackdrop {asChild} data-slot="dialog-overlay" {...rest} sx={[backdropMotion, dialog.overlay, className as Sx]} />
