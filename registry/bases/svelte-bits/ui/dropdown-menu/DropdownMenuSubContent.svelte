<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DropdownMenu } from "bits-ui"

  import { physicalSide } from "../../../../lib/placement"
  import { dropdownMenu } from "../../../../styles/dropdown-menu.styles"
  import { menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { useDirection } from "../direction/context"

  let {
    side = "inline-end",
    sideOffset = 0,
    align = "start",
    alignOffset = -3,
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

<DropdownMenu.Portal>
  <DropdownMenu.SubContent
    data-slot="dropdown-menu-sub-content"
    side={physicalSide(side, dir === "rtl")}
    {sideOffset}
    {align}
    {alignOffset}
    {dir}
    {...rest}
    sx={[popupMotion, menuSurface, dropdownMenu.subContent, className as Sx]}
  >
    {@render children?.()}
  </DropdownMenu.SubContent>
</DropdownMenu.Portal>
