<script setup lang="ts">
import { useCombobox } from "./context"

defineSlots<{ default?: (values: any[]) => unknown }>()
const { selected, label } = useCombobox()
</script>

<template>
  <!-- The selection, through the slot as Base UI's value calls its children; else its labels.
       Kirana UI's combobox has no Value part: the root mirrors what is chosen. -->
  <slot v-bind="selected">{{ selected.map(label).join(", ") }}</slot>
</template>
