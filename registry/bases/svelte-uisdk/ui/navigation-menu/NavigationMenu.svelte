<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import {
    NavigationMenu,
    NavigationMenuViewport,
  } from "@ui-sdk/svelte/navigation-menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { popupContainer } from "../../../../lib/svelte/uisdk-slot"
  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  /**
   * ui-sdk's navigation menu. Its viewport, where the open panel shows, is Base UI's positioner, popup
   * and viewport in one element, which places itself: their styles on it, then its own sizes
   * (`viewportUisdk`).
   */
  let {
    align = "start",
    class: className,
    children,
    ...rest
  }: {
    align?: "start" | "center" | "end"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={NavigationMenu} slotName="navigation-menu" tag="nav" container={popupContainer()} {...rest} sx={[navigationMenu.root, className as Sx]}>
  {@render children?.()}
  <NavigationMenuViewport side="bottom" sideOffset={8} align={align} alignOffset={0} sx={[
      navigationMenu.positioner,
      navigationMenu.popup,
      navigationMenu.viewport,
      navigationMenu.viewportUisdk,
    ]} />
</UisdkPart>
