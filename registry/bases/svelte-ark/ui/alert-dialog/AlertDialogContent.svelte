<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog, DialogContent, Portal } from "@ark-ui/svelte"

  // Ark's Svelte package exports these Dialog parts only as `Dialog.*` (LF-009).

  import { alertDialog } from "../../../../styles/alert-dialog.styles"
  import { modalMotion } from "../../../../styles/overlay.styles"
  import AlertDialogOverlay from "./AlertDialogOverlay.svelte"

  let {
    size = "default",
    class: className,
    children,
    ...rest
  }: {
    size?: "default" | "sm"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Portal>
  <AlertDialogOverlay />
  <Dialog.Positioner>
    <DialogContent data-slot="alert-dialog-content" data-size={size} {...rest} sx={[modalMotion, alertDialog.content, className as Sx]}>
      {@render children?.()}
    </DialogContent>
  </Dialog.Positioner>
</Portal>
