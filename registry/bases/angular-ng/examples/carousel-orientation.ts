import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
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
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
  tall: css({ marginTop: `calc(${space[1]} * -1)`, height: "270px" }),
  half: css({ flexBasis: "50%", paddingTop: space[1] }),
  p1: css({ padding: space[1] }),
  flexItemsCenterJustifyCe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // `p-6`, inline sides logical: CardContent sets `padding-inline`, which a physical side would
    // not replace.
    paddingInline: space[6],
    paddingTop: space[6],
    paddingBottom: space[6],
  }),
  number3xl: css({
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
  }),
}

@Component({
  selector: "carousel-orientation",
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
        [opts]="{
          align: 'start',
        }"
        orientation="vertical"
        [sx]="styles.narrow"
      >
        <div kuiCarouselContent [sx]="styles.tall">
          @for (
            _ of Array.from({ length: 5 });
            track index;
            let index = $index
          ) {
            <div kuiCarouselItem [sx]="styles.half">
              <div [sx]="styles.p1">
                <div kuiCard>
                  <div kuiCardContent [sx]="styles.flexItemsCenterJustifyCe">
                    <span [sx]="styles.number3xl">{{ index + 1 }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <button kuiCarouselPrevious></button>
        <button kuiCarouselNext></button>
      </div>
    </div>
  `,
})
export default class CarouselOrientation {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly Array = Array
}
