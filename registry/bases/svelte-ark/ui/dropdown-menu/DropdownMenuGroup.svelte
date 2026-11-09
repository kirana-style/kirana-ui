<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuItemGroupProps } from "@ark-ui/svelte"

  import { MenuItemGroup, MenuRadioItemGroup } from "@ark-ui/svelte"

  import { getRadioGroup } from "./radio-group"

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

  // Inside a radio group, its items still answer to that group's value.
  const radio = getRadioGroup()
</script>

{#if radio}
  <MenuRadioItemGroup {asChild} data-slot="dropdown-menu-group" value={radio.value} onValueChange={radio.onValueChange} {...rest} sx={className as Sx}>
    {@render children?.()}
  </MenuRadioItemGroup>
{:else}
  <MenuItemGroup {asChild} data-slot="dropdown-menu-group" {...rest} sx={className as Sx}>
    {@render children?.()}
  </MenuItemGroup>
{/if}
