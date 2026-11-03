<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import { Portal,
    TooltipArrow,
    TooltipArrowTip,
    TooltipContent,
    TooltipPositioner } from "@ark-ui/svelte"


  import { popupMotion } from "../../../../styles/overlay.styles"
  import { tooltip } from "../../../../styles/tooltip.styles"
  import { PLACEMENT } from "./placement"

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

  // Base UI's placement, which the root places the popup with.

  const placement = (getContext(PLACEMENT) ?? undefined)
  $effect(() => {
    if (placement) Object.assign(placement, { side, sideOffset, align, alignOffset })
  })
</script>

<Portal>
  <TooltipPositioner sx={tooltip.positioner}>
    <TooltipContent data-slot="tooltip-content" {...rest} sx={[popupMotion, tooltip.content, className as Sx]}>
      {@render children?.()}
      <TooltipArrow sx={tooltip.arrowArk}>
        <TooltipArrowTip sx={tooltip.arrowTipArk} />
      </TooltipArrow>
    </TooltipContent>
  </TooltipPositioner>
</Portal>
