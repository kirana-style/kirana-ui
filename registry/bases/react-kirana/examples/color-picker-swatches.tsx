"use client"

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
import { page } from "../../../styles/page.styles"

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

export default function ColorPickerSwatchesDemo() {
  return (
    <div sx={page.example}>
      <ColorPicker defaultValue="#3b82f6">
        <ColorPickerTrigger />
        <ColorPickerContent aria-label="Label colour">
          <ColorPickerArea />
          <ColorPickerSlider channel="hue" />
          <ColorPickerControls>
            <ColorPickerInput channel="hex" />
          </ColorPickerControls>
          <ColorPickerSwatches values={PRESETS} />
        </ColorPickerContent>
      </ColorPicker>
    </div>
  )
}
