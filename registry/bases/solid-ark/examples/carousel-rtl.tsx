import { For } from "solid-js"
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
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
import type { Translations } from "../components/language-selector"

export default function CarouselRtl() {
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

  const translation = useTranslation(translations, "ar")

  const formatNumber = (num: number): string => {
    if (translation.language === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Carousel
          dir={translation.dir}
          sx={styles.carousel}
          opts={{
            direction: translation.dir,
          }}
        >
          <CarouselContent>
            <For each={Array.from({ length: 5 })}>
              {(_, index) => (
                <CarouselItem>
                  <div sx={styles.div}>
                    <Card>
                      <CardContent sx={styles.cardContent}>
                        <span sx={styles.span}>
                          {formatNumber(index() + 1)}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )}
            </For>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </DirectionProvider>
  )
}
