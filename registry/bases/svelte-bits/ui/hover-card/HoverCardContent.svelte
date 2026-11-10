<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { LinkPreview } from "bits-ui"

  import { physicalSide } from "../../../../lib/placement"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { hoverCard } from "../../../../styles/hover-card.styles"
  import { useDirection } from "../direction/context"

  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 4,
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

<LinkPreview.Portal>
  <LinkPreview.Content
    data-slot="hover-card-content"
    side={physicalSide(side, dir === "rtl")}
    {sideOffset}
    {align}
    {alignOffset}
    {dir}
    {...rest}
    sx={[popupMotion, hoverCard.content, className as Sx]}
  >
    {@render children?.()}
  </LinkPreview.Content>
</LinkPreview.Portal>
