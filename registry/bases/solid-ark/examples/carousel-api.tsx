import { For, createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
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
import type { CarouselApi } from "../ui/carousel"

export default function CarouselApiExample() {
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

  // The selected slide and the count, read from Embla whenever it selects one.
  const [current, setCurrent] = createSignal(0)
  const [count, setCount] = createSignal(0)
  function setApi(api: CarouselApi) {
    const read = () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setCount(api.scrollSnapList().length)
    }
    read()
    api.on("reInit", read).on("select", read)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.narrow}>
        <Carousel setApi={setApi} sx={styles.narrow2}>
          <CarouselContent>
            <For each={Array.from({ length: 5 })}>
              {(_, index) => (
                <CarouselItem>
                  <Card sx={styles.mPx}>
                    <CardContent sx={styles.square}>
                      <span sx={styles.number4xl}>{index() + 1}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
            </For>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div sx={styles.py2TextCenterTextSmTextM}>
          Slide {current()} of {count()}
        </div>
      </div>
    </div>
  )
}
