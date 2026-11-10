<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Accordion } from "bits-ui"

  import { accordion } from "../../../../styles/accordion.styles"

  // Bits' `value` is declared here and passed on, so a project's type checker sees it.
  let {
    value,
    class: className,
    children,
    ...rest
  }: {
    value: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Accordion.Item data-slot="accordion-item" {value} {...rest} sx={[accordion.item, className as Sx]}>
  {@render children?.()}
</Accordion.Item>
