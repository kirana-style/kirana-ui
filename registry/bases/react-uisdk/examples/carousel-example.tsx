import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
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
  spacing,
} from "../../../core/scales"
import { axes } from "../../../core/axes"

const styles = {
  lgGridCols1: css({
    gridTemplateColumns: { [breakpoint.lg]: "repeat(1, minmax(0, 1fr))" },
  }),
  frameXs: css({
    marginInline: "auto",
    maxWidth: { base: containerSize.xs, [breakpoint.sm]: containerSize.sm },
  }),
  cell: css({ padding: { base: space[1], [axes.style.luma]: spacing(2.5) } }),
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
  fromSm: css({ display: { base: "none", [breakpoint.sm]: "inline-flex" } }),
  thirdFromSm: css({
    flexBasis: { [breakpoint.sm]: "50%", [breakpoint.lg]: "calc(100% / 3)" },
  }),
  number3xl: css({
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
  }),
  tight: css({ marginLeft: `calc(${space[1]} * -1)` }),
  halfFromMd: css({
    paddingLeft: space[1],
    flexBasis: { [breakpoint.md]: "50%" },
  }),
  text2XlFontSemibold: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
  }),
}

export default function CarouselExample() {
  return (
    <ExampleWrapper sx={styles.lgGridCols1}>
      <CarouselBasic />
      <CarouselMultiple />
      <CarouselWithGap />
    </ExampleWrapper>
  )
}

function CarouselBasic() {
  return (
    <Example title="Basic">
      <Carousel sx={styles.frameXs}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div sx={styles.cell}>
                <Card>
                  <CardContent sx={styles.square}>
                    <span sx={styles.number4xl}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious sx={styles.fromSm} />
        <CarouselNext sx={styles.fromSm} />
      </Carousel>
    </Example>
  )
}

function CarouselMultiple() {
  return (
    <Example title="Multiple">
      <Carousel
        sx={styles.frameXs}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} sx={styles.thirdFromSm}>
              <div sx={styles.cell}>
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
    </Example>
  )
}

function CarouselWithGap() {
  return (
    <Example title="With Gap">
      <Carousel sx={styles.frameXs}>
        <CarouselContent sx={styles.tight}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} sx={styles.halfFromMd}>
              <div sx={styles.cell}>
                <Card>
                  <CardContent sx={styles.square}>
                    <span sx={styles.text2XlFontSemibold}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious sx={styles.fromSm} />
        <CarouselNext sx={styles.fromSm} />
      </Carousel>
    </Example>
  )
}
