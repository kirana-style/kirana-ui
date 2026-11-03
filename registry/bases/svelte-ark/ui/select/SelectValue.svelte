<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { SelectValueText, useSelectContext } from "@ark-ui/svelte"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"

  import { select } from "../../../../styles/select.styles"
  import { PLACEHOLDER } from "./placeholder"
  import type { PlaceholderContext } from "./placeholder"

  let {
    placeholder,
    class: className,
    children: render,
    ...rest
  }: {
    placeholder?: string
    class?: ClassValue | null
    /** What the trigger shows, as Base UI's render function: the value and its entries. */
    children?: Snippet<[{ value: string[]; items: unknown[] }]>
    [attribute: string]: unknown
  } = $props()

  const fallback = getContext<PlaceholderContext | undefined>(PLACEHOLDER)
  const context = useSelectContext()
  // A value with no entry to name it (items read from the markup arrive after it): shown as the
  // value itself, as Base UI's select shows it without items.
  const unnamed = $derived(!context().valueAsString && context().value.length > 0)
</script>

{#snippet custom()}
  {@render render?.({ value: context().value, items: context().selectedItems })}
{/snippet}
{#snippet bare()}
  {context().value.join(", ")}
{/snippet}

<!-- Ark prints its value's text unless given children, which pass on only when needed. -->
<SelectValueText
  data-slot="select-value"
  placeholder={placeholder ?? fallback?.()}
  children={render ? custom : unnamed ? bare : undefined}
  {...rest}
  sx={[select.value, className as Sx]}
/>
