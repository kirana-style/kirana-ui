import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"

const styles = {
  progress: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  span: css({
    marginInlineStart: "auto",
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Upload progress",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "تقدم الرفع",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "התקדמות העלאה",
    },
  },
}

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("")
}

const VALUE = 56

@Component({
  selector: "progress-rtl",
  imports: [
    DirectionProvider,
    Progress,
    ProgressLabel,
    ProgressValue,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiProgress
          [value]="VALUE"
          [sx]="styles.progress"
          [attr.dir]="dir()"
        >
          <span kuiProgressLabel>{{ t().label }}</span>
          <span kuiProgressValue>
            <span [sx]="styles.span"> {{ formatNumber(VALUE) }}% </span>
          </span>
        </div>
      </div>
    </ng-container>
  `,
})
export default class ProgressRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly VALUE = VALUE
  protected formatNumber(num: number): string {
    return this.language() === "ar" ? toArabicNumerals(num) : num.toString()
  }
  protected readonly page = page
}
