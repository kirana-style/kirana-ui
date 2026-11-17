<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxInput } from "@ui-sdk/svelte/combobox"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { combobox } from "../../../../styles/combobox.styles"

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

<UisdkPart part={ComboboxInput} slotName="combobox-chip-input" tag="input" {...rest} sx={[combobox.chipInput, className as Sx]}></UisdkPart>
