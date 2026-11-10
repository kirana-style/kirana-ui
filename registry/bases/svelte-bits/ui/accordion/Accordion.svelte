<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Accordion } from "bits-ui"
  import { untrack } from "svelte"

  import { accordion } from "../../../../styles/accordion.styles"

  /**
   * Base UI's props, as Svelte's Ark UI part takes them: `multiple`, and a value that is always a
   * list (`defaultValue`, `value`, `onValueChange` with `{ value }`). Bits' single accordion takes
   * one value, so the list's first goes in and comes back out as a list.
   */
  let {
    multiple = false,
    defaultValue,
    value,
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    multiple?: boolean
    defaultValue?: string[]
    value?: string[]
    onValueChange?: (details: { value: string[] }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state<string[]>(untrack(() => defaultValue ?? []))
  const current = $derived(value ?? own)
  const change = (next: string | string[]) => {
    const list = Array.isArray(next) ? next : next ? [next] : []
    own = list
    onValueChange?.({ value: list })
  }
</script>

<!-- A closed panel leaves the page, as Base UI's does (`AccordionContent`). -->
{#if multiple}
  <Accordion.Root type="multiple" data-slot="accordion" {...rest} value={current} onValueChange={change} sx={[accordion.root, className as Sx]}>
    {@render children?.()}
  </Accordion.Root>
{:else}
  <Accordion.Root type="single" data-slot="accordion" {...rest} value={current[0] ?? ""} onValueChange={change} sx={[accordion.root, className as Sx]}>
    {@render children?.()}
  </Accordion.Root>
{/if}
