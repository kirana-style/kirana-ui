import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function RadioGroupRtl() {
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <RadioGroup
          defaultValue="comfortable"
          sx={styles.radioGroup}
          dir={translation.dir}
        >
          <Field orientation="horizontal">
            <RadioGroupItem value="default" id="r1-rtl" dir={translation.dir} />
            <FieldContent>
              <FieldLabel for="r1-rtl" dir={translation.dir}>
                {translation.t.default}
              </FieldLabel>
              <FieldDescription dir={translation.dir}>
                {translation.t.defaultDescription}
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem
              value="comfortable"
              id="r2-rtl"
              dir={translation.dir}
            />
            <FieldContent>
              <FieldLabel for="r2-rtl" dir={translation.dir}>
                {translation.t.comfortable}
              </FieldLabel>
              <FieldDescription dir={translation.dir}>
                {translation.t.comfortableDescription}
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="compact" id="r3-rtl" dir={translation.dir} />
            <FieldContent>
              <FieldLabel for="r3-rtl" dir={translation.dir}>
                {translation.t.compact}
              </FieldLabel>
              <FieldDescription dir={translation.dir}>
                {translation.t.compactDescription}
              </FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>
      </div>
    </DirectionProvider>
  )
}
