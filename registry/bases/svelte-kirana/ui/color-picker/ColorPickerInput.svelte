<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { ColorPickerInputChannel } from "@kirana-ui/svelte"
  import { ColorPicker } from "@kirana-ui/svelte/color-picker"

  import { colorPicker } from "../../../../styles/color-picker.styles"
  import { input } from "../../../../styles/input.styles"

  const CHANNEL_LABELS: Record<ColorPickerInputChannel, string> = {
    hex: "Hex",
    red: "Red",
    green: "Green",
    blue: "Blue",
    hue: "Hue",
    saturation: "Saturation",
    lightness: "Lightness",
    alpha: "Alpha",
  }

  /** A channel's input, with the Input's chrome, named for its channel unless given a label. */
  let {
    channel,
    "aria-label": ariaLabel,
    class: className,
    ...rest
  }: {
    channel: ColorPickerInputChannel
    "aria-label"?: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<ColorPicker.ChannelInput data-slot="color-picker-input" {channel} aria-label={ariaLabel ?? CHANNEL_LABELS[channel]} {...rest} sx={[input, colorPicker.input, className as Sx]} />
