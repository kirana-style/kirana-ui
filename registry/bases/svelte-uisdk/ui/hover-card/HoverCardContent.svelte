<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { HoverCardContent } from "@ui-sdk/svelte/hover-card"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { sideOf } from "../../../../lib/svelte/uisdk-slot"
  import { hoverCard } from "../../../../styles/hover-card.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"

  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 4,
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

<UisdkPart part={HoverCardContent} slotName="hover-card-content" tag="div" side={sideOf(side)} sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...rest} sx={[hoverCard.positioner, popupMotion, hoverCard.content, className as Sx]}>
  {@render children?.()}
</UisdkPart>
