<script setup lang="ts">
import { Checkbox, CheckboxIndicator } from "@ui-sdk/vue/checkbox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { checkbox } from "../../../../styles/checkbox.styles"

defineOptions({ inheritAttrs: false })

/**
 * ui-sdk's checkbox: its root is the box (a `span`, as Base UI's), its indicator there while checked
 * or indeterminate. `v-model:checked` and `default-checked`, as Ark UI's part takes them.
 */
const { defaultChecked } = defineProps<{
  /** Base UI's boolean. */
  defaultChecked?: boolean
}>()
const checked = defineModel<boolean | "indeterminate" | undefined>("checked", {
  default: undefined,
})
const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Checkbox"
    slot-name="checkbox"
    tag="span"
    :default-checked="defaultChecked"
    :checked="checked"
    @update:checked="(value: boolean | 'indeterminate') => (checked = value)"
    v-bind="attrs"
    :sx="[checkbox.root, sx]"
  >
    <UisdkPart
      :part="CheckboxIndicator"
      slot-name="checkbox-indicator"
      tag="span"
      :sx="checkbox.indicator"
    >
      <IconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      />
    </UisdkPart>
  </UisdkPart>
</template>
