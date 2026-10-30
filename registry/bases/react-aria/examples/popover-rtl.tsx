import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
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
      title: "Dimensions",
      description: "Set the dimensions for the layer.",
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
      title: "الأبعاد",
      description: "تعيين الأبعاد للطبقة.",
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
      title: "מימדים",
      description: "הגדר את המימדים לשכבה.",
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

export default function PopoverRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div sx={styles.div2}>
          {physicalSides.map((side) => (
            <PopoverTrigger key={side}>
              <Button variant="outline">{t[side]}</Button>
              <Popover placement={side} dir={dir}>
                <PopoverHeader>
                  <PopoverTitle>{t.title}</PopoverTitle>
                  <PopoverDescription>{t.description}</PopoverDescription>
                </PopoverHeader>
              </Popover>
            </PopoverTrigger>
          ))}
        </div>
        <div sx={styles.div3}>
          {logicalPlacements.map((placement) => (
            <PopoverTrigger key={placement}>
              <Button variant="outline">{t[placement]}</Button>
              <Popover placement={placement} dir={dir}>
                <PopoverHeader>
                  <PopoverTitle>{t.title}</PopoverTitle>
                  <PopoverDescription>{t.description}</PopoverDescription>
                </PopoverHeader>
              </Popover>
            </PopoverTrigger>
          ))}
        </div>
      </div>
    </div>
  )
}
