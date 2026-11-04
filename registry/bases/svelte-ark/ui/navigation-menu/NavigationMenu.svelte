<script lang="ts">
  import { setContext } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  /**
   * Ark UI's navigation menu, drawn as Base UI's: the bar, and below it a positioner holding the
   * popup and its viewport, which the open item's content is shown in (each content teleports
   * there, as Base UI's moves into its viewport). Zag measures the panel and the open trigger's
   * offset (`--viewport-*`), which the popup reads (`navigationMenu.popupArk`). Ark's package
   * root does not export the navigation menu (LF-010), so every part imports its subpath, the
   * same one.
   */
  import {
    NavigationMenuRoot,
    NavigationMenuViewport,
    NavigationMenuViewportPositioner,
  } from "@ark-ui/svelte/navigation-menu"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"
  import { VIEWPORT } from "./context"
  import type { ViewportContext } from "./context"

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

  let viewport = $state<HTMLElement>()
  setContext<ViewportContext>(VIEWPORT, {
    get element() {
      return viewport
    },
  })
</script>

<!-- Closed panels unmount, as Base UI's do. -->
<NavigationMenuRoot lazyMount unmountOnExit {...rest}>
  {#snippet asChild(props)}
    <nav {...props()} class={props().class} style={props().style} data-slot="navigation-menu" sx={[navigationMenu.root, className as Sx]}>
      {@render children?.()}
      <NavigationMenuViewportPositioner align={align}>
        {#snippet asChild(props)}
          <div {...props()} class={props().class} style={props().style} sx={[navigationMenu.positioner, navigationMenu.positionerArk]}>
            <!-- The viewport takes its alignment from the positioner; an `align` here would land on the
               div as HTML's presentational attribute, a `text-align`. -->
            <NavigationMenuViewport>
              {#snippet asChild(props)}
                <div {...props()} class={props().class} style={props().style} sx={[navigationMenu.popup, navigationMenu.popupArk]}>
                  <div bind:this={viewport} sx={navigationMenu.viewport}></div>
                </div>
              {/snippet}
            </NavigationMenuViewport>
          </div>
        {/snippet}
      </NavigationMenuViewportPositioner>
    </nav>
  {/snippet}
</NavigationMenuRoot>
