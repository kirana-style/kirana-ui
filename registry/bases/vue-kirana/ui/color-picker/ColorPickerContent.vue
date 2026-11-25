<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { PopoverContent } from "../popover"
import { COLOR_PICKER_ALPHA } from "./context"
import ColorPickerArea from "./ColorPickerArea.vue"
import ColorPickerControls from "./ColorPickerControls.vue"
import ColorPickerEyeDropper from "./ColorPickerEyeDropper.vue"
import ColorPickerInput from "./ColorPickerInput.vue"
import ColorPickerSlider from "./ColorPickerSlider.vue"

defineOptions({ inheritAttrs: false })

/**
 * The popover's popup, the picker's parts laid out in it. Given nothing in its slot, it draws the
 * area, the hue slider (and the alpha one when the picker chooses an alpha), and a row with the hex
 * input and the eye dropper.
 */
const { sx, attrs } = useSx()
const alpha = inject(COLOR_PICKER_ALPHA, () => false)
</script>

<template>
  <PopoverContent
    data-slot="color-picker-content"
    aria-label="Colour picker"
    v-bind="attrs"
    :sx="sx"
  >
    <slot>
      <ColorPickerArea />
      <ColorPickerSlider channel="hue" />
      <ColorPickerSlider v-if="alpha()" channel="alpha" />
      <ColorPickerControls>
        <ColorPickerInput channel="hex" />
        <ColorPickerEyeDropper />
      </ColorPickerControls>
    </slot>
  </PopoverContent>
</template>
