import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
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
import { Example, ExampleWrapper } from "../components/example"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

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

@Component({
  selector: "carousel-example",
  imports: [
    Card,
    CardContent,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Example,
    ExampleWrapper,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper [sx]="styles.lgGridCols1">
      <!-- CarouselBasic -->
      <div kuiExample title="Basic">
        <div kuiCarousel [sx]="styles.frameXs">
          <div kuiCarouselContent>
            @for (
              _ of Array.from({ length: 5 });
              track index;
              let index = $index
            ) {
              <div kuiCarouselItem>
                <div [sx]="styles.cell">
                  <div kuiCard>
                    <div kuiCardContent [sx]="styles.square">
                      <span [sx]="styles.number4xl">{{ index + 1 }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <button kuiCarouselPrevious [sx]="styles.fromSm"></button>
          <button kuiCarouselNext [sx]="styles.fromSm"></button>
        </div>
      </div>
      <!-- CarouselMultiple -->
      <div kuiExample title="Multiple">
        <div
          kuiCarousel
          [sx]="styles.frameXs"
          [opts]="{
            align: 'start',
          }"
        >
          <div kuiCarouselContent>
            @for (
              _ of Array.from({ length: 5 });
              track index;
              let index = $index
            ) {
              <div kuiCarouselItem [sx]="styles.thirdFromSm">
                <div [sx]="styles.cell">
                  <div kuiCard>
                    <div kuiCardContent [sx]="styles.square">
                      <span [sx]="styles.number3xl">{{ index + 1 }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <button kuiCarouselPrevious [sx]="styles.fromSm"></button>
          <button kuiCarouselNext [sx]="styles.fromSm"></button>
        </div>
      </div>
      <!-- CarouselWithGap -->
      <div kuiExample title="With Gap">
        <div kuiCarousel [sx]="styles.frameXs">
          <div kuiCarouselContent [sx]="styles.tight">
            @for (
              _ of Array.from({ length: 5 });
              track index;
              let index = $index
            ) {
              <div kuiCarouselItem [sx]="styles.halfFromMd">
                <div [sx]="styles.cell">
                  <div kuiCard>
                    <div kuiCardContent [sx]="styles.square">
                      <span [sx]="styles.text2XlFontSemibold">{{
                        index + 1
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <button kuiCarouselPrevious [sx]="styles.fromSm"></button>
          <button kuiCarouselNext [sx]="styles.fromSm"></button>
        </div>
      </div>
    </div>
  `,
})
export default class CarouselExample {
  protected readonly styles = styles
  protected readonly Array = Array
}
