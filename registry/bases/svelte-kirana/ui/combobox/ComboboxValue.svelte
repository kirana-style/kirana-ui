<script lang="ts">
  import type { Snippet } from "svelte"

  import { useCombobox } from "./context"

  let {
    children,
  }: {
    /** Given the selected items, as Base UI's value calls its children. */
    // oxlint-disable-next-line no-explicit-any
    children?: Snippet<[any[]]>
  } = $props()

  const context = useCombobox()
</script>

<!-- Kirana UI's combobox has no Value part: the root mirrors what is chosen. -->
{#if children}
  {@render children([...context.selected])}
{:else}
  {context.selected.map(context.label).join(", ")}
{/if}
