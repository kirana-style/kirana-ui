import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

const styles = {
  radioGroup: css({
    width: { "*": null, base: "fit-content" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      default: "Default",
      defaultDescription: "Standard spacing for most use cases.",
      comfortable: "Comfortable",
      comfortableDescription: "More space between elements.",
      compact: "Compact",
      compactDescription: "Minimal spacing for dense layouts.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      default: "افتراضي",
      defaultDescription: "تباعد قياسي لمعظم حالات الاستخدام.",
      comfortable: "مريح",
      comfortableDescription: "مساحة أكبر بين العناصر.",
      compact: "مضغوط",
      compactDescription: "تباعد أدنى للتخطيطات الكثيفة.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      default: "ברירת מחדל",
      defaultDescription: "ריווח סטנדרטי לרוב מקרי השימוש.",
      comfortable: "נוח",
      comfortableDescription: "יותר מקום בין האלמנטים.",
      compact: "קומפקטי",
      compactDescription: "ריווח מינימלי לפריסות צפופות.",
    },
  },
}

export default function RadioGroupRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <RadioGroup
        aria-label="Density"
        defaultValue="comfortable"
        sx={styles.radioGroup}
        dir={dir}
      >
        <Field orientation="horizontal">
          <RadioGroupItem value="default" id="r1-rtl" dir={dir} />
          <FieldContent>
            <FieldLabel htmlFor="r1-rtl" dir={dir}>
              {t.default}
            </FieldLabel>
            <FieldDescription dir={dir}>
              {t.defaultDescription}
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="comfortable" id="r2-rtl" dir={dir} />
          <FieldContent>
            <FieldLabel htmlFor="r2-rtl" dir={dir}>
              {t.comfortable}
            </FieldLabel>
            <FieldDescription dir={dir}>
              {t.comfortableDescription}
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="compact" id="r3-rtl" dir={dir} />
          <FieldContent>
            <FieldLabel htmlFor="r3-rtl" dir={dir}>
              {t.compact}
            </FieldLabel>
            <FieldDescription dir={dir}>
              {t.compactDescription}
            </FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
    </div>
  )
}
