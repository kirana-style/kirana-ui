<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { DrawerBackdropProps } from "@ark-ui/svelte"

  import { DrawerBackdrop } from "@ark-ui/svelte"

  import { drawer } from "../../../../styles/drawer.styles"

  let {
    asChild,
    class: className,
    ...rest
  }: {
    asChild?: DrawerBackdropProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<DrawerBackdrop {asChild} data-slot="drawer-overlay" {...rest} sx={[drawer.overlay, className as Sx]} />
