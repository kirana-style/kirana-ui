<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"

defineOptions({ inheritAttrs: false })

/** The colour written in its format. */
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Given no slot, the primitive writes the colour. -->
  <ColorPicker.ValueText
    v-if="$slots.default"
    data-slot="color-picker-value"
    v-bind="attrs"
    :sx="[colorPicker.valueText, sx]"
  >
    <slot />
  </ColorPicker.ValueText>
  <ColorPicker.ValueText
    v-else
    data-slot="color-picker-value"
    v-bind="attrs"
    :sx="[colorPicker.valueText, sx]"
  />
</template>
