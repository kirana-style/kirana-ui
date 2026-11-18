<script setup lang="ts">
import { Toggle } from "@kirana-ui/vue/toggle"
import { useSx } from "@kirana-style/core/vue"

import { toggle, toggleScope } from "../../../../styles/toggle.styles"

defineOptions({ inheritAttrs: false })

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

/** Kirana UI's toggle, with Vue's Ark UI parts' `pressed`, `v-model:pressed` and `pressed-change`. */
const {
  variant = "default",
  size = "default",
  defaultPressed,
} = defineProps<{
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  defaultPressed?: boolean
}>()
const pressed = defineModel<boolean | undefined>("pressed", {
  default: undefined,
})
const emit = defineEmits<{ pressedChange: [details: { pressed: boolean }] }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Toggle
    data-slot="toggle"
    :default-pressed="defaultPressed"
    v-bind="attrs"
    :pressed="pressed"
    :sx="[toggleScope.anchor, toggle({ variant, size }), sx]"
    @pressed-change="
      (value: boolean) => (
        (pressed = value),
        emit('pressedChange', { pressed: value })
      )
    "
  >
    <slot />
  </Toggle>
</template>
