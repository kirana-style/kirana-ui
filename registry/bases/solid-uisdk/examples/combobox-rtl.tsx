import { For } from "solid-js"
import { useTranslation } from "../components/language-selector"
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
import type { Translations } from "../components/language-selector"

export default function ComboboxRtl() {
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

  const translation = useTranslation(translations, "ar")
  const categoryLabels = (): Record<string, string> => ({
    technology: translation.t.technology,
    design: translation.t.design,
    business: translation.t.business,
    marketing: translation.t.marketing,
    education: translation.t.education,
    health: translation.t.health,
  })

  return (
    <div sx={page.example}>
      <Field sx={styles.field}>
        <FieldLabel>{translation.t.label}</FieldLabel>
        <Combobox
          multiple
          autoHighlight
          items={categories}
          defaultValue={[categories[0]]}
          itemToStringValue={(item: (typeof categories)[number]) =>
            categoryLabels()[item] || item
          }
        >
          <ComboboxChips>
            <ComboboxValue>
              {(values) => (
                <>
                  <For each={values}>
                    {(value) => (
                      <ComboboxChip value={value}>
                        {categoryLabels()[value] || value}
                      </ComboboxChip>
                    )}
                  </For>
                  <ComboboxChipsInput placeholder={translation.t.placeholder} />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent
            dir={translation.dir}
            data-lang={
              translation.dir === "rtl" ? translation.language : undefined
            }
          >
            <ComboboxEmpty>{translation.t.empty}</ComboboxEmpty>
            <ComboboxList>
              {({ item }) => (
                <ComboboxItem value={item}>
                  {categoryLabels()[item] || item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}
