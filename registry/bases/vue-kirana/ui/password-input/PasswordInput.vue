<script setup lang="ts">
import type { ChangeDetails } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import PasswordInputInput from "./PasswordInputInput.vue"
import PasswordInputRoot from "./PasswordInputRoot.vue"
import PasswordInputToggle from "./PasswordInputToggle.vue"

defineOptions({ inheritAttrs: false })

/**
 * The whole field: the input and its show/hide button. Its attributes are the input's (`id`,
 * `name`, `placeholder`, `autocomplete` …); the root's own are its props (`v-model:visible`,
 * `default-visible`, `disabled`, and `toggle-labels`, `{ show, hide }`, what the show/hide button
 * is called) and events (`visible-change`, `value-change`); `sx` styles the
 * field, as the root draws it.
 */
const { defaultVisible, disabled, toggleLabels } = defineProps<{
  defaultVisible?: boolean
  disabled?: boolean
  toggleLabels?: { show?: string; hide?: string }
}>()
const visible = defineModel<boolean | undefined>("visible", {
  default: undefined,
})
const emit = defineEmits<{
  visibleChange: [value: boolean, details: ChangeDetails]
  valueChange: [value: string, details: ChangeDetails]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <PasswordInputRoot
    :visible="visible"
    :default-visible="defaultVisible"
    :disabled="disabled"
    :toggle-labels="toggleLabels"
    :sx="sx"
    @visible-change="
      (value: boolean, details: ChangeDetails) => (
        (visible = value),
        emit('visibleChange', value, details)
      )
    "
    @value-change="
      (value: string, details: ChangeDetails) =>
        emit('valueChange', value, details)
    "
  >
    <PasswordInputInput v-bind="attrs" />
    <PasswordInputToggle />
  </PasswordInputRoot>
</template>
