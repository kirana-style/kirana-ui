import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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
import { DirectionProvider } from "../ui/direction"

const styles = {
  carousel: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: "12rem", [breakpoint.sm]: containerSize.xs },
  }),
  div: css({
    padding: space[1],
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    aspectRatio: { "*": null, base: "1 / 1" },
    alignItems: { "*": null, base: "center" },
    justifyContent: { "*": null, base: "center" },
    padding: { "*": null, base: space[6] },
  }),
  span: css({
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.semibold,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("")
}

@Component({
  selector: "carousel-rtl",
  imports: [
    Card,
    CardContent,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    DirectionProvider,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiCarousel
          [attr.dir]="dir()"
          [sx]="styles.carousel"
          [opts]="{
            direction: dir(),
          }"
        >
          <div kuiCarouselContent>
            @for (
              _ of Array.from({ length: 5 });
              track index;
              let index = $index
            ) {
              <div kuiCarouselItem>
                <div [sx]="styles.div">
                  <div kuiCard>
                    <div kuiCardContent [sx]="styles.cardContent">
                      <span [sx]="styles.span">{{
                        formatNumber(index + 1)
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
    </ng-container>
  `,
})
export default class CarouselRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly formatNumber = (num: number): string => {
    if (this.language() === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  protected readonly styles = styles
  protected readonly page = page
  protected readonly Array = Array
}
