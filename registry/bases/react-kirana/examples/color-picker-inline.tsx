"use client"

import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerControls,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
} from "../ui/color-picker"
import { page } from "../../../styles/page.styles"

export default function ColorPickerInline() {
  return (
    <div sx={page.example}>
      <ColorPicker defaultValue="#16a34a">
        <ColorPickerArea />
        <ColorPickerSlider channel="hue" />
        <ColorPickerControls>
          <ColorPickerSwatch />
          <ColorPickerInput channel="hex" />
        </ColorPickerControls>
      </ColorPicker>
    </div>
  )
}
