<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ComboboxList } from "@ui-sdk/svelte/combobox"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import { useItems } from "./context"

  let {
    class: className,
    children: row,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet<[{ item: any; index: number }]>
    [attribute: string]: unknown
  } = $props()

  const items = useItems()
</script>

<!-- Each of the root's items through the snippet, as Base UI's list calls its children with each;
     ui-sdk hides those that do not match what is typed. -->
<UisdkPart part={ComboboxList} slotName="combobox-list" {...rest} sx={[combobox.list, className as Sx]}>
  {#each items?.() ?? [] as item, index (index)}
    {@render row?.({ item, index })}
  {/each}
</UisdkPart>
