import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import type { CarouselApi } from "../ui/carousel"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
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
  narrow: css({
    marginInline: "auto",
    maxWidth: { base: "10rem", [breakpoint.sm]: containerSize.xs },
  }),
  narrow2: css({ width: "100%", maxWidth: containerSize.xs }),
  mPx: css({ margin: "1px" }),
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
  py2TextCenterTextSmTextM: css({
    paddingBlock: { "*": null, base: space[2] },
    textAlign: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "carousel-api",
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
      <div [sx]="styles.narrow">
        <div kuiCarousel (setApi)="setApi($event)" [sx]="styles.narrow2">
          <div kuiCarouselContent>
            @for (
              _ of Array.from({ length: 5 });
              track index;
              let index = $index
            ) {
              <div kuiCarouselItem>
                <div kuiCard [sx]="styles.mPx">
                  <div kuiCardContent [sx]="styles.square">
                    <span [sx]="styles.number4xl">{{ index + 1 }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
          <button kuiCarouselPrevious></button>
          <button kuiCarouselNext></button>
        </div>
        <div [sx]="styles.py2TextCenterTextSmTextM">
          Slide
          {{ current() }}
          of
          {{ count() }}
        </div>
      </div>
    </div>
  `,
})
export default class CarouselApiExample {
  protected readonly styles = styles
  // The selected slide and the count, read from Embla whenever it selects one.
  protected readonly current = signal(0)
  protected readonly count = signal(0)

  protected setApi(api: CarouselApi) {
    const read = () => {
      this.current.set(api.selectedScrollSnap() + 1)
      this.count.set(api.scrollSnapList().length)
    }
    read()
    api.on("reInit", read).on("select", read)
  }
  protected readonly page = page
  protected readonly Array = Array
}
