<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import { Portal,PopoverContent,PopoverPositioner } from "@ark-ui/svelte"


  import { popupMotion } from "../../../../styles/overlay.styles"
  import { popover } from "../../../../styles/popover.styles"
  import { PLACEMENT } from "./placement"

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

  // Base UI's placement, which the root places the popup with.

  const placement = (getContext(PLACEMENT) ?? undefined)
  $effect(() => {
    if (placement) Object.assign(placement, { side, sideOffset, align, alignOffset })
  })
</script>

<Portal>
  <PopoverPositioner sx={popover.positioner}>
    <PopoverContent data-slot="popover-content" {...rest} sx={[popupMotion, popover.content, className as Sx]}>
      {@render children?.()}
    </PopoverContent>
  </PopoverPositioner>
</Portal>
