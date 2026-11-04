<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog, DialogCloseTrigger, DialogContent, Portal } from "@ark-ui/svelte"

  // Ark's Svelte package exports these Dialog parts only as `Dialog.*` (LF-009).

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { dialog } from "../../../../styles/dialog.styles"
  import { modalMotion } from "../../../../styles/overlay.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"
  import DialogOverlay from "./DialogOverlay.svelte"

  let {
    showCloseButton = true,
    class: className,
    children,
    ...rest
  }: {
    showCloseButton?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Portal>
  <DialogOverlay />
  <Dialog.Positioner>
    <DialogContent data-slot="dialog-content" {...rest} sx={[modalMotion, dialog.content, className as Sx]}>
      {@render children?.()}
      {#if showCloseButton}
        <DialogCloseTrigger data-slot="dialog-close">
          {#snippet asChild(props)}
            <Button {...props()} class={props().class} style={props().style} variant="ghost" size="icon-sm" sx={dialog.close}>
              <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
              <span sx={visuallyHidden}>
                Close
              </span>
            </Button>
          {/snippet}
        </DialogCloseTrigger>
      {/if}
    </DialogContent>
  </Dialog.Positioner>
</Portal>
