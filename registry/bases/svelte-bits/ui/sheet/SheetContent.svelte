<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { sheet } from "../../../../styles/sheet.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"
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

  /** Bits' inline style without its `contain: layout style`, which Base UI's popup has not. */
  const withoutContain = (style: unknown) =>
    typeof style === "string" ? style.replace(/(^|;)\s*contain:[^;]*/g, "$1") : undefined
</script>

<!-- The popup in the page's portal beside its backdrop, as Base UI's: no positioner around it. -->
<Dialog.Portal>
  <SheetOverlay />
  <Dialog.Content data-slot="sheet-content" data-side={side} {...rest} sx={[sheet.content, sheet.side[side], className as Sx]}>
    {#snippet child({ props })}
      <div {...props} style={withoutContain(props.style)}>
        {@render children?.()}
        {#if showCloseButton}
          <Dialog.Close data-slot="sheet-close">
            {#snippet child({ props: close })}
              <Button {...close} variant="ghost" size="icon-sm" sx={sheet.close}>
                <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
                <span sx={visuallyHidden}>Close</span>
              </Button>
            {/snippet}
          </Dialog.Close>
        {/if}
      </div>
    {/snippet}
  </Dialog.Content>
</Dialog.Portal>
