<script setup lang="ts">
import { DirectionProvider } from "../ui/direction"
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

const { dir, t, locale } = useTranslation(translations, "ar")
</script>

<template>
  <DirectionProvider :locale="locale">
    <div :sx="page.example">
      <RadioGroup
        default-value="comfortable"
        :sx="styles.radioGroup"
        :dir="dir"
      >
        <Field orientation="horizontal">
          <RadioGroupItem value="default" id="r1-rtl" :dir="dir" />
          <FieldContent>
            <FieldLabel for="r1-rtl" :dir="dir">{{ t.default }}</FieldLabel>
            <FieldDescription :dir="dir">{{
              t.defaultDescription
            }}</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="comfortable" id="r2-rtl" :dir="dir" />
          <FieldContent>
            <FieldLabel for="r2-rtl" :dir="dir">{{ t.comfortable }}</FieldLabel>
            <FieldDescription :dir="dir">{{
              t.comfortableDescription
            }}</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="compact" id="r3-rtl" :dir="dir" />
          <FieldContent>
            <FieldLabel for="r3-rtl" :dir="dir">{{ t.compact }}</FieldLabel>
            <FieldDescription :dir="dir">{{
              t.compactDescription
            }}</FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
    </div>
  </DirectionProvider>
</template>
