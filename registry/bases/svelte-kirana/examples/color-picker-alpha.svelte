<script lang="ts">
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
  import { page } from "../../../styles/page.styles"
</script>

<div sx={page.example}>
  <ColorPicker alpha defaultValue="#7c3aedb3">
    <ColorPickerTrigger />
    <ColorPickerContent aria-label="Overlay colour">
      <ColorPickerArea />
      <ColorPickerSlider channel="hue" />
      <ColorPickerSlider channel="alpha" />
      <ColorPickerControls>
        <ColorPickerInput channel="hex" />
        <ColorPickerInput channel="alpha" />
        <ColorPickerFormatTrigger />
      </ColorPickerControls>
    </ColorPickerContent>
  </ColorPicker>
</div>
