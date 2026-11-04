<script lang="ts">
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"

  import { COMBOBOX_GROUP } from "./context"
  import type { ComboboxGroupContext } from "./context"

  let {
    children
  }: {
    children?: Snippet<[{ item: any; index: number }]>
  } = $props()
  const group = getContext<ComboboxGroupContext | undefined>(COMBOBOX_GROUP)
</script>

<!-- Each of the group's matching items through the snippet, as Base UI's collection. -->
{#each group?.items ?? [] as item, index (index)}
  {@render children?.({ item, index })}
{/each}
