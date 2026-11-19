import { For } from "solid-js"
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
import { page } from "../../../styles/page.styles"

export default function CarouselMultiple() {
  const styles = {
    frameXs: css({
      marginInline: "auto",
      maxWidth: { base: containerSize.xs, [breakpoint.sm]: containerSize.sm },
    }),
    thirdFromSm: css({
      flexBasis: { [breakpoint.sm]: "50%", [breakpoint.lg]: "calc(100% / 3)" },
    }),
    p1: css({ padding: space[1] }),
    square: css({
      display: "flex",
      aspectRatio: "1 / 1",
      alignItems: "center",
      justifyContent: "center",
      paddingInline: space[6],
      paddingBlock: space[6],
    }),
    number3xl: css({
      fontSize: fontSize["3xl"],
      lineHeight: lineHeight["3xl"],
      fontWeight: fontWeight.semibold,
    }),
    fromSm: css({ display: { base: "none", [breakpoint.sm]: "inline-flex" } }),
  }

  return (
    <div sx={page.example}>
      <Carousel
        sx={styles.frameXs}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          <For each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem sx={styles.thirdFromSm}>
                <div sx={styles.p1}>
                  <Card>
                    <CardContent sx={styles.square}>
                      <span sx={styles.number3xl}>{index() + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <CarouselPrevious sx={styles.fromSm} />
        <CarouselNext sx={styles.fromSm} />
      </Carousel>
    </div>
  )
}
