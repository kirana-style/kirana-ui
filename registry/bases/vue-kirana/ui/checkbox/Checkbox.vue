<script setup lang="ts">
import { Checkbox } from "@kirana-ui/vue/checkbox"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { checkbox } from "../../../../styles/checkbox.styles"

defineOptions({ inheritAttrs: false })

/**
 * Kirana UI's checkbox, with Vue's Ark UI parts' props: `checked` and `v-model:checked` (`true`,
 * `false` or `"indeterminate"`), `default-checked`, and `checked-change` given `{ checked }`.
 */
const { defaultChecked } = defineProps<{ defaultChecked?: boolean }>()
const checked = defineModel<boolean | "indeterminate" | undefined>("checked", {
  default: undefined,
})
const emit = defineEmits<{
  checkedChange: [details: { checked: boolean | "indeterminate" }]
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Checkbox.Root
    data-slot="checkbox"
    :default-checked="defaultChecked"
    v-bind="attrs"
    :checked="checked === undefined ? undefined : checked === true"
    :indeterminate="checked === 'indeterminate'"
    :sx="[checkbox.root, sx]"
    @checked-change="
      (value: boolean) => (
        (checked = value),
        emit('checkedChange', { checked: value })
      )
    "
  >
    <Checkbox.Indicator as-child>
      <span data-slot="checkbox-indicator" :sx="checkbox.indicator">
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
        />
      </span>
    </Checkbox.Indicator>
  </Checkbox.Root>
</template>
