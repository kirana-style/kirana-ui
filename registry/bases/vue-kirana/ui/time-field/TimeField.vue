<script setup lang="ts">
import { TimeField } from "@kirana-ui/vue/time-field"
import { useSx } from "@kirana-style/core/vue"

import { input } from "../../../../styles/input.styles"
import { timeField } from "../../../../styles/time-field.styles"
import TimeFieldInput from "./TimeFieldInput.vue"
import TimeFieldSegments from "./TimeFieldSegments.vue"

defineOptions({ inheritAttrs: false })

/**
 * The field, drawn as an Input; it draws its segments and hidden input unless given a slot. Its
 * props are the primitive root's (`v-model:value`, `default-value`, `locale`, `hour-cycle` …).
 */
const { sx, attrs } = useSx()
</script>

<template>
  <TimeField.Root
    data-slot="time-field"
    v-bind="attrs"
    :sx="[input, timeField.root, sx]"
  >
    <slot>
      <TimeFieldSegments />
      <TimeFieldInput />
    </slot>
  </TimeField.Root>
</template>
