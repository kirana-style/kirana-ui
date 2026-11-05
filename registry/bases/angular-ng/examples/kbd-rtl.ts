import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Kbd, KbdGroup } from "../ui/kbd"

const styles = {
  div: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
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
  selector: "kbd-rtl",
  imports: [DirectionProvider, Kbd, KbdGroup, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <kbd kuiKbdGroup>
            <kbd kuiKbd>⌘</kbd>
            <kbd kuiKbd>⇧</kbd>
            <kbd kuiKbd>⌥</kbd>
            <kbd kuiKbd>⌃</kbd>
          </kbd>
          <kbd kuiKbdGroup>
            <kbd kuiKbd>Ctrl</kbd>
            <span>+</span>
            <kbd kuiKbd>B</kbd>
          </kbd>
        </div>
      </div>
    </ng-container>
  `,
})
export default class KbdRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
