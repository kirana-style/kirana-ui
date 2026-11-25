<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.AreaThumb
    data-slot="color-picker-area-thumb"
    aria-label="Colour"
    v-bind="attrs"
    :sx="[colorPicker.areaThumb, sx]"
  />
</template>
