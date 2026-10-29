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
  frame12Md: css({
    width: "100%",
    maxWidth: {
      base: "12rem",
      [breakpoint.sm]: containerSize.xs,
      [breakpoint.md]: containerSize.sm,
    },
  }),
  tight: css({ marginLeft: `calc(${space[1]} * -1)` }),
  halfThirdTight: css({
    flexBasis: { base: "50%", [breakpoint.lg]: "calc(100% / 3)" },
    paddingLeft: space[1],
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
  text2XlFontSemibold: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
  }),
}

export default function CarouselSpacing() {
  return (
    <div sx={page.example}>
      <Carousel sx={styles.frame12Md}>
        <CarouselContent sx={styles.tight}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} sx={styles.halfThirdTight}>
              <div sx={styles.p1}>
                <Card>
                  <CardContent sx={styles.square}>
                    <span sx={styles.text2XlFontSemibold}>{index + 1}</span>
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
