<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tour } from "@kirana-ui/svelte/tour"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { dialog } from "../../../../styles/dialog.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"

  /** A ghost icon Button in the popup's corner that ends the tour. */
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

<Tour.Close data-slot="tour-close" {...rest}>
  {#snippet child({ props })}
    <Button {...props} variant="ghost" size="icon-sm" sx={[dialog.close, className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
        <span sx={visuallyHidden}>Close</span>
      {/if}
    </Button>
  {/snippet}
</Tour.Close>
