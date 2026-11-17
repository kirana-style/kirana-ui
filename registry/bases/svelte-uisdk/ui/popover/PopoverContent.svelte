<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { PopoverContent } from "@ui-sdk/svelte/popover"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { sideOf } from "../../../../lib/svelte/uisdk-slot"
  import { popover } from "../../../../styles/popover.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"

  let {
    side = "bottom",
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

<UisdkPart part={PopoverContent} slotName="popover-content" tag="div" side={sideOf(side)} sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...rest} sx={[popover.positioner, popupMotion, popover.content, className as Sx]}>
  {@render children?.()}
</UisdkPart>
