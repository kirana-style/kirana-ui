import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { IN_PRESSED_TOGGLE } from "../../../styles/toggle.styles"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { DirectionProvider } from "../ui/direction"
import { Toggle } from "../ui/toggle"

const styles = {
  iconPlaceholder: css({
    // The icon fills while the toggle is pressed.
    fill: { [IN_PRESSED_TOGGLE]: theme.foreground },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Bookmark",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "إشارة مرجعية",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "סימנייה",
    },
  },
}

@Component({
  selector: "toggle-rtl",
  imports: [DirectionProvider, Toggle, IconPlaceholder, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <button
          kuiToggle
          aria-label="Toggle bookmark"
          size="sm"
          variant="outline"
          [attr.dir]="dir()"
        >
          <svg
            iconPlaceholder
            lucide="BookmarkIcon"
            tabler="IconBookmark"
            hugeicons="BookmarkIcon"
            phosphor="BookmarkIcon"
            remixicon="RiBookmarkLine"
            [sx]="styles.iconPlaceholder"
          ></svg>
          {{ t().label }}
        </button>
      </div>
    </ng-container>
  `,
})
export default class ToggleRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
