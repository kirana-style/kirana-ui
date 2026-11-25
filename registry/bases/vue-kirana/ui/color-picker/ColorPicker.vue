<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"
import { provide } from "vue"

import { colorPicker } from "../../../../styles/color-picker.styles"
import { Popover } from "../popover"
import { COLOR_PICKER_ALPHA } from "./context"
import ColorPickerContent from "./ColorPickerContent.vue"
import ColorPickerTrigger from "./ColorPickerTrigger.vue"

defineOptions({ inheritAttrs: false })

/**
 * The picker's root, with a Popover inside it: its trigger and content open the picker in a popup.
 * Given nothing in its slot, it draws both. Its parts written straight inside it draw the picker
 * inline. The colour binds with `v-model:value`, the popover's state with `v-model:open`.
 */
const props = withDefaults(
  defineProps<{
    alpha?: boolean
    thumbAlignment?: "center" | "edge"
    defaultOpen?: boolean
  }>(),
  { alpha: false, thumbAlignment: "edge", defaultOpen: undefined }
)
const open = defineModel<boolean | undefined>("open", { default: undefined })
const emit = defineEmits<{
  openChange: [open: boolean, details: unknown]
}>()
const { sx, attrs } = useSx()
provide(COLOR_PICKER_ALPHA, () => props.alpha)
</script>

<template>
  <ColorPicker.Root
    data-slot="color-picker"
    :alpha="alpha"
    :thumb-alignment="thumbAlignment"
    v-bind="attrs"
    :sx="[colorPicker.root, sx]"
  >
    <Popover
      :open="open"
      :default-open="defaultOpen"
      @open-change="
        (value: boolean, details: unknown) => (
          (open = value),
          emit('openChange', value, details)
        )
      "
    >
      <slot>
        <ColorPickerTrigger />
        <ColorPickerContent />
      </slot>
    </Popover>
  </ColorPicker.Root>
</template>
