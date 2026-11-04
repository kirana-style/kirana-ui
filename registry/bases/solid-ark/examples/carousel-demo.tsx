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

export default function CarouselDemo() {
  const styles = {
    frame12: css({
      width: "100%",
      maxWidth: { base: "12rem", [breakpoint.sm]: containerSize.xs },
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
    number4xl: css({
      fontSize: fontSize["4xl"],
      lineHeight: lineHeight["4xl"],
      fontWeight: fontWeight.semibold,
    }),
  }

  return (
    <div sx={page.example}>
      <Carousel sx={styles.frame12}>
        <CarouselContent>
          <For each={Array.from({ length: 5 })}>
            {(_, index) => (
              <CarouselItem>
                <div sx={styles.p1}>
                  <Card>
                    <CardContent sx={styles.square}>
                      <span sx={styles.number4xl}>{index() + 1}</span>
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
