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

export default function CarouselSize() {
  const styles = {
    frame12Md: css({
      width: "100%",
      maxWidth: {
        base: "12rem",
        [breakpoint.sm]: containerSize.xs,
        [breakpoint.md]: containerSize.sm,
      },
    }),
    halfThird: css({
      flexBasis: { base: "50%", [breakpoint.lg]: "calc(100% / 3)" },
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
  }

  return (
    <div sx={page.example}>
      <Carousel
        opts={{
          align: "start",
        }}
        sx={styles.frame12Md}
      >
        <CarouselContent>
          <For each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem sx={styles.halfThird}>
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
