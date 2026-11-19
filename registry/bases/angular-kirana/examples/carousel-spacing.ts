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

@Component({
  selector: "carousel-spacing",
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
      <div kuiCarousel [sx]="styles.frame12Md">
        <div kuiCarouselContent [sx]="styles.tight">
          @for (
            _ of Array.from({ length: 5 });
            track index;
            let index = $index
          ) {
            <div kuiCarouselItem [sx]="styles.halfThirdTight">
              <div [sx]="styles.p1">
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
        <button kuiCarouselPrevious></button>
        <button kuiCarouselNext></button>
      </div>
    </div>
  `,
})
export default class CarouselSpacing {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly Array = Array
}
