import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import { HoverCard, HoverCardTrigger } from "../ui/hover-card"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "grid",
    gap: space[4],
  }),
  div2: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
  hoverCard: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[64] },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[1] },
  }),
  div3: css({
    fontWeight: fontWeight.semibold,
  }),
  div4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div5: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
  hoverCard2: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[64] },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[1] },
  }),
  div6: css({
    fontWeight: fontWeight.semibold,
  }),
  div7: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      name: "Wireless Headphones",
      price: "$99.99",
      start: "Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      end: "End",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      name: "سماعات لاسلكية",
      price: "٩٩.٩٩ $",
      start: "بداية السطر",
      left: "يسار",
      top: "أعلى",
      bottom: "أسفل",
      right: "يمين",
      end: "نهاية السطر",
    },
  },
  he: {
    dir: "rtl",
    values: {
      name: "אוזניות אלחוטיות",
      price: "99.99 $",
      start: "תחילת השורה",
      left: "שמאל",
      top: "למעלה",
      bottom: "למטה",
      right: "ימין",
      end: "סוף השורה",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const
const logicalPlacements = ["start", "end"] as const

export default function HoverCardRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div sx={styles.div2}>
          {physicalSides.map((side) => (
            <HoverCardTrigger key={side} delay={10} closeDelay={100}>
              <Button variant="outline">{t[side]}</Button>
              <HoverCard placement={side} dir={dir} sx={styles.hoverCard}>
                <div sx={styles.div3}>{t.name}</div>
                <div sx={styles.div4}>{t.price}</div>
              </HoverCard>
            </HoverCardTrigger>
          ))}
        </div>
        <div sx={styles.div5}>
          {logicalPlacements.map((placement) => (
            <HoverCardTrigger key={placement} delay={10} closeDelay={100}>
              <Button variant="outline">{t[placement]}</Button>
              <HoverCard placement={placement} dir={dir} sx={styles.hoverCard2}>
                <div sx={styles.div6}>{t.name}</div>
                <div sx={styles.div7}>{t.price}</div>
              </HoverCard>
            </HoverCardTrigger>
          ))}
        </div>
      </div>
    </div>
  )
}
