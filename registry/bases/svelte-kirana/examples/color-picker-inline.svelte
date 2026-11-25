<script lang="ts">
  import {
    ColorPicker,
    ColorPickerArea,
    ColorPickerControls,
    ColorPickerInput,
    ColorPickerSlider,
    ColorPickerSwatch,
  } from "../ui/color-picker"
  import { page } from "../../../styles/page.styles"
</script>

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
