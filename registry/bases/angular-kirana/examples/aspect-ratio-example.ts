import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { DARK_SCHEME, axes } from "../../../core/axes"
import { Example, ExampleWrapper } from "../components/example"
import { AspectRatio } from "../ui/aspect-ratio"

const styles = {
  // A row of the example's card, which upstream's `*:[div:not([class*='w-'])]:w-full` widens.
  row: css({ width: "100%" }),
  maxW4Xl2XlMaxW4Xl: css({ maxWidth: containerSize["4xl"] }),
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  roundedLgBgMutedStyleLum: css({
    borderRadius: { base: radius.lg, [axes.style.luma]: radius["3xl"] },
    backgroundColor: theme.muted,
  }),
  hFullWFullRoundedLgObjec: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: { base: radius.lg, [axes.style.luma]: radius["3xl"] },
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
  itemsStart: css({ alignItems: "flex-start" }),
}

@Component({
  selector: "aspect-ratio-example",
  imports: [AspectRatio, Example, ExampleWrapper, SxDirective],
  template: `
    <div kuiExampleWrapper [sx]="styles.maxW4Xl2XlMaxW4Xl">
      <!-- AspectRatio16x9 -->
      <div kuiExample title="16:9" [sx]="styles.itemsCenterJustifyCenter">
        <div
          kuiAspectRatio
          [ratio]="16 / 9"
          [sx]="[styles.roundedLgBgMutedStyleLum, styles.row]"
        >
          <img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Photo"
            [sx]="styles.hFullWFullRoundedLgObjec"
          />
        </div>
      </div>
      <!-- AspectRatio21x9 -->
      <div kuiExample title="21:9" [sx]="styles.itemsCenterJustifyCenter">
        <div
          kuiAspectRatio
          [ratio]="21 / 9"
          [sx]="[styles.roundedLgBgMutedStyleLum, styles.row]"
        >
          <img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Photo"
            [sx]="styles.hFullWFullRoundedLgObjec"
          />
        </div>
      </div>
      <!-- AspectRatio1x1 -->
      <div kuiExample title="1:1" [sx]="styles.itemsStart">
        <div
          kuiAspectRatio
          [ratio]="1 / 1"
          [sx]="[styles.roundedLgBgMutedStyleLum, styles.row]"
        >
          <img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Photo"
            [sx]="styles.hFullWFullRoundedLgObjec"
          />
        </div>
      </div>
      <!-- AspectRatio9x16 -->
      <div kuiExample title="9:16" [sx]="styles.itemsCenterJustifyCenter">
        <div
          kuiAspectRatio
          [ratio]="9 / 16"
          [sx]="[styles.roundedLgBgMutedStyleLum, styles.row]"
        >
          <img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Photo"
            [sx]="styles.hFullWFullRoundedLgObjec"
          />
        </div>
      </div>
    </div>
  `,
})
export default class AspectRatioExample {
  protected readonly styles = styles
}
