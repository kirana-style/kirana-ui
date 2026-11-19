import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      apiKey: "API Key",
      placeholder: "sk-...",
      description: "Your API key is encrypted and stored securely.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      apiKey: "مفتاح API",
      placeholder: "sk-...",
      description: "مفتاح API الخاص بك مشفر ومخزن بأمان.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      apiKey: "מפתח API",
      placeholder: "sk-...",
      description: "מפתח ה-API שלך מוצפן ונשמר בצורה מאובטחת.",
    },
  },
}

@Component({
  selector: "input-rtl",
  imports: [
    DirectionProvider,
    Field,
    FieldDescription,
    FieldLabel,
    Input,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiField [attr.dir]="dir()">
          <label kuiFieldLabel for="input-rtl-api-key">{{ t().apiKey }}</label>
          <input
            kuiInput
            id="input-rtl-api-key"
            type="password"
            [attr.placeholder]="t().placeholder"
            [attr.dir]="dir()"
          />
          <p kuiFieldDescription>{{ t().description }}</p>
        </div>
      </div>
    </ng-container>
  `,
})
export default class InputRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly page = page
}
