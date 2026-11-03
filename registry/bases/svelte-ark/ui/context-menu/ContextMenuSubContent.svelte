<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import { Portal,MenuContent,MenuPositioner } from "@ark-ui/svelte"


  import { contextMenu } from "../../../../styles/context-menu.styles"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { PLACEMENT } from "./placement"

  let {
    side = "inline-end",
    sideOffset = 0,
    align = "start",
    alignOffset = -3,
    class: className,
    children,
    ...rest
  }: {
    // Declared here, not imported: Vue resolves an imported props type through TypeScript's
    // JavaScript API, which TypeScript 7 does not have.
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Base UI's placement, which the root places the popup with.

  const placement = (getContext(PLACEMENT) ?? undefined)
  $effect(() => {
    if (placement) Object.assign(placement, { side, sideOffset, align, alignOffset })
  })
</script>

<Portal>
  <MenuPositioner sx={menuPositioner}>
    <MenuContent data-slot="context-menu-sub-content" {...rest} sx={[popupMotion, menuSurface, contextMenu.content, contextMenu.subContent, className as Sx]}>
      {@render children?.()}
    </MenuContent>
  </MenuPositioner>
</Portal>
