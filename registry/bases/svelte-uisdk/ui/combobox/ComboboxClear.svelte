<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ComboboxClear } from "@ui-sdk/svelte/combobox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { InputGroupButton } from "../input-group"

  /** ui-sdk's clear, drawn as the InputGroup's button. */
  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={ComboboxClear} slotName="combobox-clear" tag="button" {...rest}>
  {#snippet asChild(props)}
    <InputGroupButton {...props()} variant="ghost" size="icon-xs" sx={className as Sx}>
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
      />
    </InputGroupButton>
  {/snippet}
</UisdkPart>
