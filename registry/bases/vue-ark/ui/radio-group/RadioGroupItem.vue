<script setup lang="ts">
import {
  RadioGroupItem,
  RadioGroupItemContext,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { radioGroup } from "../../../../styles/radio-group.styles"

defineOptions({ inheritAttrs: false })

// Ark's required `value` is declared here and passed on. `id` names the hidden input, so a
// `<Label for>` beside the item reaches it, as React's `htmlFor`.
const { value, id } = defineProps<{ value: string; id?: string }>()
const { sx, attrs } = useSx()
// `aria-invalid`, as upstream's demos mark an invalid radio: Ark marks only a whole group invalid,
// so the item marks its own radio as Ark would.
const invalid = computed(() =>
  [true, "true", ""].includes(attrs.value["aria-invalid"] as never)
)
</script>

<template>
  <RadioGroupItem :value="value" v-bind="attrs" :sx="radioGroup.itemWrapper">
    <!-- A span, as Base UI's radio. -->
    <RadioGroupItemControl as-child>
      <span
        data-slot="radio-group-item"
        :data-invalid="invalid ? '' : undefined"
        :sx="[radioGroup.item, sx]"
      >
        <RadioGroupItemContext v-slot="item">
          <span
            v-if="item.checked"
            data-slot="radio-group-indicator"
            :sx="radioGroup.indicator"
          >
            <span :sx="radioGroup.dot" />
          </span>
        </RadioGroupItemContext>
      </span>
    </RadioGroupItemControl>
    <RadioGroupItemHiddenInput :id="id" />
  </RadioGroupItem>
</template>
