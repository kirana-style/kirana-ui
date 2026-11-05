import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  selectTrigger: css({
    width: { "*": null, base: space[32] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      selectFruit: "Select a fruit",
      fruits: "Fruits",
      apple: "Apple",
      banana: "Banana",
      blueberry: "Blueberry",
      grapes: "Grapes",
      pineapple: "Pineapple",
      vegetables: "Vegetables",
      carrot: "Carrot",
      broccoli: "Broccoli",
      spinach: "Spinach",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      selectFruit: "اختر فاكهة",
      fruits: "الفواكه",
      apple: "تفاح",
      banana: "موز",
      blueberry: "توت أزرق",
      grapes: "عنب",
      pineapple: "أناناس",
      vegetables: "الخضروات",
      carrot: "جزر",
      broccoli: "بروكلي",
      spinach: "سبانخ",
    },
  },
  he: {
    dir: "rtl",
    values: {
      selectFruit: "בחר פרי",
      fruits: "פירות",
      apple: "תפוח",
      banana: "בננה",
      blueberry: "אוכמניה",
      grapes: "ענבים",
      pineapple: "אננס",
      vegetables: "ירקות",
      carrot: "גזר",
      broccoli: "ברוקולי",
      spinach: "תרד",
    },
  },
}

@Component({
  selector: "select-rtl",
  imports: [
    DirectionProvider,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <ng-container kuiSelect [items]="allItems()" [(value)]="selectedFruit">
          <button
            kuiSelectTrigger
            [sx]="styles.selectTrigger"
            [attr.dir]="dir()"
          >
            <span kuiSelectValue></span>
          </button>
          <div
            kuiSelectContent
            [attr.dir]="dir()"
            [attr.data-lang]="dir() === 'rtl' ? language() : null"
          >
            <div kuiSelectGroup>
              <div kuiSelectLabel>{{ t().fruits }}</div>
              @for (item of fruits(); track item.value) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
            <div kuiSelectSeparator></div>
            <div kuiSelectGroup>
              <div kuiSelectLabel>{{ t().vegetables }}</div>
              @for (item of vegetables(); track item.value) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
          </div>
        </ng-container>
      </div>
    </ng-container>
  `,
})
export default class SelectRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly selectedFruit = signal<unknown>(null)
  protected readonly styles = styles
  protected readonly fruits = computed(() => [
    { label: this.t().apple, value: "apple" },
    { label: this.t().banana, value: "banana" },
    { label: this.t().blueberry, value: "blueberry" },
    { label: this.t().grapes, value: "grapes" },
    { label: this.t().pineapple, value: "pineapple" },
  ])
  protected readonly vegetables = computed(() => [
    { label: this.t().carrot, value: "carrot" },
    { label: this.t().broccoli, value: "broccoli" },
    { label: this.t().spinach, value: "spinach" },
  ])
  protected readonly allItems = computed(() => [
    { label: this.t().selectFruit, value: null },
    ...this.fruits(),
    ...this.vegetables(),
  ])
  protected readonly page = page
}
