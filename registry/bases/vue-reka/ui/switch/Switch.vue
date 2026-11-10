<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { switchStyles } from "../../../../styles/switch.styles"

defineOptions({ inheritAttrs: false })

/**
 * Reka UI's switch: its root is the track (a `span`, as Base UI's, where Reka draws a button:
 * focusable and pressed with Space as Base UI's is), its thumb inside. `checked` and
 * `v-model:checked` are Vue's Ark UI parts' (Base UI's `checked`), passed to Reka UI's
 * `modelValue`.
 */
const { defaultChecked, size = "default" } = defineProps<{
  /** Base UI's boolean. */
  defaultChecked?: boolean
  size?: "sm" | "default"
}>()
const checked = defineModel<boolean | undefined>("checked", {
  default: undefined,
})
const { sx, attrs } = useSx()
const disabled = computed(
  () => attrs.value.disabled != null && attrs.value.disabled !== false
)
const press = (event: KeyboardEvent) =>
  (event.currentTarget as HTMLElement).click()
</script>

<template>
  <SwitchRoot
    as="span"
    data-slot="switch"
    :tabindex="disabled ? undefined : 0"
    :data-size="size"
    :default-value="defaultChecked"
    v-bind="attrs"
    :model-value="checked"
    :sx="[switchStyles.root, sx]"
    @keydown.space.prevent="press"
    @update:model-value="(value) => (checked = value)"
  >
    <SwitchThumb data-slot="switch-thumb" :sx="switchStyles.thumb" />
  </SwitchRoot>
</template>
