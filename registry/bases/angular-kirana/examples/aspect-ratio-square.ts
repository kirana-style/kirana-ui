import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"
import { DARK_SCHEME, axes } from "../../../core/axes"
import { AspectRatio } from "../ui/aspect-ratio"

const styles = {
  wFullMaxW12RemRoundedLgB: css({
    width: "100%",
    maxWidth: "12rem",
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
  selector: "aspect-ratio-square",
  imports: [AspectRatio, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiAspectRatio
        [ratio]="1 / 1"
        [sx]="styles.wFullMaxW12RemRoundedLgB"
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
export default class AspectRatioSquare {
  protected readonly styles = styles
  protected readonly page = page
}
