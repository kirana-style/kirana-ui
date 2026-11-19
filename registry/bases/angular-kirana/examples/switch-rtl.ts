import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field"
import { Switch } from "../ui/switch"

const styles = {
  field: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Share across devices",
      description:
        "Focus is shared across devices, and turns off when you leave the app.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "المشاركة عبر الأجهزة",
      description:
        "يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "שיתוף בין מכשירים",
      description: "המיקוד משותף בין מכשירים, וכבה כשאתה עוזב את האפליקציה.",
    },
  },
}

@Component({
  selector: "switch-rtl",
  imports: [
    DirectionProvider,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    Switch,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiField
          orientation="horizontal"
          [sx]="styles.field"
          [attr.dir]="dir()"
        >
          <div kuiFieldContent>
            <label
              kuiFieldLabel
              for="switch-focus-mode-rtl"
              [attr.dir]="dir()"
              >{{ t().label }}</label
            >
            <p kuiFieldDescription [attr.dir]="dir()">{{ t().description }}</p>
          </div>
          <span kuiSwitch id="switch-focus-mode-rtl" [attr.dir]="dir()"></span>
        </div>
      </div>
    </ng-container>
  `,
})
export default class SwitchRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
