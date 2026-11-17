import { IconPlaceholder } from "../../../icons/icon-placeholder"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { css, props as styleProps } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function ItemRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div} dir={dir}>
        <Item variant="outline" dir={dir}>
          <ItemContent>
            <ItemTitle>{t.basicItem}</ItemTitle>
            <ItemDescription>{t.basicItemDesc}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              {t.action}
            </Button>
          </ItemActions>
        </Item>
        <Item variant="outline" size="sm" render={<a href="#" />} dir={dir}>
          <ItemMedia>
            <IconPlaceholder
              lucide="BadgeCheckIcon"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadgeIcon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              {...styleProps(styles.iconPlaceholder)}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{t.verifiedTitle}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <IconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              {...styleProps(styles.iconPlaceholder2)}
            />
          </ItemActions>
        </Item>
      </div>
    </div>
  )
}
