<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuItemGroupProps } from "@ark-ui/svelte"

  import { MenuItemGroup } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: MenuItemGroupProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<MenuItemGroup {asChild} data-slot="dropdown-menu-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</MenuItemGroup>
