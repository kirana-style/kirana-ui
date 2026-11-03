<script setup lang="ts">
import { SelectValueText, useSelectContext } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { select } from "../../../../styles/select.styles"
import { PLACEHOLDER } from "./placeholder"

defineOptions({ inheritAttrs: false })

const { placeholder } = defineProps<{ placeholder?: string }>()
const { sx, attrs } = useSx()
const fallback = inject(PLACEHOLDER, undefined)
const context = useSelectContext()
</script>

<template>
  <SelectValueText
    data-slot="select-value"
    :placeholder="placeholder ?? fallback"
    v-bind="attrs"
    :sx="[select.value, sx]"
  >
    <!-- What the trigger shows, as Base UI's render function: the value and its entries. Passed to
         Ark only when given, since Ark prints its slot in place of the value's text. -->
    <template v-if="$slots.default" #default>
      <slot :value="context.value" :items="context.selectedItems" />
    </template>
    <!-- A value with no entry to name it (items read from the markup arrive after it): the value
         itself, as Base UI's select shows it without items. -->
    <template
      v-else-if="!context.valueAsString && context.value.length > 0"
      #default
    >
      {{ context.value.join(", ") }}
    </template>
  </SelectValueText>
</template>
