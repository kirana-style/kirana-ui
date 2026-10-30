import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Separator } from "../ui/separator"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space["1.5"],
  }),
  div3: css({
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  div4: css({
    color: theme.mutedForeground,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "shadcn/ui",
      subtitle: "The Foundation for your Design System",
      description:
        "A set of beautifully designed components that you can customize, extend, and build on.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "shadcn/ui",
      subtitle: "الأساس لنظام التصميم الخاص بك",
      description:
        "مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "shadcn/ui",
      subtitle: "הבסיס למערכת העיצוב שלך",
      description:
        "סט של רכיבים מעוצבים בצורה יפה שאתה יכול להתאים אישית, להרחיב ולבנות עליהם.",
    },
  },
}

export default function SeparatorRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div} dir={dir}>
        <div sx={styles.div2}>
          <div sx={styles.div3}>{t.title}</div>
          <div sx={styles.div4}>{t.subtitle}</div>
        </div>
        <Separator />
        <div>{t.description}</div>
      </div>
    </div>
  )
}
