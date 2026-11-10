<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"
  import {
    menuRowBase,
    menuRowDestructive,
    menuRowPadding,
  } from "../../../../styles/menu.styles"

  // `value`, which Ark's items take and their select events report, is accepted and not needed.
  let {
    value: _value,
    inset = false,
    variant = "default",
    asChild,
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
</script>

{#if asChild}
  <ContextMenu.Item data-slot="context-menu-item" data-inset={inset || undefined} data-variant={variant} {...rest} sx={[menuRowBase, menuRowPadding, variant === 'destructive' && menuRowDestructive, className as Sx]}>
    {#snippet child({ props })}
      {@render asChild(propsFn(props))}
    {/snippet}
  </ContextMenu.Item>
{:else}
  <ContextMenu.Item data-slot="context-menu-item" data-inset={inset || undefined} data-variant={variant} {...rest} sx={[menuRowBase, menuRowPadding, variant === 'destructive' && menuRowDestructive, className as Sx]}>
    {@render children?.()}
  </ContextMenu.Item>
{/if}
