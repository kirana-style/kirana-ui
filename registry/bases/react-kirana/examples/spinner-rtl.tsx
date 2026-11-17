import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item"
import { Spinner } from "../ui/spinner"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: space[4],
    // `[--radius:1rem]`: the corners derived from a 1rem base inside it, as shadcn/ui's theme
    // derives them from `--radius`.
    [radius.sm]: "calc(1rem * 0.6)",
    [radius.md]: "calc(1rem * 0.8)",
    [radius.lg]: "1rem",
    [radius.xl]: "calc(1rem * 1.4)",
    [radius["2xl"]]: "calc(1rem * 1.8)",
    [radius["3xl"]]: "calc(1rem * 2.2)",
    [radius["4xl"]]: "calc(1rem * 2.6)",
  }),
  itemTitle: css({
    WebkitLineClamp: { "*": null, base: "1" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
  }),
  itemContent: css({
    flex: "none",
    justifyContent: { "*": null, base: "flex-end" },
  }),
  span: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontVariantNumeric: "tabular-nums",
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "Processing payment...",
      amount: "$100.00",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "جاري معالجة الدفع...",
      amount: "١٠٠.٠٠ دولار",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "מעבד תשלום...",
      amount: "$100.00",
    },
  },
}

export default function SpinnerRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div sx={styles.div} dir={dir}>
        <Item variant="muted" dir={dir}>
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle sx={styles.itemTitle}>{t.title}</ItemTitle>
          </ItemContent>
          <ItemContent sx={styles.itemContent}>
            <span sx={styles.span}>{t.amount}</span>
          </ItemContent>
        </Item>
      </div>
    </div>
  )
}
