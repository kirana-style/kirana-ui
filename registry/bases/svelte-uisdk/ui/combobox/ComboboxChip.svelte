<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxChip, ComboboxChipRemove } from "@ui-sdk/svelte/combobox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import { Button } from "../button"

  let {
    showRemove = true,
    value,
    class: className,
    children,
    ...rest
  }: {
    showRemove?: boolean
    /** The chip's item, which its remove button takes out of the selection. */
    value?: unknown
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={ComboboxChip} slotName="combobox-chip" {value} {...rest} sx={[combobox.chip, className as Sx]}>
  {@render children?.()}
  {#if showRemove}
    <UisdkPart part={ComboboxChipRemove} slotName="combobox-chip-remove" tag="button">
      {#snippet asChild(props)}
        <Button {...props()} variant="ghost" size="icon-xs" sx={combobox.chipRemove}>
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
        </Button>
      {/snippet}
    </UisdkPart>
  {/if}
</UisdkPart>
