<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { DrawerTriggerProps } from "@ark-ui/svelte"

  import { DrawerTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: DrawerTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<DrawerTrigger {asChild} data-slot="drawer-trigger" {...rest} sx={[className as Sx]}>
  {@render children?.()}
</DrawerTrigger>
