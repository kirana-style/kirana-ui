<script lang="ts">
  import type { Snippet } from "svelte"

  import { useGroupItems } from "./context"

  let { children: row }: { children?: Snippet<[{ item: any; index: number }]> } = $props()

  const items = useGroupItems()
</script>

<!-- Each of the group's items through the snippet, as Base UI's collection; ui-sdk filters them. -->
{#each items?.() ?? [] as item, index (index)}
  {@render row?.({ item, index })}
{/each}
