import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControls,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatches,
  ColorPickerTrigger,
} from "../ui/color-picker"

const PRESETS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#737373",
  "#171717",
]

@Component({
  selector: "color-picker-swatches",
  imports: [
    ColorPicker,
    ColorPickerArea,
    ColorPickerContent,
    ColorPickerControls,
    ColorPickerInput,
    ColorPickerSlider,
    ColorPickerSwatches,
    ColorPickerTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiColorPicker [defaultValue]="'#3b82f6'">
        <button kuiColorPickerTrigger></button>
        <div kuiColorPickerContent aria-label="Label colour">
          <div kuiColorPickerArea></div>
          <div kuiColorPickerSlider [channel]="'hue'"></div>
          <div kuiColorPickerControls>
            <input kuiColorPickerInput [channel]="'hex'" />
          </div>
          <div kuiColorPickerSwatches [values]="presets"></div>
        </div>
      </div>
    </div>
  `,
})
export default class ColorPickerSwatchesDemo {
  protected readonly page = page
  protected readonly presets = PRESETS
}
