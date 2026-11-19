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

@Component({
  selector: "carousel-demo",
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
      <div kuiCarousel [sx]="styles.frame12">
        <div kuiCarouselContent>
          @for (
            _ of Array.from({ length: 5 });
            track index;
            let index = $index
          ) {
            <div kuiCarouselItem>
              <div [sx]="styles.p1">
                <div kuiCard>
                  <div kuiCardContent [sx]="styles.square">
                    <span [sx]="styles.number4xl">{{ index + 1 }}</span>
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
export default class CarouselDemo {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly Array = Array
}
