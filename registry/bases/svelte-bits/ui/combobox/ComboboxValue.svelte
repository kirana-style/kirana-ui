<script lang="ts">
  import type { Snippet } from "svelte"

  import { useCombobox } from "./context"

  let {
    children
  }: {
    /** Given the selected items, as Base UI's value calls its children. */
    // oxlint-disable-next-line no-explicit-any
    children?: Snippet<[any[]]>
  } = $props()

  const ctx = useCombobox()
</script>

<!-- The selection, through the slot as Base UI's value calls its children; else its labels. -->
{#if children}{@render children(ctx.selected)}{:else}
  {ctx.selected.map(ctx.label).join(", ")}
{/if}
