<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuItem } from "@ui-sdk/svelte/menu"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import {
    menuRowBase,
    menuRowDestructive,
    menuRowPadding,
  } from "../../../../styles/menu.styles"

  let {
    asChild,
    value,
    inset,
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
    value?: string
    inset?: boolean
    variant?: "default" | "destructive"
    asChild?: AsChild<"div">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark UI's item names itself when given no value; ui-sdk's needs one.
  const id = $props.id()
</script>

<UisdkPart part={MenuItem} slotName="context-menu-item" tag="div" value={value ?? id} data-inset={inset || undefined} data-variant={variant} {asChild} {...rest} sx={[
    menuRowBase,
    menuRowPadding,
    variant === 'destructive' && menuRowDestructive,
    className as Sx,
  ]}>
  {@render children?.()}
</UisdkPart>
