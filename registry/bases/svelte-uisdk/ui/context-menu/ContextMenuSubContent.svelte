<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { MenuSubContent } from "@ui-sdk/svelte/menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { sideOf } from "../../../../lib/svelte/uisdk-slot"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { contextMenu } from "../../../../styles/context-menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"

  let {
    side = "right",
    sideOffset,
    align,
    alignOffset,
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
</script>

<UisdkPart part={MenuSubContent} slotName="context-menu-sub-content" tag="div" side={sideOf(side)} sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...rest} sx={[
    menuPositioner,
    popupMotion,
    menuSurface,
    contextMenu.content,
    contextMenu.subContent,
    className as Sx,
  ]}>
  {@render children?.()}
</UisdkPart>
