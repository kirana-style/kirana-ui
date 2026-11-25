<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"
import { slider } from "../../../../styles/slider.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.ChannelSliderThumb
    data-slot="color-picker-slider-thumb"
    v-bind="attrs"
    :sx="[slider.thumb, colorPicker.thumb, sx]"
  />
</template>
