<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { Side } from "@kirana-ui/svelte"
  import { Popover } from "@kirana-ui/svelte/popover"

  import { popupMotion } from "../../../../styles/overlay.styles"
  import { popover } from "../../../../styles/popover.styles"

  let {
    side = "bottom",
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

<Popover.Portal>
  <Popover.Positioner {side} {sideOffset} {align} {alignOffset} sx={popover.positioner}>
    <Popover.Popup data-slot="popover-content" {...rest} sx={[popupMotion, popover.content, className as Sx]}>
      {@render children?.()}
    </Popover.Popup>
  </Popover.Positioner>
</Popover.Portal>
