<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DialogContent, DialogClose } from "@ui-sdk/svelte/dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"
  import { sheet } from "../../../../styles/sheet.styles"
  import { useContent } from "./context"
  import SheetOverlay from "./SheetOverlay.svelte"

  let {
    side = "right",
    showCloseButton = true,
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

  const content = useContent()
</script>

<SheetOverlay />
<UisdkPart
  part={DialogContent}
  slotName="sheet-content"
  data-side={side}
  element={(el: HTMLElement | null) => content && (content.el = el)}
  {...rest}
  sx={[sheet.content, sheet.side[side], className as Sx]}
>
  {@render children?.()}
  {#if showCloseButton}
    <UisdkPart part={DialogClose} slotName="sheet-close" tag="button">
      {#snippet asChild(props)}
        <Button {...props()} variant="ghost" size="icon-sm" sx={sheet.close}>
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
