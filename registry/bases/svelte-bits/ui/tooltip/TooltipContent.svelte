<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tooltip } from "bits-ui"

  import { physicalSide } from "../../../../lib/placement"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { tooltip } from "../../../../styles/tooltip.styles"
  import { useDirection } from "../direction/context"

  /** The arrow's size, which Bits adds to the gap and Base UI measures without. */
  const ARROW = 10

  let {
    side = "top",
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

<Tooltip.Portal>
  <Tooltip.Content
    data-slot="tooltip-content"
    side={physicalSide(side, dir === "rtl")}
    sideOffset={sideOffset - ARROW}
    {align}
    {alignOffset}
    {dir}
    {...rest}
    sx={[popupMotion, tooltip.content, className as Sx]}
  >
    {@render children?.()}
    <!-- Base UI's arrow, a square on its corner: Bits turns the box around it to face the trigger. -->
    <Tooltip.Arrow width={ARROW} height={ARROW}>
      {#snippet child({ props })}
        <span {...props}><div sx={tooltip.arrow}></div></span>
      {/snippet}
    </Tooltip.Arrow>
  </Tooltip.Content>
</Tooltip.Portal>
