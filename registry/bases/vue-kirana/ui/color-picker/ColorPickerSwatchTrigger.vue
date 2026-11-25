<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"

defineOptions({ inheritAttrs: false })

/** A preset colour: pressed, the colour is this one. Named by its value unless given a label. */
const { value } = defineProps<{ value: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.SwatchTrigger
    data-slot="color-picker-swatch-trigger"
    :value="value"
    :aria-label="value"
    v-bind="attrs"
    :sx="[colorPicker.swatchTrigger, sx]"
  >
    <slot />
  </ColorPicker.SwatchTrigger>
</template>
