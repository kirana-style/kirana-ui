/** Color Picker's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Component } from "@angular/core"

import { Example, ExampleWrapper } from "../components/example"
import ColorPickerDemo from "./color-picker-demo"
import ColorPickerAlpha from "./color-picker-alpha"
import ColorPickerForm from "./color-picker-form"
import ColorPickerInline from "./color-picker-inline"
import ColorPickerSwatches from "./color-picker-swatches"

@Component({
  selector: "color-picker-example",
  imports: [
    Example,
    ExampleWrapper,
    ColorPickerDemo,
    ColorPickerAlpha,
    ColorPickerForm,
    ColorPickerInline,
    ColorPickerSwatches,
  ],
  template: `
    <div kuiExampleWrapper>
      <div kuiExample title="Default" data-showcase>
        <color-picker-demo />
      </div>
      <div kuiExample title="Alpha" data-showcase>
        <color-picker-alpha />
      </div>
      <div kuiExample title="Form" data-showcase>
        <color-picker-form />
      </div>
      <div kuiExample title="Inline" data-showcase>
        <color-picker-inline />
      </div>
      <div kuiExample title="Swatches" data-showcase>
        <color-picker-swatches />
      </div>
    </div>
  `,
})
export default class ColorPickerExample {}
