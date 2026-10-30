import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function SwitchRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <Field orientation="horizontal" sx={styles.field} dir={dir}>
        <FieldContent>
          <FieldLabel htmlFor="switch-focus-mode-rtl" dir={dir}>
            {t.label}
          </FieldLabel>
          <FieldDescription dir={dir}>{t.description}</FieldDescription>
        </FieldContent>
        <Switch id="switch-focus-mode-rtl" dir={dir} />
      </Field>
    </div>
  )
}
