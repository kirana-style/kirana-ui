<script lang="ts">
  import type { Snippet } from "svelte"
  import { ComboboxValue } from "@ui-sdk/svelte/combobox"

  let { children: render }: { children?: Snippet<[any[]]> } = $props()

  /** The value as a list: none, one, or a `multiple` combobox's. */
  const list = (value: unknown): unknown[] =>
    value === undefined || value === null ? [] : Array.isArray(value) ? value : [value]
</script>

<!-- The selection, through the snippet as Base UI's value calls its children; else its labels. -->
<ComboboxValue>
  {#snippet children(state: { value: unknown; label: string })}
    {#if render}{@render render(list(state.value))}{:else}{state.label}{/if}
  {/snippet}
</ComboboxValue>
