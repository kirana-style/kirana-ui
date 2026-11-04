import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { containerSize } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { DARK_SCHEME, axes } from "../../../core/axes"
import { AspectRatio } from "../ui/aspect-ratio"

const styles = {
  wFullMaxWSmRoundedLgBgMu: css({
    width: "100%",
    maxWidth: containerSize.sm,
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  roundedLgObjectCoverGray: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: radius.lg,
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
}

@Component({
  selector: "aspect-ratio-demo",
  imports: [AspectRatio, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiAspectRatio
        [ratio]="16 / 9"
        [sx]="styles.wFullMaxWSmRoundedLgBgMu"
      >
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          [sx]="styles.roundedLgObjectCoverGray"
        />
      </div>
    </div>
  `,
})
export default class AspectRatioDemo {
  protected readonly styles = styles
  protected readonly page = page
}
