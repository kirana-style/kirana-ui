import * as React from "react"

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
  useComboboxAnchor,
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

export default function ComboboxRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")
  const anchor = useComboboxAnchor()

  const categoryLabels: Record<string, string> = {
    technology: t.technology,
    design: t.design,
    business: t.business,
    marketing: t.marketing,
    education: t.education,
    health: t.health,
  }

  return (
    <div sx={page.example}>
      <Field sx={styles.field}>
        <FieldLabel>{t.label}</FieldLabel>
        <Combobox
          multiple
          autoHighlight
          items={categories}
          defaultValue={[categories[0]]}
          itemToStringValue={(item: (typeof categories)[number]) =>
            categoryLabels[item] || item
          }
        >
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(values) => (
                <React.Fragment>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>
                      {categoryLabels[value] || value}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder={t.placeholder} />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent
            anchor={anchor}
            dir={dir}
            data-lang={dir === "rtl" ? language : undefined}
          >
            <ComboboxEmpty>{t.empty}</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {categoryLabels[item] || item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}
