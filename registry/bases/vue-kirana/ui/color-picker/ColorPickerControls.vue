<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"

defineOptions({ inheritAttrs: false })

/** A row of the picker's controls: a swatch, an input, an icon button. */
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="color-picker-controls"
    v-bind="attrs"
    :sx="[colorPicker.controls, sx]"
  >
    <slot />
  </div>
</template>
