<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"
import ColorPickerAreaThumb from "./ColorPickerAreaThumb.vue"

defineOptions({ inheritAttrs: false })

/** The two-dimensional field, saturation across and brightness up. It draws its thumb unless given a slot. */
const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.Area
    data-slot="color-picker-area"
    v-bind="attrs"
    :sx="[colorPicker.area, sx]"
  >
    <slot>
      <ColorPickerAreaThumb />
    </slot>
  </ColorPicker.Area>
</template>
