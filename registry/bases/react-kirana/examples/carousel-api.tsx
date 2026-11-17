import { css } from "@kirana-style/core"

import * as React from "react"

import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import type { CarouselApi } from "../ui/carousel"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({
    marginInline: "auto",
    maxWidth: { base: "10rem", [breakpoint.sm]: containerSize.xs },
  }),
  narrow2: css({ width: "100%", maxWidth: containerSize.xs }),
  mPx: css({ margin: "1px" }),
  square: css({
    display: "flex",
    aspectRatio: "1 / 1",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: space[6],
    paddingBlock: space[6],
  }),
  number4xl: css({
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.semibold,
  }),
  py2TextCenterTextSmTextM: css({
    paddingBlock: { "*": null, base: space[2] },
    textAlign: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

export default function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  // The selected slide and the count, read from Embla whenever it selects one.
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (!api) return () => {}
      api.on("select", onChange)
      api.on("reInit", onChange)
      return () => {
        api.off("select", onChange)
        api.off("reInit", onChange)
      }
    },
    [api]
  )
  const current = React.useSyncExternalStore(
    subscribe,
    () => (api ? api.selectedScrollSnap() + 1 : 0),
    () => 0
  )
  const count = React.useSyncExternalStore(
    subscribe,
    () => api?.scrollSnapList().length ?? 0,
    () => 0
  )

  return (
    <div sx={page.example}>
      <div sx={styles.narrow}>
        <Carousel setApi={setApi} sx={styles.narrow2}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card sx={styles.mPx}>
                  <CardContent sx={styles.square}>
                    <span sx={styles.number4xl}>{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div sx={styles.py2TextCenterTextSmTextM}>
          Slide {current} of {count}
        </div>
      </div>
    </div>
  )
}
