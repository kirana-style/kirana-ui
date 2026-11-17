<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DrawerContent } from "@ui-sdk/svelte/drawer"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { drawer } from "../../../../styles/drawer.styles"
  import { useDrawer } from "./context"
  import DrawerOverlay from "./DrawerOverlay.svelte"
  import DrawerSwipeHandle from "./DrawerSwipeHandle.svelte"

  /**
   * The sheet. ui-sdk's content places itself in a viewport of its own and moves itself
   * (`translate`), so it takes the popup's and the content's styles but not Base UI's motion, and
   * the attributes the registry's styles read on Base UI's (`data-swipe-direction`,
   * `data-swipe-axis`). It takes focus as it opens, as Base UI's popup; ui-sdk's goes to the first
   * field.
   */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const context = useDrawer()
  const axis = $derived(
    context.swipeDirection === "down" || context.swipeDirection === "up" ? "y" : "x"
  )
</script>

{#if context.modal}
  <DrawerOverlay data-snap-points={context.hasSnapPoints ? "" : undefined} />
{/if}
<UisdkPart
  part={DrawerContent}
  slotName="drawer-popup"
  initialFocus="content"
  data-modal={context.modal}
  data-swipe-axis={axis}
  data-swipe-direction={context.swipeDirection}
  data-snap-points={context.hasSnapPoints ? "" : undefined}
  {...rest}
  sx={[drawer.popup, className as Sx]}
>
  {#if context.showSwipeHandle}
    <DrawerSwipeHandle />
  {/if}
  <div data-slot="drawer-content" bind:this={context.content} sx={drawer.content}>
    {@render children?.()}
  </div>
</UisdkPart>
