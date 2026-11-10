<script setup lang="ts">
import { Toggle } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { toggle, toggleScope } from "../../../../styles/toggle.styles"

defineOptions({ inheritAttrs: false })

type ToggleVariants = NonNullable<Parameters<typeof toggle>[0]>

// `default-pressed` and `v-model:pressed`, as on Ark UI: Reka's `default-value` and `model-value`.
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
const { sx, attrs } = useSx()
</script>

<template>
  <Toggle
    data-slot="toggle"
    :default-value="defaultPressed"
    v-bind="attrs"
    :model-value="pressed"
    :sx="[toggleScope.anchor, toggle({ variant, size }), sx]"
    @update:model-value="(value: boolean) => (pressed = value)"
  >
    <slot />
  </Toggle>
</template>
