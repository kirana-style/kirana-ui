<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"
  import { slider } from "../../../../styles/slider.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.ChannelSliderThumb data-slot="color-picker-slider-thumb" {...rest} sx={[slider.thumb, colorPicker.thumb, className as Sx]} />
