import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { Example, ExampleWrapper } from "../components/example"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"

const styles = {
  flexItemsCenterGap6: css({
    display: "flex",
    alignItems: "center",
    gap: { "*": null, base: space[6] },
  }),
  h40: css({ height: { "*": null, base: space[40] } }),
  gridWFullGap3: css({
    display: "grid",
    width: { "*": null, base: "100%" },
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
  selector: "slider-example",
  imports: [Example, ExampleWrapper, Label, Slider, SxDirective],
  template: `
    <div kuiExampleWrapper>
      <!-- SliderBasic -->
      <div kuiExample title="Basic">
        <div kuiSlider [defaultValue]="50" [max]="100" [step]="1"></div>
      </div>
      <!-- SliderRange -->
      <div kuiExample title="Range">
        <div kuiSlider [defaultValue]="[25, 50]" [max]="100" [step]="5"></div>
      </div>
      <!-- SliderMultiple -->
      <div kuiExample title="Multiple Thumbs">
        <div
          kuiSlider
          [defaultValue]="[10, 20, 70]"
          [max]="100"
          [step]="10"
        ></div>
      </div>
      <!-- SliderVertical -->
      <div kuiExample title="Vertical">
        <div [sx]="styles.flexItemsCenterGap6">
          <div
            kuiSlider
            [defaultValue]="[50]"
            [max]="100"
            [step]="1"
            orientation="vertical"
            [sx]="styles.h40"
          ></div>
          <div
            kuiSlider
            [defaultValue]="[25]"
            [max]="100"
            [step]="1"
            orientation="vertical"
            [sx]="styles.h40"
          ></div>
        </div>
      </div>
      <!-- SliderControlled -->
      <div kuiExample title="Controlled">
        <div [sx]="styles.gridWFullGap3">
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
      <!-- SliderDisabled -->
      <div kuiExample title="Disabled">
        <div
          kuiSlider
          [defaultValue]="[50]"
          [max]="100"
          [step]="1"
          disabled
        ></div>
      </div>
    </div>
  `,
})
export default class SliderExample {
  protected readonly value = signal([0.3, 0.7])
  protected readonly styles = styles
}
