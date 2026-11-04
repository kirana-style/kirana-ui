<script lang="ts">
  import { DrawerContent, DrawerPositioner, Portal } from "@ark-ui/svelte"
  import type { Sx } from "@kirana-style/core"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { drawer } from "../../../../styles/drawer.styles"
  import { DRAWER } from "./context"
  import type { DrawerContext } from "./context"
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

  const context = getContext<DrawerContext | undefined>(DRAWER)
  if (!context) throw new Error("DrawerContent must be used within a Drawer.")
  const swipeAxis = $derived(
    context.swipeDirection === "down" || context.swipeDirection === "up" ? "y" : "x"
  )
</script>

<!-- Ark's positioner is Base UI's viewport, its content the popup; the content inside is ours. -->
<Portal>
  {#if context.modal}
    <DrawerOverlay data-snap-points={context.hasSnapPoints ? "" : undefined} />
  {/if}
  <DrawerPositioner data-slot="drawer-viewport" data-modal={String(context.modal)} sx={drawer.viewport}>
    <DrawerContent
      data-slot="drawer-popup"
      data-swipe-axis={swipeAxis}
      data-snap-points={context.hasSnapPoints ? "" : undefined}
      {...rest}
      sx={[drawer.popup, drawer.motion, className as Sx]}
    >
      {#if context.showSwipeHandle}
        <DrawerSwipeHandle />
      {/if}
      <div data-slot="drawer-content" sx={drawer.content}>
        {@render children?.()}
      </div>
    </DrawerContent>
  </DrawerPositioner>
</Portal>
