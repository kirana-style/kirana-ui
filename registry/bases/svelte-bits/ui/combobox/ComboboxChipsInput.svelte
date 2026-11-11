<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Combobox } from "bits-ui"

  import { combobox } from "../../../../styles/combobox.styles"
  import { useCombobox } from "./context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // What the person types filters the items.
  const ctx = useCombobox()
</script>

<Combobox.Input
  data-slot="combobox-chip-input"
  {...rest}
  oninput={(event: Event) => {
    ctx.query = (event.currentTarget as HTMLInputElement).value
  }}
  sx={[combobox.chipInput, className as Sx]}
/>
