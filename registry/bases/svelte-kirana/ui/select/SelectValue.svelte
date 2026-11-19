<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Select } from "@kirana-ui/svelte/select"

  import { select } from "../../../../styles/select.styles"
  import { useSelect } from "./context"

  let {
    placeholder,
    class: className,
    children: render,
    ...rest
  }: {
    placeholder?: string
    class?: ClassValue | null
    children?: Snippet<[{ value: string[]; items: unknown[] }]>
    [attribute: string]: unknown
  } = $props()

  const context = useSelect()
  const value = $derived([...(context?.value ?? [])])
  const items = $derived(
    value.map(
      (each) =>
        context?.entries.find((entry) => entry.value === each) ?? { label: each, value: each }
    )
  )
</script>

<!-- The part writes the chosen label, or the placeholder; a caller's snippet draws something else,
     given the value and its entries as Svelte's Ark UI parts give them. -->
{#if render}
  <Select.Value data-slot="select-value" placeholder={placeholder ?? context?.placeholder} {...rest} sx={[select.value, className as Sx]}>
    {#snippet children()}
      {@render render({ value, items })}
    {/snippet}
  </Select.Value>
{:else}
  <Select.Value data-slot="select-value" placeholder={placeholder ?? context?.placeholder} {...rest} sx={[select.value, className as Sx]} />
{/if}
