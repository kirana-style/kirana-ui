import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Badge } from "../ui/badge"
import { DirectionProvider } from "../ui/direction"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      badge: "Badge",
      secondary: "Secondary",
      destructive: "Destructive",
      outline: "Outline",
      verified: "Verified",
      bookmark: "Bookmark",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      badge: "شارة",
      secondary: "ثانوي",
      destructive: "مدمر",
      outline: "مخطط",
      verified: "متحقق",
      bookmark: "إشارة مرجعية",
    },
  },
  he: {
    dir: "rtl",
    values: {
      badge: "תג",
      secondary: "משני",
      destructive: "הרסני",
      outline: "קווי מתאר",
      verified: "מאומת",
      bookmark: "סימנייה",
    },
  },
}

@Component({
  selector: "badge-rtl",
  imports: [Badge, DirectionProvider, IconPlaceholder, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <span kuiBadge>{{ t().badge }}</span>
          <span kuiBadge variant="secondary">{{ t().secondary }}</span>
          <span kuiBadge variant="destructive">{{ t().destructive }}</span>
          <span kuiBadge variant="outline">{{ t().outline }}</span>
          <span kuiBadge variant="secondary">
            <svg
              iconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            ></svg>
            {{ t().verified }}
          </span>
          <span kuiBadge variant="outline">
            {{ t().bookmark }}
            <svg
              iconPlaceholder
              lucide="BookmarkIcon"
              tabler="IconBookmark"
              hugeicons="BookmarkIcon"
              phosphor="BookmarkIcon"
              remixicon="RiBookmarkLine"
              data-icon="inline-end"
            ></svg>
          </span>
        </div>
      </div>
    </ng-container>
  `,
})
export default class BadgeRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
