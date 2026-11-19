import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { DirectionProvider } from "../ui/direction"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: space[6],
  }),
  iconPlaceholder: css({
    width: space[5],
    height: space[5],
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      basicItem: "Basic Item",
      basicItemDesc: "A simple item with title and description.",
      action: "Action",
      verifiedTitle: "Your profile has been verified.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      basicItem: "عنصر أساسي",
      basicItemDesc: "عنصر بسيط يحتوي على عنوان ووصف.",
      action: "إجراء",
      verifiedTitle: "تم التحقق من ملفك الشخصي.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      basicItem: "פריט בסיסי",
      basicItemDesc: "פריט פשוט עם כותרת ותיאור.",
      action: "פעולה",
      verifiedTitle: "הפרופיל שלך אומת.",
    },
  },
}

@Component({
  selector: "item-rtl",
  imports: [
    Button,
    DirectionProvider,
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <div kuiItem variant="outline" [attr.dir]="dir()">
            <div kuiItemContent>
              <div kuiItemTitle>{{ t().basicItem }}</div>
              <p kuiItemDescription>{{ t().basicItemDesc }}</p>
            </div>
            <div kuiItemActions>
              <button kuiButton variant="outline" size="sm">
                {{ t().action }}
              </button>
            </div>
          </div>
          <a kuiItem variant="outline" size="sm" [attr.dir]="dir()" href="#">
            <div kuiItemMedia>
              <svg
                iconPlaceholder
                lucide="BadgeCheckIcon"
                tabler="IconRosetteDiscountCheck"
                hugeicons="CheckmarkBadgeIcon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleLine"
                [sx]="styles.iconPlaceholder"
              ></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle>{{ t().verifiedTitle }}</div>
            </div>
            <div kuiItemActions>
              <svg
                iconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                [sx]="styles.iconPlaceholder2"
              ></svg>
            </div>
          </a>
        </div>
      </div>
    </ng-container>
  `,
})
export default class ItemRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
