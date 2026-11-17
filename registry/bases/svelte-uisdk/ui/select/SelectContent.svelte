<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { SelectContent } from "@ui-sdk/svelte/select"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { sideOf } from "../../../../lib/svelte/uisdk-slot"
  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { select } from "../../../../styles/select.styles"

  /**
   * The list. ui-sdk's content places itself (no positioner: its styles join the content's), and has
   * no Base UI `alignItemWithTrigger`, which opens the list with its chosen item over the trigger:
   * it opens beside the trigger, with the popup's motion (`data-align-trigger="false"`).
   */
  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    alignItemWithTrigger,
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
    alignItemWithTrigger?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={SelectContent} slotName="select-content" tag="div" data-align-trigger={false} side={sideOf(side)} sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...rest} sx={[menuPositioner, popupMotion, menuSurface, select.content, className as Sx]}>
  {@render children?.()}
</UisdkPart>
