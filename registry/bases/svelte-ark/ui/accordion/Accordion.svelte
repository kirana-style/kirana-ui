<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { AccordionRootProps } from "@ark-ui/svelte"

  import { AccordionRoot } from "@ark-ui/svelte"

  import { accordion } from "../../../../styles/accordion.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AccordionRootProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- A closed panel leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
<AccordionRoot {asChild} data-slot="accordion" lazyMount unmountOnExit {...rest} sx={[accordion.root, className as Sx]}>
  {@render children?.()}
</AccordionRoot>
