import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControls,
  ColorPickerFormatTrigger,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerTrigger,
} from "../ui/color-picker"

@Component({
  selector: "color-picker-alpha",
  imports: [
    ColorPicker,
    ColorPickerArea,
    ColorPickerContent,
    ColorPickerControls,
    ColorPickerFormatTrigger,
    ColorPickerInput,
    ColorPickerSlider,
    ColorPickerTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiColorPicker [alpha]="true" [defaultValue]="'#7c3aedb3'">
        <button kuiColorPickerTrigger></button>
        <div kuiColorPickerContent aria-label="Overlay colour">
          <div kuiColorPickerArea></div>
          <div kuiColorPickerSlider [channel]="'hue'"></div>
          <div kuiColorPickerSlider [channel]="'alpha'"></div>
          <div kuiColorPickerControls>
            <input kuiColorPickerInput [channel]="'hex'" />
            <input kuiColorPickerInput [channel]="'alpha'" />
            <button kuiColorPickerFormatTrigger></button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ColorPickerAlpha {
  protected readonly page = page
}
