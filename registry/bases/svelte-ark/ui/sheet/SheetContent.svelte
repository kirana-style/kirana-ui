<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog, DialogCloseTrigger, DialogContent, Portal } from "@ark-ui/svelte"

  // Ark's Svelte package exports these Dialog parts only as `Dialog.*` (LF-009).

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { sheet } from "../../../../styles/sheet.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"
  import SheetOverlay from "./SheetOverlay.svelte"

  let {
    side = "right", showCloseButton = true,
    class: className,
    children,
    ...rest
  }: {
    side?: "top" | "right" | "bottom" | "left"
    showCloseButton?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Portal>
  <SheetOverlay />
  <Dialog.Positioner>
    <DialogContent data-slot="sheet-content" data-side={side} {...rest} sx={[sheet.content, sheet.side[side], className as Sx]}>
      {@render children?.()}
      {#if showCloseButton}
        <DialogCloseTrigger data-slot="sheet-close">
          {#snippet asChild(props)}
            <Button {...props()} class={props().class} style={props().style} variant="ghost" size="icon-sm" sx={sheet.close}>
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
