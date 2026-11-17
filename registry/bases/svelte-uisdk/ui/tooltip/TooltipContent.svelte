<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { TooltipContent, TooltipArrow } from "@ui-sdk/svelte/tooltip"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { sideOf } from "../../../../lib/svelte/uisdk-slot"
  import { tooltip } from "../../../../styles/tooltip.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"

  let {
    side = "top",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
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

<UisdkPart part={TooltipContent} slotName="tooltip-content" tag="div" side={sideOf(side)} sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...rest} sx={[tooltip.positioner, popupMotion, tooltip.content, className as Sx]}>
  {@render children?.()}
  <TooltipArrow sx={tooltip.arrow} />
</UisdkPart>
