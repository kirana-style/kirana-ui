<script lang="ts">
  import type { Snippet } from "svelte"

  import { useComboboxGroup } from "./context"

  let {
    children,
  }: {
    /** Each of its group's items, as Base UI's collection calls its children with each. */
    // oxlint-disable-next-line no-explicit-any
    children?: Snippet<[{ item: any; index: number }]>
  } = $props()

  const items = useComboboxGroup()
</script>

{#each items?.() ?? [] as item, index (index)}
  {@render children?.({ item, index })}
{/each}
