import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerControls,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
} from "../ui/color-picker"

@Component({
  selector: "color-picker-inline",
  imports: [
    ColorPicker,
    ColorPickerArea,
    ColorPickerControls,
    ColorPickerInput,
    ColorPickerSlider,
    ColorPickerSwatch,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiColorPicker [defaultValue]="'#16a34a'">
        <div kuiColorPickerArea></div>
        <div kuiColorPickerSlider [channel]="'hue'"></div>
        <div kuiColorPickerControls>
          <div kuiColorPickerSwatch></div>
          <input kuiColorPickerInput [channel]="'hex'" />
        </div>
      </div>
    </div>
  `,
})
export default class ColorPickerInline {
  protected readonly page = page
}
