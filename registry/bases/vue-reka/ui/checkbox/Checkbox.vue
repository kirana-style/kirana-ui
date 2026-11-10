<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { checkbox } from "../../../../styles/checkbox.styles"

defineOptions({ inheritAttrs: false })

/**
 * Reka UI's checkbox: its root is the box (a `span`, as Base UI's root is the box), its indicator
 * there only while checked or indeterminate. `checked` and `v-model:checked` are Vue's Ark UI
 * parts' (Base UI's `checked`), passed to Reka UI's `modelValue`.
 */
const { defaultChecked } = defineProps<{
  /** Base UI's boolean. */
  defaultChecked?: boolean
}>()
const checked = defineModel<boolean | "indeterminate" | undefined>("checked", {
  default: undefined,
})
// `checked-change`, as Ark UI's: the new state, for a caller that keeps its own.
const emit = defineEmits<{
  checkedChange: [details: { checked: boolean | "indeterminate" }]
}>()
const { sx, attrs } = useSx()
// A `span`, as Base UI's box, where Reka draws a button: focusable and pressed with Space as Base
// UI's is.
const disabled = computed(
  () => attrs.value.disabled != null && attrs.value.disabled !== false
)
const press = (event: KeyboardEvent) =>
  (event.currentTarget as HTMLElement).click()
</script>

<template>
  <CheckboxRoot
    as="span"
    data-slot="checkbox"
    :tabindex="disabled ? undefined : 0"
    :default-value="defaultChecked"
    v-bind="attrs"
    :model-value="checked"
    :sx="[checkbox.root, sx]"
    @keydown.space.prevent="press"
    @update:model-value="
      (value) => ((checked = value), emit('checkedChange', { checked: value }))
    "
  >
    <CheckboxIndicator as-child>
      <span data-slot="checkbox-indicator" :sx="checkbox.indicator">
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </span>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
