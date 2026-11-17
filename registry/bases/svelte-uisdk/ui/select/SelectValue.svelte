<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { SelectValue } from "@ui-sdk/svelte/select"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { select } from "../../../../styles/select.styles"
  import { useItems } from "./context"
  import type { Entry } from "./context"

  /**
   * ui-sdk's chosen label or placeholder; a snippet draws the value itself, given it as a list and
   * the chosen entries of the root's `items`, as Svelte's Ark UI part gives them.
   */
  let {
    class: className,
    children: render,
    ...rest
  }: {
    placeholder?: string
    class?: ClassValue | null
    children?: Snippet<[{ value: string[]; items: Entry[] }]>
    [attribute: string]: unknown
  } = $props()

  const items = useItems()
  const list = (value: unknown): string[] =>
    value === null || value === undefined
      ? []
      : Array.isArray(value)
        ? (value as string[])
        : [value as string]
  const chosen = (value: unknown) =>
    (items?.() ?? []).filter((item) => list(value).includes(item.value as string))
</script>

{#snippet drawn(state: { value: unknown })}
  {@render render?.({ value: list(state.value), items: chosen(state.value) })}
{/snippet}

<UisdkPart
  part={SelectValue}
  slotName="select-value"
  tag="span"
  {...rest}
  sx={[select.value, className as Sx]}
  children={render ? drawn : undefined}
/>
