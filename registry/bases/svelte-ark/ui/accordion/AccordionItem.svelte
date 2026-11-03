<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { AccordionItemProps } from "@ark-ui/svelte"

  import { AccordionItem } from "@ark-ui/svelte"

  import { accordion } from "../../../../styles/accordion.styles"

  let {
    value, asChild,
    class: className,
    children,
    ...rest
  }: {
    value: string
    asChild?: AccordionItemProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
</script>

<AccordionItem {asChild} data-slot="accordion-item" value={value} {...rest} sx={[accordion.item, className as Sx]}>
  {@render children?.()}
</AccordionItem>
