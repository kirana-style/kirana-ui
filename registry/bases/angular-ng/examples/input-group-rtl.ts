import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "input-group-rtl",
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiInputGroup [sx]="styles.inputGroup">
          <input kuiInputGroupInput [attr.placeholder]="t().placeholder" />
          <div kuiInputGroupAddon>
            <svg
              iconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            ></svg>
          </div>
          <div kuiInputGroupAddon align="inline-end">{{ t().results }}</div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput [attr.placeholder]="t().searching" />
          <div kuiInputGroupAddon align="inline-end">
            <svg kuiSpinner></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput [attr.placeholder]="t().savingChanges" />
          <div kuiInputGroupAddon align="inline-end">
            <span kuiInputGroupText>{{ t().saving }}</span>
            <svg kuiSpinner></svg>
          </div>
        </div>
        <div kuiFieldGroup [sx]="styles.fieldGroup">
          <div kuiField>
            <label kuiFieldLabel for="rtl-textarea">{{
              t().textareaLabel
            }}</label>
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                id="rtl-textarea"
                [attr.placeholder]="t().textareaPlaceholder"
              ></textarea>
              <div kuiInputGroupAddon align="block-end">
                <span kuiInputGroupText>{{ t().characterCount }}</span>
                <button
                  kuiInputGroupButton
                  variant="default"
                  size="sm"
                  [sx]="styles.inputGroupButton"
                >
                  {{ t().post }}
                </button>
              </div>
            </div>
            <p kuiFieldDescription>{{ t().textareaDescription }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly t = this.i18n.t
  protected readonly styles = styles
  protected readonly page = page
}
