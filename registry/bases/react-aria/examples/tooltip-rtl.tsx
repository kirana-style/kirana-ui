import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "grid",
    gap: space[4],
  }),
  div2: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
  div3: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      content: "Add to library",
      start: "Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      end: "End",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      content: "إضافة إلى المكتبة",
      start: "بداية السطر",
      left: "يسار",
      top: "أعلى",
      bottom: "أسفل",
      right: "يمين",
      end: "نهاية السطر",
    },
  },
  he: {
    dir: "rtl",
    values: {
      content: "הוסף לספרייה",
      start: "תחילת השורה",
      left: "שמאל",
      top: "למעלה",
      bottom: "למטה",
      right: "ימין",
      end: "סוף השורה",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const
const logicalPlacements = ["start", "end"] as const

export default function TooltipRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div sx={styles.div2}>
          {physicalSides.map((side) => (
            <TooltipTrigger key={side}>
              <Button variant="outline">{t[side]}</Button>
              <Tooltip placement={side} dir={dir}>
                {t.content}
              </Tooltip>
            </TooltipTrigger>
          ))}
        </div>
        <div sx={styles.div3}>
          {logicalPlacements.map((placement) => (
            <TooltipTrigger key={placement}>
              <Button variant="outline">{t[placement]}</Button>
              <Tooltip placement={placement} dir={dir}>
                {t.content}
              </Tooltip>
            </TooltipTrigger>
          ))}
        </div>
      </div>
    </div>
  )
}
