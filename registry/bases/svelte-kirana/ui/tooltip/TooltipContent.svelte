<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { Side } from "@kirana-ui/svelte"
  import { Tooltip } from "@kirana-ui/svelte/tooltip"

  import { popupMotion } from "../../../../styles/overlay.styles"
  import { tooltip } from "../../../../styles/tooltip.styles"

  let {
    side = "top",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
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

<Tooltip.Portal>
  <Tooltip.Positioner {side} {sideOffset} {align} {alignOffset} sx={tooltip.positioner}>
    <Tooltip.Popup data-slot="tooltip-content" {...rest} sx={[popupMotion, tooltip.content, className as Sx]}>
      {@render children?.()}
      <Tooltip.Arrow sx={tooltip.arrow} />
    </Tooltip.Popup>
  </Tooltip.Positioner>
</Tooltip.Portal>
