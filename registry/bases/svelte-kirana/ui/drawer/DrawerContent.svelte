<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Drawer } from "@kirana-ui/svelte/drawer"
  import { getContext } from "svelte"

  import { drawer } from "../../../../styles/drawer.styles"
  import { DRAWER } from "./context.svelte"
  import type { DrawerOptions } from "./context.svelte"
  import DrawerOverlay from "./DrawerOverlay.svelte"
  import DrawerSwipeHandle from "./DrawerSwipeHandle.svelte"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const options = getContext<DrawerOptions | undefined>(DRAWER)
  if (!options) throw new Error("DrawerContent must be used within a Drawer.")
  const swipeAxis = $derived(
    options.swipeDirection === "down" || options.swipeDirection === "up" ? "y" : "x"
  )
</script>

<Drawer.Portal>
  {#if options.modal}
    <DrawerOverlay data-snap-points={options.hasSnapPoints ? "" : undefined} />
  {/if}
  <!-- Base UI's viewport and content, which Kirana UI's drawer does not have: the boxes
       themselves, as React's Kirana UI drawer draws them. -->
  <div data-slot="drawer-viewport" data-modal={String(options.modal)} sx={drawer.viewport}>
    <Drawer.Popup
      data-slot="drawer-popup"
      data-swipe-axis={swipeAxis}
      data-snap-points={options.hasSnapPoints ? "" : undefined}
      {...rest}
      sx={[drawer.popup, drawer.motion, className as Sx]}
    >
      {#if options.showSwipeHandle}
        <DrawerSwipeHandle />
      {/if}
      <div data-slot="drawer-content" sx={drawer.content}>
        {@render children?.()}
      </div>
    </Drawer.Popup>
  </div>
</Drawer.Portal>
