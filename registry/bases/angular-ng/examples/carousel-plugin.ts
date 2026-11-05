import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import Autoplay from "embla-carousel-autoplay"
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
  frame10: css({
    width: "100%",
    maxWidth: { base: "10rem", [breakpoint.sm]: containerSize.xs },
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

// One Autoplay for the carousel's life, created once.
const plugin = Autoplay({ delay: 2000, stopOnInteraction: true })

@Component({
  selector: "carousel-plugin",
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
        [plugins]="[plugin]"
        [sx]="styles.frame10"
        (mouseenter)="plugin.stop()"
        (mouseleave)="plugin.reset()"
      >
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
export default class CarouselPlugin {
  protected readonly styles = styles
  protected readonly plugin = plugin
  protected readonly page = page
  protected readonly Array = Array
}
