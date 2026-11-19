import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      list: "List",
      grid: "Grid",
      cards: "Cards",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      list: "قائمة",
      grid: "شبكة",
      cards: "بطاقات",
    },
  },
  he: {
    dir: "rtl",
    values: {
      list: "רשימה",
      grid: "רשת",
      cards: "כרטיסים",
    },
  },
}

@Component({
  selector: "toggle-group-rtl",
  imports: [DirectionProvider, ToggleGroup, ToggleGroupItem, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiToggleGroup
          variant="outline"
          [defaultValue]="['list']"
          [attr.dir]="dir()"
        >
          <button kuiToggleGroupItem value="list" [attr.aria-label]="t().list">
            {{ t().list }}
          </button>
          <button kuiToggleGroupItem value="grid" [attr.aria-label]="t().grid">
            {{ t().grid }}
          </button>
          <button
            kuiToggleGroupItem
            value="cards"
            [attr.aria-label]="t().cards"
          >
            {{ t().cards }}
          </button>
        </div>
      </div>
    </ng-container>
  `,
})
export default class ToggleGroupRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly page = page
}
