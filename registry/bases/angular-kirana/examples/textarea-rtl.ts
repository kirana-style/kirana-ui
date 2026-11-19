import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

const styles = {
  field: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Feedback",
      placeholder: "Your feedback helps us improve...",
      description: "Share your thoughts about our service.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "التعليقات",
      placeholder: "تعليقاتك تساعدنا على التحسين...",
      description: "شاركنا أفكارك حول خدمتنا.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "משוב",
      placeholder: "המשוב שלך עוזר לנו להשתפר...",
      description: "שתף את מחשבותיך על השירות שלנו.",
    },
  },
}

@Component({
  selector: "textarea-rtl",
  imports: [
    DirectionProvider,
    Field,
    FieldDescription,
    FieldLabel,
    Textarea,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiField [sx]="styles.field" [attr.dir]="dir()">
          <label kuiFieldLabel for="feedback" [attr.dir]="dir()">{{
            t().label
          }}</label>
          <textarea
            kuiTextarea
            id="feedback"
            [attr.placeholder]="t().placeholder"
            [attr.dir]="dir()"
            [attr.rows]="4"
          ></textarea>
          <p kuiFieldDescription [attr.dir]="dir()">{{ t().description }}</p>
        </div>
      </div>
    </ng-container>
  `,
})
export default class TextareaRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
