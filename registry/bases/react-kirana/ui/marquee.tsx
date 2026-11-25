import type * as React from "react"

import { css } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { marqueeCtx } from "../../../core/context"
import { marquee } from "../../../styles/marquee.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

type MarqueeDirection = "left" | "right" | "up" | "down"

/** One run of the items. The marquee draws it twice; a caller rarely writes it. */
function MarqueeContent({ sx, ...props }: El) {
  return (
    <div data-slot="marquee-content" {...props} sx={[marquee.content, sx]} />
  )
}

/** One item in the run. */
function MarqueeItem({ sx, ...props }: El) {
  return <div data-slot="marquee-item" {...props} sx={[marquee.item, sx]} />
}

/**
 * Its `children` scrolling in a loop toward `direction`, one loop every `speed` (a CSS time), drawn
 * twice so the loop has no gap: the second copy is hidden from a screen reader and the keyboard.
 */
function Marquee({
  sx,
  direction = "left",
  speed = "40s",
  gap,
  pauseOnHover = false,
  reverse = false,
  fade = false,
  children,
  ...props
}: El & {
  direction?: MarqueeDirection
  /** One loop, as a CSS time. */
  speed?: string
  /** The space between items, as a CSS length. */
  gap?: string
  pauseOnHover?: boolean
  reverse?: boolean
  fade?: boolean
}) {
  const vertical = direction === "up" || direction === "down"
  const reversed = (direction === "right" || direction === "down") !== reverse
  const run = [
    vertical && marquee.contentVertical,
    reversed && marquee.reverse,
    pauseOnHover && marquee.pause,
  ]

  return (
    <div
      data-slot="marquee"
      data-orientation={vertical ? "vertical" : "horizontal"}
      data-direction={direction}
      {...props}
      sx={[
        marquee.root,
        vertical && marquee.vertical,
        fade && (vertical ? marquee.fadeY : marquee.fadeX),
        css({ [marqueeCtx.duration]: speed, [marqueeCtx.gap]: gap }),
        sx,
      ]}
    >
      <MarqueeContent sx={run}>{children}</MarqueeContent>
      <MarqueeContent aria-hidden inert sx={[run, marquee.duplicate]}>
        {children}
      </MarqueeContent>
    </div>
  )
}

export { Marquee, MarqueeContent, MarqueeItem }
export type { MarqueeDirection }
