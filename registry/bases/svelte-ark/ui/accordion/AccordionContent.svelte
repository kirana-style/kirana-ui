<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { AccordionItemContentProps } from "@ark-ui/svelte"

  import { AccordionItemContent } from "@ark-ui/svelte"

  import { accordion } from "../../../../styles/accordion.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AccordionItemContentProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<AccordionItemContent {asChild} data-slot="accordion-content" {...rest} sx={[accordion.content, accordion.contentArk]}>
  <div class={className} sx={accordion.contentInner}>
    {@render children?.()}
  </div>
</AccordionItemContent>
