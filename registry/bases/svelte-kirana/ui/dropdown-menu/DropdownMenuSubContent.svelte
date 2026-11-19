<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { Side } from "@kirana-ui/svelte"
  import { Menu } from "@kirana-ui/svelte/menu"

  import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"

  let {
    side = "inline-end",
    sideOffset = 0,
    align = "start",
    alignOffset = -3,
    class: className,
    children,
    ...rest
  }: {
    side?: Side
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Menu.Portal>
  <Menu.Positioner {side} {sideOffset} {align} {alignOffset} sx={menuPositioner}>
    <Menu.Popup data-slot="dropdown-menu-sub-content" {...rest} sx={[popupMotion, menuSurface, dropdownMenu.content, dropdownMenu.subContent, className as Sx]}>
      {@render children?.()}
    </Menu.Popup>
  </Menu.Positioner>
</Menu.Portal>
