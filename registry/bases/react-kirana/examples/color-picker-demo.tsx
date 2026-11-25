"use client"

import { ColorPicker } from "../ui/color-picker"
import { page } from "../../../styles/page.styles"

export default function ColorPickerDemo() {
  return (
    <div sx={page.example}>
      <ColorPicker defaultValue="#2563eb" />
    </div>
  )
}
