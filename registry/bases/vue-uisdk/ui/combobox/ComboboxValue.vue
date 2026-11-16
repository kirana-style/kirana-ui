<script setup lang="ts">
import { ComboboxValue } from "@ui-sdk/vue/combobox"

defineSlots<{ default?: (values: any[]) => unknown }>()

/** The value as a list: none, one, or a `multiple` combobox's. */
const list = (value: unknown): unknown[] =>
  value === undefined || value === null
    ? []
    : Array.isArray(value)
      ? value
      : [value]
</script>

<template>
  <!-- The selection, through the slot as Base UI's value calls its children; else its labels. -->
  <ComboboxValue v-slot="{ value, state }">
    <slot v-bind="list(value)">{{ state.label }}</slot>
  </ComboboxValue>
</template>
