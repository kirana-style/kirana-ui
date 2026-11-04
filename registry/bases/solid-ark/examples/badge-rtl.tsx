import { DirectionProvider } from "../ui/direction"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { useTranslation } from "../components/language-selector"
import { Badge } from "../ui/badge"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function BadgeRtl() {
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <div sx={styles.div} dir={translation.dir}>
          <Badge>{translation.t.badge}</Badge>
          <Badge variant="secondary">{translation.t.secondary}</Badge>
          <Badge variant="destructive">{translation.t.destructive}</Badge>
          <Badge variant="outline">{translation.t.outline}</Badge>
          <Badge variant="secondary">
            <IconPlaceholder
              lucide="BadgeCheck"
              tabler="IconRosetteDiscountCheck"
              hugeicons="CheckmarkBadge02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              data-icon="inline-start"
            />{" "}
            {translation.t.verified}
          </Badge>
          <Badge variant="outline">
            {translation.t.bookmark}{" "}
            <IconPlaceholder
              lucide="BookmarkIcon"
              tabler="IconBookmark"
              hugeicons="BookmarkIcon"
              phosphor="BookmarkIcon"
              remixicon="RiBookmarkLine"
              data-icon="inline-end"
            />
          </Badge>
        </div>
      </div>
    </DirectionProvider>
  )
}
