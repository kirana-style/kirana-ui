import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function SwitchRtl() {
  const styles = {
    field: css({
      maxWidth: { "*": null, base: containerSize.sm },
    }),
  }

  const translations: Translations = {
    en: {
      dir: "ltr",
      values: {
        label: "Share across devices",
        description:
          "Focus is shared across devices, and turns off when you leave the app.",
      },
    },
    ar: {
      dir: "rtl",
      values: {
        label: "المشاركة عبر الأجهزة",
        description:
          "يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.",
      },
    },
    he: {
      dir: "rtl",
      values: {
        label: "שיתוף בין מכשירים",
        description: "המיקוד משותף בין מכשירים, וכבה כשאתה עוזב את האפליקציה.",
      },
    },
  }

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Field orientation="horizontal" sx={styles.field} dir={translation.dir}>
          <FieldContent>
            <FieldLabel for="switch-focus-mode-rtl" dir={translation.dir}>
              {translation.t.label}
            </FieldLabel>
            <FieldDescription dir={translation.dir}>
              {translation.t.description}
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-focus-mode-rtl" dir={translation.dir} />
        </Field>
      </div>
    </DirectionProvider>
  )
}
