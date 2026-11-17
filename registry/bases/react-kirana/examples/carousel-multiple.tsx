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

export default function CarouselMultiple() {
  return (
    <div sx={page.example}>
      <Carousel
        sx={styles.frameXs}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} sx={styles.thirdFromSm}>
              <div sx={styles.p1}>
                <Card>
                  <CardContent sx={styles.square}>
                    <span sx={styles.number3xl}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious sx={styles.fromSm} />
        <CarouselNext sx={styles.fromSm} />
      </Carousel>
    </div>
  )
}
