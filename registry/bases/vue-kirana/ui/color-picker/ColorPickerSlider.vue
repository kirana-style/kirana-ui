<script setup lang="ts">
import type { ColorPickerSliderChannel } from "@kirana-ui/vue"
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"
import ColorPickerSliderThumb from "./ColorPickerSliderThumb.vue"
import ColorPickerSliderTrack from "./ColorPickerSliderTrack.vue"

defineOptions({ inheritAttrs: false })

/** A channel's slider, the hue or the alpha. It draws its track and thumb unless given a slot. */
const { channel } = defineProps<{ channel: ColorPickerSliderChannel }>()
const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.ChannelSlider
    data-slot="color-picker-slider"
    :channel="channel"
    v-bind="attrs"
    :sx="[colorPicker.slider, sx]"
  >
    <slot>
      <ColorPickerSliderTrack>
        <ColorPickerSliderThumb
          :aria-label="channel === 'alpha' ? 'Alpha' : 'Hue'"
        />
      </ColorPickerSliderTrack>
    </slot>
  </ColorPicker.ChannelSlider>
</template>
