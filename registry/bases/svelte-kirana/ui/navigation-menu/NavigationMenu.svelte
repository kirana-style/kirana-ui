<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenu } from "@kirana-ui/svelte/navigation-menu"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

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

<NavigationMenu.Root data-slot="navigation-menu" {...rest} sx={[navigationMenu.root, className as Sx]}>
  {@render children?.()}
  <!-- Base UI's portal, positioner, popup and viewport, which Kirana UI's menu has: the open
       item's content is drawn in the viewport. -->
  <NavigationMenu.Portal>
    <NavigationMenu.Positioner side="bottom" sideOffset={8} {align} alignOffset={0} sx={navigationMenu.positioner}>
      <NavigationMenu.Popup sx={navigationMenu.popup}>
        <NavigationMenu.Viewport sx={navigationMenu.viewport} />
      </NavigationMenu.Popup>
    </NavigationMenu.Positioner>
  </NavigationMenu.Portal>
</NavigationMenu.Root>
