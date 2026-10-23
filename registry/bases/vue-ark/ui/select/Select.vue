<script setup lang="ts">
/**
 * Ark's select is built from a collection (`createListCollection`), passed as `collection`; each
 * `SelectItem` names its entry with `item`. A hidden native select carries the value in a form.
 */
import { SelectHiddenSelect, SelectRoot } from "@ark-ui/vue"
</script>

<template>
  <SelectRoot>
    <slot />
    <SelectHiddenSelect />
  </SelectRoot>
</template>
