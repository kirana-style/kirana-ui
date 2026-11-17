import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
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
      "inline-start": "Inline Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      "inline-end": "Inline End",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      content: "إضافة إلى المكتبة",
      "inline-start": "بداية السطر",
      left: "يسار",
      top: "أعلى",
      bottom: "أسفل",
      right: "يمين",
      "inline-end": "نهاية السطر",
    },
  },
  he: {
    dir: "rtl",
    values: {
      content: "הוסף לספרייה",
      "inline-start": "תחילת השורה",
      left: "שמאל",
      top: "למעלה",
      bottom: "למטה",
      right: "ימין",
      "inline-end": "סוף השורה",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const
const logicalSides = ["inline-start", "inline-end"] as const

export default function TooltipRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div sx={styles.div2}>
          {physicalSides.map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" />}>
                {t[side]}
              </TooltipTrigger>
              <TooltipContent side={side} dir={dir}>
                {t.content}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <div sx={styles.div3}>
          {logicalSides.map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" />}>
                {t[side]}
              </TooltipTrigger>
              <TooltipContent side={side} dir={dir}>
                {t.content}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}
