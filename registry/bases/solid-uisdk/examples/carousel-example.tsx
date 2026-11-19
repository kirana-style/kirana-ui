import { For } from "solid-js"
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

export default function CarouselExample() {
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

  return (
    <ExampleWrapper sx={styles.lgGridCols1}>
      <Example title="Basic">
        <Carousel sx={styles.frameXs}>
          <CarouselContent>
            <For each={Array.from({ length: 5 })}>
              {(_, index) => (
                <CarouselItem>
                  <div sx={styles.cell}>
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
          <CarouselPrevious sx={styles.fromSm} />
          <CarouselNext sx={styles.fromSm} />
        </Carousel>
      </Example>
      <Example title="Multiple">
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
                  <div sx={styles.cell}>
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
      </Example>
      <Example title="With Gap">
        <Carousel sx={styles.frameXs}>
          <CarouselContent sx={styles.tight}>
            <For each={Array.from({ length: 5 })}>
              {(_, index) => (
                <CarouselItem sx={styles.halfFromMd}>
                  <div sx={styles.cell}>
                    <Card>
                      <CardContent sx={styles.square}>
                        <span sx={styles.text2XlFontSemibold}>
                          {index() + 1}
                        </span>
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
      </Example>
    </ExampleWrapper>
  )
}
