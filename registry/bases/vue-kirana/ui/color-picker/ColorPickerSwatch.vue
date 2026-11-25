<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"

defineOptions({ inheritAttrs: false })

/** The colour now, over a checkerboard. */
const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.Swatch
    data-slot="color-picker-swatch"
    v-bind="attrs"
    :sx="[colorPicker.swatch, sx]"
  >
    <slot />
  </ColorPicker.Swatch>
</template>
