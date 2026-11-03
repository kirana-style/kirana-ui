<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "@ark-ui/svelte"

  import { Ark } from "@ark-ui/svelte"

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

<Ark as="a" data-slot="breadcrumb-link" {...rest} sx={[breadcrumb.link, className as Sx]} {asChild}>
  {@render children?.()}
</Ark>
