<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { ComboboxInputProps } from "@ark-ui/svelte"

  import { ComboboxInput } from "@ark-ui/svelte"

  import { combobox } from "../../../../styles/combobox.styles"

  let {
    asChild,
    class: className,
    ...rest
  }: {
    asChild?: ComboboxInputProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ComboboxInput {asChild} data-slot="combobox-chip-input" {...rest} sx={[combobox.chipInput, className as Sx]} />
