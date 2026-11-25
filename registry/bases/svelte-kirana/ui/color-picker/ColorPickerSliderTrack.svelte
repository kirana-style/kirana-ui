<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"
  import { slider } from "../../../../styles/slider.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.ChannelSliderTrack data-slot="color-picker-slider-track" {...rest} sx={[slider.track, colorPicker.track, className as Sx]}>
  {@render children?.()}
</ColorPicker.ChannelSliderTrack>
