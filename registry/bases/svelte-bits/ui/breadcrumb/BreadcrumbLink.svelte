<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import Element from "../../../../lib/svelte/Element.svelte"

  import { breadcrumb } from "../../../../styles/breadcrumb.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {

    asChild?: Snippet<[PropsFn<"a">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Element as="a" data-slot="breadcrumb-link" {...rest} sx={[breadcrumb.link, className as Sx]} {asChild}>
  {@render children?.()}
</Element>
