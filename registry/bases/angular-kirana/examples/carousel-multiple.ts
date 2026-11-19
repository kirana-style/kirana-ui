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
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

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

@Component({
  selector: "carousel-multiple",
  imports: [
    Card,
    CardContent,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
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
              <div [sx]="styles.p1">
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
  `,
})
export default class CarouselMultiple {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly Array = Array
}
