<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Combobox } from "@kirana-ui/svelte/combobox"

  import { combobox } from "../../../../styles/combobox.styles"
  import { useCombobox } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    /** Each of the root's items, as Base UI's list calls its children with each. */
    // oxlint-disable-next-line no-explicit-any
    children?: Snippet<[{ item: any; index: number }]>
    [attribute: string]: unknown
  } = $props()

  const context = useCombobox()
</script>

<!-- Kirana UI shows the items that match what is typed. -->
<Combobox.List data-slot="combobox-list" {...rest} sx={[combobox.list, className as Sx]}>
  {#each context.items as item, index (index)}
    {@render children?.({ item, index })}
  {/each}
</Combobox.List>
