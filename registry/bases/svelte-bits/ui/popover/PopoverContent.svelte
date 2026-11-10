<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Popover } from "bits-ui"

  import { physicalSide } from "../../../../lib/placement"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { popover } from "../../../../styles/popover.styles"
  import { useDirection } from "../direction/context"

  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    class: className,
    children,
    ...rest
  }: {
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Base UI's placement, passed to Bits' content, whose sides are physical.
  const direction = useDirection()
  const dir = $derived(direction().dir)
</script>

<Popover.Portal>
  <Popover.Content
    data-slot="popover-content"
    side={physicalSide(side, dir === "rtl")}
    {sideOffset}
    {align}
    {alignOffset}
    {dir}
    {...rest}
    sx={[popupMotion, popover.content, className as Sx]}
  >
    {@render children?.()}
  </Popover.Content>
</Popover.Portal>
