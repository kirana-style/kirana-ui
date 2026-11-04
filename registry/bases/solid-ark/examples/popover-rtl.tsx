import { For } from "solid-js"
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function PopoverRtl() {
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
        title: "الأبعاد",
        description: "تعيين الأبعاد للطبقة.",
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
        title: "מימדים",
        description: "הגדר את המימדים לשכבה.",
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <div sx={styles.div}>
          <div sx={styles.div2}>
            <For each={physicalSides}>
              {(side) => (
                <Popover>
                  <PopoverTrigger
                    asChild={(props) => (
                      <Button {...props()} variant="outline">
                        {translation.t[side]}
                      </Button>
                    )}
                  />
                  <PopoverContent side={side} dir={translation.dir}>
                    <PopoverHeader>
                      <PopoverTitle>{translation.t.title}</PopoverTitle>
                      <PopoverDescription>
                        {translation.t.description}
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              )}
            </For>
          </div>
          <div sx={styles.div3}>
            <For each={logicalSides}>
              {(side) => (
                <Popover>
                  <PopoverTrigger
                    asChild={(props) => (
                      <Button {...props()} variant="outline">
                        {translation.t[side]}
                      </Button>
                    )}
                  />
                  <PopoverContent side={side} dir={translation.dir}>
                    <PopoverHeader>
                      <PopoverTitle>{translation.t.title}</PopoverTitle>
                      <PopoverDescription>
                        {translation.t.description}
                      </PopoverDescription>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              )}
            </For>
          </div>
        </div>
      </div>
    </DirectionProvider>
  )
}
