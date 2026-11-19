<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { Side } from "@kirana-ui/svelte"
  import { HoverCard } from "@kirana-ui/svelte/hover-card"

  import { popupMotion } from "../../../../styles/overlay.styles"
  import { hoverCard } from "../../../../styles/hover-card.styles"

  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
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

<HoverCard.Portal>
  <HoverCard.Positioner {side} {sideOffset} {align} {alignOffset} sx={hoverCard.positioner}>
    <HoverCard.Popup data-slot="hover-card-content" {...rest} sx={[popupMotion, hoverCard.content, className as Sx]}>
      {@render children?.()}
    </HoverCard.Popup>
  </HoverCard.Positioner>
</HoverCard.Portal>
