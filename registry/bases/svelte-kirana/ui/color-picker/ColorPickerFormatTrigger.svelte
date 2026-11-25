<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"

  /** A ghost icon Button that writes the colour in the next format: hex, then rgb, then hsl. */
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

<ColorPicker.FormatTrigger data-slot="color-picker-format-trigger" {...rest}>
  {#snippet child({ props })}
    <Button {...props} variant="ghost" size="icon" sx={[className as Sx]}>
      {#if children}
        {@render children()}
      {:else}
        <IconPlaceholder lucide="ArrowLeftRightIcon" tabler="IconArrowsLeftRight" hugeicons="ArrowDataTransferHorizontalIcon" phosphor="ArrowsLeftRightIcon" remixicon="RiArrowLeftRightLine" />
        <span sx={visuallyHidden}>Change the format</span>
      {/if}
    </Button>
  {/snippet}
</ColorPicker.FormatTrigger>
