<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import { buttonLabel } from "../../../../styles/button.styles"
import { colorPicker } from "../../../../styles/color-picker.styles"
import { Button } from "../button"
import { PopoverTrigger } from "../popover"
import ColorPickerSwatch from "./ColorPickerSwatch.vue"

defineOptions({ inheritAttrs: false })

/** An outline Button that opens the picker: a swatch of the colour and its text, unless given a slot. */
const { sx, attrs } = useSx()
</script>

<template>
  <PopoverTrigger data-slot="color-picker-trigger" v-bind="attrs" as-child>
    <Button variant="outline" :sx="sx">
      <slot>
        <ColorPickerSwatch
          as="span"
          data-icon="inline-start"
          :sx="colorPicker.triggerSwatch"
        />
        <ColorPicker.ValueText
          data-slot="color-picker-value"
          :sx="[buttonLabel, colorPicker.valueText]"
        />
      </slot>
    </Button>
  </PopoverTrigger>
</template>
