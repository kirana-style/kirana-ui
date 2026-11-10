<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { select } from "../../../../styles/select.styles"
  import { useSelect } from "./context"

  /**
   * What the trigger shows, as Base UI's value: the chosen entries' labels, the placeholder while
   * none is chosen, or the caller's render with the value and its entries. A value with no entry to
   * name it is shown as itself, as Base UI's select shows it without items.
   */
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
        context?.entries.find((entry) => entry.value === each) ?? {
          label: each,
          value: each,
        }
    )
  )
  const shown = $derived(placeholder ?? context?.placeholder)
</script>

<span data-slot="select-value" {...rest} class={className} sx={select.value}>
  {#if render}
    {@render render({ value, items })}
  {:else if items.length}
    {items.map((item) => item.label).join(", ")}
  {:else}
    {shown}
  {/if}
</span>
