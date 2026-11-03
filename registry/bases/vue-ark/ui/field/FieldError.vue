<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"
import { computed, useSlots } from "vue"

import { field } from "../../../../styles/field.styles"

defineOptions({ inheritAttrs: false })

const { errors } = defineProps<{
  errors?: Array<{ message?: string } | undefined>
}>()
const { sx, attrs } = useSx()
const slots = useSlots()

/** The errors' messages, each once. */
const messages = computed(() => [
  ...new Set(
    (errors ?? []).flatMap((error) => (error?.message ? [error.message] : []))
  ),
])
</script>

<template>
  <div
    v-if="slots.default || messages.length"
    role="alert"
    data-slot="field-error"
    v-bind="attrs"
    :sx="[field.error, sx]"
  >
    <slot>
      <template v-if="messages.length === 1">{{ messages[0] }}</template>
      <ul v-else :sx="field.errorList">
        <li v-for="message in messages" :key="message">{{ message }}</li>
      </ul>
    </slot>
  </div>
</template>
