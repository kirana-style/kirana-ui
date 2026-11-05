import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
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

@Component({
  selector: "combobox-rtl",
  imports: [
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    Field,
    FieldLabel,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.field">
        <label kuiFieldLabel>{{ t().label }}</label>
        <ng-container
          kuiCombobox
          multiple
          autoHighlight
          [items]="categories"
          [defaultValue]="[categories[0]]"
          [itemToStringValue]="(item) => categoryLabels()[item] || item"
        >
          <div kuiComboboxChips>
            <kui-combobox-value>
              <ng-template let-values>
                @for (value of values; track value) {
                  <div kuiComboboxChip [value]="value">
                    {{ categoryLabels()[value] || value }}
                  </div>
                }
                <input
                  kuiComboboxChipsInput
                  [attr.placeholder]="t().placeholder"
                />
              </ng-template>
            </kui-combobox-value>
          </div>
          <div
            kuiComboboxContent
            [attr.dir]="dir()"
            [attr.data-lang]="dir() === 'rtl' ? language() : undefined"
          >
            <div kuiComboboxEmpty>{{ t().empty }}</div>
            <div kuiComboboxList>
              <ng-template let-item>
                <div kuiComboboxItem [value]="item">
                  {{ categoryLabels()[item] || item }}
                </div>
              </ng-template>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class ComboboxRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly categoryLabels = computed<Record<string, string>>(() => ({
    technology: this.t().technology,
    design: this.t().design,
    business: this.t().business,
    marketing: this.t().marketing,
    education: this.t().education,
    health: this.t().health,
  }))

  protected readonly styles = styles
  protected readonly categories = categories
  protected readonly page = page
}
