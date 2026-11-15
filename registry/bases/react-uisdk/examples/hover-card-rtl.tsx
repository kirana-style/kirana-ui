import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
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
  hoverCardContent: css({
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
  hoverCardContent2: css({
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
      trigger: "Wireless Headphones",
      name: "Wireless Headphones",
      price: "$99.99",
      "inline-start": "Inline Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      "inline-end": "Inline End",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      trigger: "سماعات لاسلكية",
      name: "سماعات لاسلكية",
      price: "٩٩.٩٩ $",
      "inline-start": "بداية السطر",
      left: "يسار",
      top: "أعلى",
      bottom: "أسفل",
      right: "يمين",
      "inline-end": "نهاية السطر",
    },
  },
  he: {
    dir: "rtl",
    values: {
      trigger: "אוזניות אלחוטיות",
      name: "אוזניות אלחוטיות",
      price: "99.99 $",
      "inline-start": "תחילת השורה",
      left: "שמאל",
      top: "למעלה",
      bottom: "למטה",
      right: "ימין",
      "inline-end": "סוף השורה",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const
const logicalSides = ["inline-start", "inline-end"] as const

export default function HoverCardRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div sx={styles.div2}>
          {physicalSides.map((side) => (
            <HoverCard key={side}>
              <HoverCardTrigger
                delay={10}
                closeDelay={100}
                render={<Button variant="outline" />}
              >
                {t[side]}
              </HoverCardTrigger>
              <HoverCardContent
                side={side}
                sx={styles.hoverCardContent}
                dir={dir}
              >
                <div sx={styles.div3}>{t.name}</div>
                <div sx={styles.div4}>{t.price}</div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        <div sx={styles.div5}>
          {logicalSides.map((side) => (
            <HoverCard key={side}>
              <HoverCardTrigger
                delay={10}
                closeDelay={100}
                render={<Button variant="outline" />}
              >
                {t[side]}
              </HoverCardTrigger>
              <HoverCardContent
                side={side}
                sx={styles.hoverCardContent2}
                dir={dir}
              >
                <div sx={styles.div6}>{t.name}</div>
                <div sx={styles.div7}>{t.price}</div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  )
}
