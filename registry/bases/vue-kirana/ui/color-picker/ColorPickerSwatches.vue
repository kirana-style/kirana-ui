<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { colorPicker } from "../../../../styles/color-picker.styles"
import ColorPickerSwatchTrigger from "./ColorPickerSwatchTrigger.vue"

defineOptions({ inheritAttrs: false })

/** The presets: a trigger for each of `values`, unless given a slot. */
const { values } = defineProps<{ values?: readonly string[] }>()
const { sx, attrs } = useSx()
</script>

<template>
  <div
    data-slot="color-picker-swatches"
    v-bind="attrs"
    :sx="[colorPicker.swatches, sx]"
  >
    <slot>
      <ColorPickerSwatchTrigger
        v-for="value in values"
        :key="value"
        :value="value"
      />
    </slot>
  </div>
</template>
