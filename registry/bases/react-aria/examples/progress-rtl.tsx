import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("")
}

export default function ProgressRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")

  const formatNumber = (num: number): string => {
    if (language === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  return (
    <div sx={page.example}>
      <Progress value={56} sx={styles.progress} dir={dir}>
        <ProgressLabel>{t.label}</ProgressLabel>
        <ProgressValue>
          {(value) => (
            <span sx={styles.span}>
              {formatNumber(parseFloat(value ?? "0"))}%
            </span>
          )}
        </ProgressValue>
      </Progress>
    </div>
  )
}
