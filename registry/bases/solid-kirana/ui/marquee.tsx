import { merge, omit } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { marqueeCtx } from "../../../core/context"
import { marquee } from "../../../styles/marquee.styles"

type MarqueeDirection = "left" | "right" | "up" | "down"

type El = Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
  class?: string
  sx?: Sx
  children?: JSX.Element
}

/** One run of the items. The marquee draws it twice; a caller rarely writes it. */
function MarqueeContent(props: El) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="marquee-content"
      {...rest}
      {...styleProps(props.class, marquee.content, props.sx)}
    >
      {props.children}
    </div>
  )
}

/** One item in the run. */
function MarqueeItem(props: El) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="marquee-item"
      {...rest}
      {...styleProps(props.class, marquee.item, props.sx)}
    >
      {props.children}
    </div>
  )
}

/**
 * Its `children` scrolling in a loop toward `direction`, one loop every `speed` (a CSS time), drawn
 * twice so the loop has no gap: the second copy is hidden from a screen reader and the keyboard.
 */
function Marquee(
  props: El & {
    direction?: MarqueeDirection
    /** One loop, as a CSS time. */
    speed?: string
    /** The space between items, as a CSS length. */
    gap?: string
    pauseOnHover?: boolean
    reverse?: boolean
    fade?: boolean
  }
) {
  const local = merge(
    {
      direction: "left",
      speed: "40s",
      pauseOnHover: false,
      reverse: false,
      fade: false,
    } as const,
    props
  )
  const rest = omit(
    local,
    "direction",
    "speed",
    "gap",
    "pauseOnHover",
    "reverse",
    "fade",
    "class",
    "sx",
    "children"
  )
  const vertical = () => local.direction === "up" || local.direction === "down"
  const reversed = () =>
    (local.direction === "right" || local.direction === "down") !==
    local.reverse
  const run = () => [
    vertical() && marquee.contentVertical,
    reversed() && marquee.reverse,
    local.pauseOnHover && marquee.pause,
  ]
  // The knobs, set on the root and read by both copies.
  const knobs = () =>
    css({ [marqueeCtx.duration]: local.speed, [marqueeCtx.gap]: local.gap })

  return (
    <div
      data-slot="marquee"
      data-orientation={vertical() ? "vertical" : "horizontal"}
      data-direction={local.direction}
      {...rest}
      {...styleProps(
        local.class,
        marquee.root,
        vertical() && marquee.vertical,
        local.fade && (vertical() ? marquee.fadeY : marquee.fadeX),
        knobs(),
        local.sx
      )}
    >
      <MarqueeContent sx={run()}>{local.children}</MarqueeContent>
      <MarqueeContent aria-hidden="true" inert sx={[run(), marquee.duplicate]}>
        {local.children}
      </MarqueeContent>
    </div>
  )
}

export { Marquee, MarqueeContent, MarqueeItem }
export type { MarqueeDirection }
