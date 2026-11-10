<script setup lang="ts">
import { computed } from "vue"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "../ui/combobox"
import { Field, FieldLabel } from "../ui/field"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  field: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
}

const categories = [
  "technology",
  "design",
  "business",
  "marketing",
  "education",
  "health",
] as const

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Categories",
      placeholder: "Add categories",
      empty: "No categories found.",
      technology: "Technology",
      design: "Design",
      business: "Business",
      marketing: "Marketing",
      education: "Education",
      health: "Health",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "الفئات",
      placeholder: "أضف فئات",
      empty: "لم يتم العثور على فئات.",
      technology: "التكنولوجيا",
      design: "التصميم",
      business: "الأعمال",
      marketing: "التسويق",
      education: "التعليم",
      health: "الصحة",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "קטגוריות",
      placeholder: "הוסף קטגוריות",
      empty: "לא נמצאו קטגוריות.",
      technology: "טכנולוגיה",
      design: "עיצוב",
      business: "עסקים",
      marketing: "שיווק",
      education: "חינוך",
      health: "בריאות",
    },
  },
}

const { dir, t, language } = useTranslation(translations, "ar")
const categoryLabels = computed<Record<string, string>>(() => ({
  technology: t.value.technology,
  design: t.value.design,
  business: t.value.business,
  marketing: t.value.marketing,
  education: t.value.education,
  health: t.value.health,
}))
</script>

<template>
  <div :sx="page.example">
    <Field :sx="styles.field">
      <FieldLabel>
        {{ t.label }}
      </FieldLabel>
      <Combobox
        multiple
        auto-highlight
        :items="categories"
        :default-value="[categories[0]]"
        :item-to-string-value="
          (item: (typeof categories)[number]) => categoryLabels[item] || item
        "
      >
        <ComboboxChips>
          <ComboboxValue v-slot="values">
            <ComboboxChip v-for="value in values" :key="value" :value="value">
              {{ categoryLabels[value] || value }}
            </ComboboxChip>
            <ComboboxChipsInput :placeholder="t.placeholder" />
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent
          :dir="dir"
          :data-lang="dir === 'rtl' ? language : undefined"
        >
          <ComboboxEmpty>
            {{ t.empty }}
          </ComboboxEmpty>
          <ComboboxList v-slot="{ item }">
            <ComboboxItem :key="item" :value="item">
              {{ categoryLabels[item] || item }}
            </ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  </div>
</template>
