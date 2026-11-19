import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function ProgressRtl() {
  const styles = {
    progress: css({
      width: { "*": null, base: "100%" },
      maxWidth: { "*": null, base: containerSize.sm },
    }),
    span: css({
      marginInlineStart: "auto",
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        label: "Upload progress",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        label: "تقدم الرفع",
      },
    },
    he: {
      dir: "rtl",
      values: {
        label: "התקדמות העלאה",
      },
    },
  }

  const translation = useTranslation(translations, "ar")

  function toArabicNumerals(num: number): string {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
    return num
      .toString()
      .split("")
      .map((digit) => arabicNumerals[parseInt(digit, 10)])
      .join("")
  }

  const VALUE = 56

  const formatNumber = (num: number): string =>
    translation.language === "ar" ? toArabicNumerals(num) : num.toString()

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Progress value={VALUE} sx={styles.progress} dir={translation.dir}>
          <ProgressLabel>{translation.t.label}</ProgressLabel>
          <ProgressValue>
            <span sx={styles.span}>{formatNumber(VALUE)}%</span>
          </ProgressValue>
        </Progress>
      </div>
    </DirectionProvider>
  )
}
