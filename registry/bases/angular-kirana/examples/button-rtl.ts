import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { DirectionProvider } from "../ui/direction"
import { Spinner } from "../ui/spinner"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: space[2],
    flexDirection: { [breakpoint.md]: "row" },
  }),
  iconPlaceholder: css({
    rotate: { ":dir(rtl)": "180deg" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      button: "Button",
      submit: "Submit",
      delete: "Delete",
      loading: "Loading",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      button: "زر",
      submit: "إرسال",
      delete: "حذف",
      loading: "جاري التحميل",
    },
  },
  he: {
    dir: "rtl",
    values: {
      button: "כפתור",
      submit: "שלח",
      delete: "מחק",
      loading: "טוען",
    },
  },
}

@Component({
  selector: "button-rtl",
  imports: [Button, DirectionProvider, Spinner, IconPlaceholder, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <button kuiButton variant="outline">{{ t().button }}</button>
          <button kuiButton variant="destructive">{{ t().delete }}</button>
          <button kuiButton variant="outline">
            {{ t().submit }}
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              [sx]="styles.iconPlaceholder"
              data-icon="inline-end"
            ></svg>
          </button>
          <button kuiButton variant="outline" size="icon" aria-label="Add">
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </button>
          <button kuiButton variant="secondary" disabled>
            <svg kuiSpinner data-icon="inline-start"></svg>
            {{ t().loading }}
          </button>
        </div>
      </div>
    </ng-container>
  `,
})
export default class ButtonRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
