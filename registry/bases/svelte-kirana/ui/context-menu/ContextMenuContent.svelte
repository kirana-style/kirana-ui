<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { Side } from "@kirana-ui/svelte"
  import { ContextMenu } from "@kirana-ui/svelte/context-menu"

  import { contextMenu } from "../../../../styles/context-menu.styles"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"

  let {
    side = "right",
    sideOffset = 0,
    align = "start",
    alignOffset = 4,
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

<ContextMenu.Portal>
  <ContextMenu.Positioner {side} {sideOffset} {align} {alignOffset} sx={menuPositioner}>
    <ContextMenu.Popup data-slot="context-menu-content" {...rest} sx={[popupMotion, menuSurface, contextMenu.content, className as Sx]}>
      {@render children?.()}
    </ContextMenu.Popup>
  </ContextMenu.Positioner>
</ContextMenu.Portal>
