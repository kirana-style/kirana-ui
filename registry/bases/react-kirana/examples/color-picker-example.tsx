/** Color Picker's demos on one page, each in its frame; `data-showcase` lets a demo take its own size. */
import { Example, ExampleWrapper } from "../components/example"
import ColorPickerDemo from "./color-picker-demo"
import ColorPickerAlpha from "./color-picker-alpha"
import ColorPickerForm from "./color-picker-form"
import ColorPickerInline from "./color-picker-inline"
import ColorPickerSwatches from "./color-picker-swatches"

export default function ColorPickerExample() {
  return (
    <ExampleWrapper>
      <Example title="Default" data-showcase>
        <ColorPickerDemo />
      </Example>
      <Example title="Alpha" data-showcase>
        <ColorPickerAlpha />
      </Example>
      <Example title="Form" data-showcase>
        <ColorPickerForm />
      </Example>
      <Example title="Inline" data-showcase>
        <ColorPickerInline />
      </Example>
      <Example title="Swatches" data-showcase>
        <ColorPickerSwatches />
      </Example>
    </ExampleWrapper>
  )
}
