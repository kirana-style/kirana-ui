import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { NativeSelect, NativeSelectOption } from "../ui/native-select"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "Select status",
      todo: "Todo",
      inProgress: "In Progress",
      done: "Done",
      cancelled: "Cancelled",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      placeholder: "اختر الحالة",
      todo: "مهام",
      inProgress: "قيد التنفيذ",
      done: "منجز",
      cancelled: "ملغي",
    },
  },
  he: {
    dir: "rtl",
    values: {
      placeholder: "בחר סטטוס",
      todo: "לעשות",
      inProgress: "בתהליך",
      done: "הושלם",
      cancelled: "בוטל",
    },
  },
}

@Component({
  selector: "native-select-rtl",
  imports: [DirectionProvider, NativeSelect, NativeSelectOption, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiNativeSelect [attr.dir]="dir()">
          <option kuiNativeSelectOption value="">{{ t().placeholder }}</option>
          <option kuiNativeSelectOption value="todo">{{ t().todo }}</option>
          <option kuiNativeSelectOption value="in-progress">
            {{ t().inProgress }}
          </option>
          <option kuiNativeSelectOption value="done">{{ t().done }}</option>
          <option kuiNativeSelectOption value="cancelled">
            {{ t().cancelled }}
          </option>
        </div>
      </div>
    </ng-container>
  `,
})
export default class NativeSelectRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly page = page
}
