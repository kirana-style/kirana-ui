<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuItemProps } from "@ark-ui/svelte"

  import { MenuItem } from "@ark-ui/svelte"

  import {
    menuRowBase,
    menuRowDestructive,
    menuRowPadding,
  } from "../../../../styles/menu.styles"

  let {
    value,
    inset = false,
    variant = "default", asChild,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    inset?: boolean
    variant?: "default" | "destructive"
    asChild?: MenuItemProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark names every item with `value`, which its select events report; one without it gets its own.

  const id = $props.id()
</script>

<MenuItem {asChild} data-slot="dropdown-menu-item" value={value ?? id} data-inset={inset || undefined} data-variant={variant} {...rest} sx={[menuRowBase, menuRowPadding, variant === 'destructive' && menuRowDestructive, className as Sx]}>
  {@render children?.()}
</MenuItem>
