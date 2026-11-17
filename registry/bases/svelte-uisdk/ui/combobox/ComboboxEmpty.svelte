<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxEmpty } from "@ui-sdk/svelte/combobox"

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

<UisdkPart part={ComboboxEmpty} slotName="combobox-empty" tag="div" {...rest} sx={[combobox.empty, className as Sx]}>
  {@render children?.()}
</UisdkPart>
