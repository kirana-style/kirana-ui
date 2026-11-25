<script lang="ts">
  import { css } from "@kirana-style/core"
  import type { ClassValue, HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { marqueeCtx } from "../../../../core/context"
  import { marquee } from "../../../../styles/marquee.styles"
  import MarqueeContent from "./MarqueeContent.svelte"

  /**
   * Its children scrolling in a loop toward `direction`, one loop every `speed` (a CSS time), drawn
   * twice so the loop has no gap: the second copy is hidden from a screen reader and the keyboard.
   */
  let {
    direction = "left",
    speed = "40s",
    gap,
    pauseOnHover = false,
    reverse = false,
    fade = false,
    class: className,
    children,
    ...rest
  }: Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
    direction?: "left" | "right" | "up" | "down"
    /** One loop, as a CSS time. */
    speed?: string
    /** The space between items, as a CSS length. */
    gap?: string
    pauseOnHover?: boolean
    reverse?: boolean
    fade?: boolean
    class?: ClassValue | null
    children?: Snippet
  } = $props()

  const vertical = $derived(direction === "up" || direction === "down")
  const reversed = $derived(
    (direction === "right" || direction === "down") !== reverse
  )
  const run = $derived([
    vertical && marquee.contentVertical,
    reversed && marquee.reverse,
    pauseOnHover && marquee.pause,
  ])
  // The knobs, set on the root and read by both copies.
  const knobs = $derived(
    css({ [marqueeCtx.duration]: speed, [marqueeCtx.gap]: gap })
  )
</script>

<div
  data-slot="marquee"
  data-orientation={vertical ? "vertical" : "horizontal"}
  data-direction={direction}
  {...rest}
  class={className}
  sx={[
    marquee.root,
    vertical && marquee.vertical,
    fade && (vertical ? marquee.fadeY : marquee.fadeX),
    knobs,
  ]}
>
  <MarqueeContent sx={run}>
    {@render children?.()}
  </MarqueeContent>
  <MarqueeContent aria-hidden="true" inert sx={[run, marquee.duplicate]}>
    {@render children?.()}
  </MarqueeContent>
</div>
