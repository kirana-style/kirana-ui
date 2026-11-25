<script setup lang="ts">
import type { ColorPickerInputChannel } from "@kirana-ui/vue"
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"
import { input } from "../../../../styles/input.styles"

defineOptions({ inheritAttrs: false })

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
const { channel } = defineProps<{ channel: ColorPickerInputChannel }>()
const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.ChannelInput
    data-slot="color-picker-input"
    :channel="channel"
    :aria-label="CHANNEL_LABELS[channel]"
    v-bind="attrs"
    :sx="[input, colorPicker.input, sx]"
  />
</template>
