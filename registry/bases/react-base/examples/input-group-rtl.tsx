import { IconPlaceholder } from "../../../icons/icon-placeholder"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"
import { Spinner } from "../ui/spinner"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "grid",
    width: "100%",
    maxWidth: containerSize.sm,
    gap: space[6],
  }),
  inputGroup: css({
    maxWidth: { "*": null, base: containerSize.xs },
  }),
  fieldGroup: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  inputGroupButton: css({
    marginInlineStart: { "*": null, base: "auto" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "Search...",
      results: "12 results",
      searching: "Searching...",
      saving: "Saving...",
      savingChanges: "Saving changes...",
      textareaLabel: "Textarea",
      textareaPlaceholder: "Write a comment...",
      characterCount: "0/280",
      post: "Post",
      textareaDescription: "Footer positioned below the textarea.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      placeholder: "بحث...",
      results: "١٢ نتيجة",
      searching: "جاري البحث...",
      saving: "جاري الحفظ...",
      savingChanges: "جاري حفظ التغييرات...",
      textareaLabel: "منطقة النص",
      textareaPlaceholder: "اكتب تعليقًا...",
      characterCount: "٠/٢٨٠",
      post: "نشر",
      textareaDescription: "تذييل موضع أسفل منطقة النص.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      placeholder: "חפש...",
      results: "12 תוצאות",
      searching: "מחפש...",
      saving: "שומר...",
      savingChanges: "שומר שינויים...",
      textareaLabel: "אזור טקסט",
      textareaPlaceholder: "כתוב תגובה...",
      characterCount: "0/280",
      post: "פרסם",
      textareaDescription: "כותרת תחתונה ממוקמת מתחת לאזור הטקסט.",
    },
  },
}

export default function InputGroupRtl() {
  const { t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <InputGroup sx={styles.inputGroup}>
          <InputGroupInput placeholder={t.placeholder} />
          <InputGroupAddon>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">{t.results}</InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder={t.searching} />
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder={t.savingChanges} />
          <InputGroupAddon align="inline-end">
            <InputGroupText>{t.saving}</InputGroupText>
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <FieldGroup sx={styles.fieldGroup}>
          <Field>
            <FieldLabel htmlFor="rtl-textarea">{t.textareaLabel}</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                id="rtl-textarea"
                placeholder={t.textareaPlaceholder}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText>{t.characterCount}</InputGroupText>
                <InputGroupButton
                  variant="default"
                  size="sm"
                  sx={styles.inputGroupButton}
                >
                  {t.post}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>{t.textareaDescription}</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}
