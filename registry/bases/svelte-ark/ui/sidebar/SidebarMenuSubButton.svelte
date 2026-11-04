<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "@ark-ui/svelte"

  import { Ark } from "@ark-ui/svelte"

  import { sidebar } from "../../../../styles/sidebar.styles"

  let {
    asChild,
    size = "md",
    isActive = false,
    class: className,
    children,
    ...rest
  }: {
  
    size?: "sm" | "md"
    isActive?: boolean
    asChild?: Snippet<[PropsFn<"a">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Ark as="a" data-slot="sidebar-menu-sub-button" data-sidebar="menu-sub-button" data-size={size} data-active={isActive ? '' : undefined} {...rest} sx={[sidebar.menuSubButton, className as Sx]} {asChild}>
  {@render children?.()}
</Ark>
