import { css } from "@kirana-style/core"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { scrollFadeX } from "../../../styles/scroll-fade.styles"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      design: "Design",
      engineering: "Engineering",
      marketing: "Marketing",
      product: "Product",
      research: "Research",
      sales: "Sales",
      support: "Support",
      operations: "Operations",
      finance: "Finance",
      legal: "Legal",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      design: "تصميم",
      engineering: "هندسة",
      marketing: "تسويق",
      product: "منتج",
      research: "أبحاث",
      sales: "مبيعات",
      support: "دعم",
      operations: "عمليات",
      finance: "مالية",
      legal: "قانوني",
    },
  },
  he: {
    dir: "rtl",
    values: {
      design: "עיצוב",
      engineering: "הנדסה",
      marketing: "שיווק",
      product: "מוצר",
      research: "מחקר",
      sales: "מכירות",
      support: "תמיכה",
      operations: "תפעול",
      finance: "כספים",
      legal: "משפטי",
    },
  },
}

const styles = {
  frame: css({
    marginInline: "auto",
    width: "100%",
    maxWidth: containerSize.xs,
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  scroller: css({ scrollbarWidth: "none", overflowX: "auto" }),
  row: css({
    display: "flex",
    width: "max-content",
    gap: space["1.5"],
    padding: space["1.5"],
  }),
  tag: css({
    flexShrink: 0,
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    paddingInline: space[3],
    paddingBlock: space["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export default function ScrollFadeRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.frame} dir={dir}>
        <div sx={[scrollFadeX, styles.scroller]}>
          <div sx={styles.row}>
            {Object.values(t).map((tag) => (
              <div key={tag} sx={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
