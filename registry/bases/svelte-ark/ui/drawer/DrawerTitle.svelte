<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { DrawerTitleProps } from "@ark-ui/svelte"

  import { DrawerTitle } from "@ark-ui/svelte"

  import { drawer } from "../../../../styles/drawer.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: DrawerTitleProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<DrawerTitle {asChild} data-slot="drawer-title" {...rest} sx={[drawer.title, className as Sx]}>
  {@render children?.()}
</DrawerTitle>
