import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { DARK_SCHEME, axes } from "../../../core/axes"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { AspectRatio } from "../ui/aspect-ratio"
import { DirectionProvider } from "../ui/direction"

const styles = {
  figure: css({
    width: "100%",
    maxWidth: containerSize.sm,
  }),
  aspectRatio: css({
    borderRadius: { "*": null, base: radius.lg },
    backgroundColor: theme.muted,
  }),
  img: css({
    borderRadius: radius.lg,
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: {
      base: "grayscale(100%)",
      [DARK_SCHEME]: {
        base: "grayscale(100%) brightness(0.2)",
        [axes.mode.light]: "grayscale(100%)",
      },
      [axes.mode.dark]: "grayscale(100%) brightness(0.2)",
    },
  }),
  figcaption: css({
    marginTop: space[2],
    textAlign: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      caption: "Beautiful landscape",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      caption: "منظر طبيعي جميل",
    },
  },
  he: {
    dir: "rtl",
    values: {
      caption: "נוף יפה",
    },
  },
}

@Component({
  selector: "aspect-ratio-rtl",
  imports: [AspectRatio, DirectionProvider, SxDirective],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <figure [sx]="styles.figure" [attr.dir]="dir()">
          <div kuiAspectRatio [ratio]="16 / 9" [sx]="styles.aspectRatio">
            <img
              src="https://avatar.vercel.sh/shadcn1"
              alt="Photo"
              [sx]="styles.img"
            />
          </div>
          <figcaption [sx]="styles.figcaption">{{ t().caption }}</figcaption>
        </figure>
      </div>
    </ng-container>
  `,
})
export default class AspectRatioRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
