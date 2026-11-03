<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { MenuTriggerProps } from "@ark-ui/svelte"

  import { MenuTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: MenuTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<MenuTrigger {asChild} data-slot="dropdown-menu-trigger" {...rest} sx={className as Sx}>
  {@render children?.()}
</MenuTrigger>
