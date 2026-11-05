import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item"
import { Spinner } from "../ui/spinner"

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

@Component({
  selector: "spinner-rtl",
  imports: [
    DirectionProvider,
    Item,
    ItemContent,
    ItemMedia,
    ItemTitle,
    Spinner,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <div kuiItem variant="muted" [attr.dir]="dir()">
            <div kuiItemMedia>
              <svg kuiSpinner></svg>
            </div>
            <div kuiItemContent>
              <div kuiItemTitle [sx]="styles.itemTitle">{{ t().title }}</div>
            </div>
            <div kuiItemContent [sx]="styles.itemContent">
              <span [sx]="styles.span">{{ t().amount }}</span>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class SpinnerRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
