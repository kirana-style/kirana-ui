import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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

export default function CarouselRtl() {
  const { dir, language } = useTranslation(translations, "ar")

  const formatNumber = (num: number): string => {
    if (language === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  return (
    <div sx={page.example}>
      <Carousel
        dir={dir}
        sx={styles.carousel}
        opts={{
          direction: dir,
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div sx={styles.div}>
                <Card>
                  <CardContent sx={styles.cardContent}>
                    <span sx={styles.span}>{formatNumber(index + 1)}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
