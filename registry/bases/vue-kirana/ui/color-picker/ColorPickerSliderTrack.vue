<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"
import { slider } from "../../../../styles/slider.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.ChannelSliderTrack
    data-slot="color-picker-slider-track"
    v-bind="attrs"
    :sx="[slider.track, colorPicker.track, sx]"
  >
    <slot />
  </ColorPicker.ChannelSliderTrack>
</template>
