<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ComboboxListProps } from "@ark-ui/svelte"

  import { ComboboxList } from "@ark-ui/svelte"

  import { combobox } from "../../../../styles/combobox.styles"
  import { useCombobox } from "./context"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: ComboboxListProps["asChild"]
    class?: ClassValue | null
    /** Each matching item, as Base UI's list calls its children with each. */
    children?: Snippet<[{ item: any; index: number }]>
    [attribute: string]: unknown
  } = $props()
  const ctx = useCombobox()
</script>

<!-- Each matching item through the snippet, as Base UI's list calls its children with each. -->
<ComboboxList {asChild} data-slot="combobox-list" {...rest} sx={[combobox.list, className as Sx]}>
  {#each ctx.filtered as item, index (index)}
    {@render children?.({ item, index })}
  {/each}
</ComboboxList>
