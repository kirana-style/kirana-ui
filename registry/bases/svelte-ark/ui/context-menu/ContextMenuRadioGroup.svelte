<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuRadioItemGroupProps } from "@ark-ui/svelte"

  import { MenuRadioItemGroup } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: MenuRadioItemGroupProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<MenuRadioItemGroup {asChild} data-slot="context-menu-radio-group" {...rest} sx={className as Sx}>
  {@render children?.()}
</MenuRadioItemGroup>
