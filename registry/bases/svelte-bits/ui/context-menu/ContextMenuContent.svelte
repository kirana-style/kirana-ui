<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  import { physicalSide } from "../../../../lib/placement"
  import { contextMenu } from "../../../../styles/context-menu.styles"
  import { menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { useDirection } from "../direction/context"

  let {
    side = "right",
    sideOffset = 0,
    align = "start",
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

  // Base UI's placement against the pointer, passed to Bits' content, whose sides are physical.
  const direction = useDirection()
  const dir = $derived(direction().dir)
</script>

<ContextMenu.Portal>
  <ContextMenu.Content
    data-slot="context-menu-content"
    side={physicalSide(side, dir === "rtl")}
    {sideOffset}
    {align}
    {alignOffset}
    {dir}
    {...rest}
    sx={[popupMotion, menuSurface, contextMenu.content, className as Sx]}
  >
    {@render children?.()}
  </ContextMenu.Content>
</ContextMenu.Portal>
