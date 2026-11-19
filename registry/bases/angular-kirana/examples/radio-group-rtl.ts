import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  radioGroup: css({
    width: { "*": null, base: "fit-content" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      default: "Default",
      defaultDescription: "Standard spacing for most use cases.",
      comfortable: "Comfortable",
      comfortableDescription: "More space between elements.",
      compact: "Compact",
      compactDescription: "Minimal spacing for dense layouts.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      default: "افتراضي",
      defaultDescription: "تباعد قياسي لمعظم حالات الاستخدام.",
      comfortable: "مريح",
      comfortableDescription: "مساحة أكبر بين العناصر.",
      compact: "مضغوط",
      compactDescription: "تباعد أدنى للتخطيطات الكثيفة.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      default: "ברירת מחדל",
      defaultDescription: "ריווח סטנדרטי לרוב מקרי השימוש.",
      comfortable: "נוח",
      comfortableDescription: "יותר מקום בין האלמנטים.",
      compact: "קומפקטי",
      compactDescription: "ריווח מינימלי לפריסות צפופות.",
    },
  },
}

@Component({
  selector: "radio-group-rtl",
  imports: [
    DirectionProvider,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    RadioGroup,
    RadioGroupItem,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiRadioGroup
          defaultValue="comfortable"
          [sx]="styles.radioGroup"
          [attr.dir]="dir()"
        >
          <div kuiField orientation="horizontal">
            <span
              kuiRadioGroupItem
              value="default"
              id="r1-rtl"
              [attr.dir]="dir()"
            ></span>
            <div kuiFieldContent>
              <label kuiFieldLabel for="r1-rtl" [attr.dir]="dir()">{{
                t().default
              }}</label>
              <p kuiFieldDescription [attr.dir]="dir()">
                {{ t().defaultDescription }}
              </p>
            </div>
          </div>
          <div kuiField orientation="horizontal">
            <span
              kuiRadioGroupItem
              value="comfortable"
              id="r2-rtl"
              [attr.dir]="dir()"
            ></span>
            <div kuiFieldContent>
              <label kuiFieldLabel for="r2-rtl" [attr.dir]="dir()">{{
                t().comfortable
              }}</label>
              <p kuiFieldDescription [attr.dir]="dir()">
                {{ t().comfortableDescription }}
              </p>
            </div>
          </div>
          <div kuiField orientation="horizontal">
            <span
              kuiRadioGroupItem
              value="compact"
              id="r3-rtl"
              [attr.dir]="dir()"
            ></span>
            <div kuiFieldContent>
              <label kuiFieldLabel for="r3-rtl" [attr.dir]="dir()">{{
                t().compact
              }}</label>
              <p kuiFieldDescription [attr.dir]="dir()">
                {{ t().compactDescription }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class RadioGroupRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
