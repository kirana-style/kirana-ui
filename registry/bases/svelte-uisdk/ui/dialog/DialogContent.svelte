<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DialogContent, DialogClose } from "@ui-sdk/svelte/dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"
  import { modalMotion } from "../../../../styles/overlay.styles"
  import { dialog } from "../../../../styles/dialog.styles"
  import { useContent } from "./context"
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

  const content = useContent()
</script>

<DialogOverlay />
<UisdkPart
  part={DialogContent}
  slotName="dialog-content"
  element={(el: HTMLElement | null) => content && (content.el = el)}
  {...rest}
  sx={[modalMotion, dialog.content, className as Sx]}
>
  {@render children?.()}
  {#if showCloseButton}
    <UisdkPart part={DialogClose} slotName="dialog-close" tag="button">
      {#snippet asChild(props)}
        <Button {...props()} variant="ghost" size="icon-sm" sx={dialog.close}>
          <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
          />
          <span sx={visuallyHidden}>Close</span>
        </Button>
      {/snippet}
    </UisdkPart>
  {/if}
</UisdkPart>
