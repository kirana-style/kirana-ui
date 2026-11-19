import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Slider } from "../ui/slider"

const styles = {
  slider: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

@Component({
  selector: "slider-rtl",
  imports: [DirectionProvider, Slider, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiSlider
          [defaultValue]="[75]"
          [max]="100"
          [step]="1"
          [sx]="styles.slider"
          [attr.dir]="dir()"
        ></div>
      </div>
    </ng-container>
  `,
})
export default class SliderRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
