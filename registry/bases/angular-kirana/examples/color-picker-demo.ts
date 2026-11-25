import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { ColorPicker } from "../ui/color-picker"

@Component({
  selector: "color-picker-demo",
  imports: [ColorPicker, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiColorPicker [defaultValue]="'#2563eb'"></div>
    </div>
  `,
})
export default class ColorPickerDemo {
  protected readonly page = page
}
