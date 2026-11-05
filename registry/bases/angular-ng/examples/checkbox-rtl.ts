import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import { DirectionProvider } from "../ui/direction"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
import { Label } from "../ui/label"

const styles = {
  fieldGroup: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      acceptTerms: "Accept terms and conditions",
      acceptTermsDescription:
        "By clicking this checkbox, you agree to the terms.",
      enableNotifications: "Enable notifications",
      enableNotificationsDescription:
        "You can enable or disable notifications at any time.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      acceptTerms: "قبول الشروط والأحكام",
      acceptTermsDescription: "بالنقر على هذا المربع، فإنك توافق على الشروط.",
      enableNotifications: "تفعيل الإشعارات",
      enableNotificationsDescription:
        "يمكنك تفعيل أو إلغاء تفعيل الإشعارات في أي وقت.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      acceptTerms: "קבל תנאים והגבלות",
      acceptTermsDescription:
        "על ידי לחיצה על תיבת הסימון הזו, אתה מסכים לתנאים.",
      enableNotifications: "הפעל התראות",
      enableNotificationsDescription:
        "אתה יכול להפעיל או להשבית התראות בכל עת.",
    },
  },
}

@Component({
  selector: "checkbox-rtl",
  imports: [
    Checkbox,
    DirectionProvider,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
    Label,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiFieldGroup [sx]="styles.fieldGroup" [attr.dir]="dir()">
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="terms-checkbox-rtl"
              name="terms-checkbox"
            ></span>
            <label kuiLabel for="terms-checkbox-rtl">{{
              t().acceptTerms
            }}</label>
          </div>
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="terms-checkbox-2-rtl"
              name="terms-checkbox-2"
              defaultChecked
            ></span>
            <div kuiFieldContent>
              <label kuiFieldLabel for="terms-checkbox-2-rtl">{{
                t().acceptTerms
              }}</label>
              <p kuiFieldDescription>{{ t().acceptTermsDescription }}</p>
            </div>
          </div>
          <div kuiField orientation="horizontal" data-disabled="true">
            <span
              kuiCheckbox
              id="toggle-checkbox-rtl"
              name="toggle-checkbox"
              disabled
            ></span>
            <label kuiFieldLabel for="toggle-checkbox-rtl">{{
              t().enableNotifications
            }}</label>
          </div>
          <label kuiFieldLabel>
            <div kuiField orientation="horizontal">
              <span
                kuiCheckbox
                id="toggle-checkbox-2"
                name="toggle-checkbox-2"
              ></span>
              <div kuiFieldContent>
                <div kuiFieldTitle>{{ t().enableNotifications }}</div>
                <p kuiFieldDescription>
                  {{ t().enableNotificationsDescription }}
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </ng-container>
  `,
})
export default class CheckboxRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
