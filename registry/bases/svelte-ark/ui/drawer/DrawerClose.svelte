<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { DrawerCloseTriggerProps } from "@ark-ui/svelte"

  import { DrawerCloseTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: DrawerCloseTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<DrawerCloseTrigger {asChild} data-slot="drawer-close" {...rest} sx={className as Sx}>
  {@render children?.()}
</DrawerCloseTrigger>
