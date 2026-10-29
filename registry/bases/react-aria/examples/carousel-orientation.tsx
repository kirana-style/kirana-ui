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
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  tall: css({ marginTop: `calc(${space[1]} * -1)`, height: "270px" }),
  half: css({ flexBasis: "50%", paddingTop: space[1] }),
  p1: css({ padding: space[1] }),
  flexItemsCenterJustifyCe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: space[6],
  }),
  number3xl: css({
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
  }),
}

export default function CarouselOrientation() {
  return (
    <div sx={page.example}>
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        sx={styles.narrow}
      >
        <CarouselContent sx={styles.tall}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} sx={styles.half}>
              <div sx={styles.p1}>
                <Card>
                  <CardContent sx={styles.flexItemsCenterJustifyCe}>
                    <span sx={styles.number3xl}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
