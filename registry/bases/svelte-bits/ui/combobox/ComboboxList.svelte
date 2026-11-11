<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { combobox } from "../../../../styles/combobox.styles"
  import { useCombobox } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    /** Each matching item, as Base UI's list calls its children with each. */
    // oxlint-disable-next-line no-explicit-any
    children?: Snippet<[{ item: any; index: number }]>
    [attribute: string]: unknown
  } = $props()
  const ctx = useCombobox()
</script>

<!-- Each matching item through the snippet itself, as Base UI's list calls its children with each:
     Bits' content is the list box, this is the part that scrolls. -->
<div
  data-slot="combobox-list"
  data-empty={ctx.filtered.length === 0 ? "" : undefined}
  {...rest}
  class={className}
  sx={combobox.list}
>
  {#each ctx.filtered as item, index (index)}
    {@render children?.({ item, index })}
  {/each}
</div>
