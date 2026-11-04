import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"

const styles = {
  mxAutoGridWFullMaxWXsGap: css({
    marginInline: "auto",
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
    gap: { "*": null, base: space[3] },
  }),
  flexItemsCenterJustifyBe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: { "*": null, base: space[2] },
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "slider-controlled",
  imports: [Label, Slider, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.mxAutoGridWFullMaxWXsGap">
        <div [sx]="styles.flexItemsCenterJustifyBe">
          <label kuiLabel for="slider-demo-temperature">Temperature</label>
          <span [sx]="styles.textSmTextMutedForegroun">{{
            value().join(", ")
          }}</span>
        </div>
        <div
          kuiSlider
          id="slider-demo-temperature"
          [(value)]="value"
          [min]="0"
          [max]="1"
          [step]="0.1"
        ></div>
      </div>
    </div>
  `,
})
export default class SliderControlled {
  protected readonly value = signal([0.3, 0.7])
  protected readonly styles = styles
  protected readonly page = page
}
