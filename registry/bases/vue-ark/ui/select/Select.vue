<script setup lang="ts">
/**
 * Ark's select is built from a collection (`createListCollection`), passed as `collection`; each
 * `SelectItem` names its entry with `item`. A hidden native select carries the value in a form.
 */
import { SelectHiddenSelect, SelectRoot } from "@ark-ui/vue"
import type { ListCollection } from "@ark-ui/vue"
import type { PropType } from "vue"

// A runtime declaration, so a project's type checker sees Ark's required prop, while Vue's compiler
// resolves no imported type (it would through TypeScript's JavaScript API, which TypeScript 7 lacks).
defineProps({
  collection: {
    // `any`: a caller's collection is of its own items, which `unknown` would refuse.
    type: Object as PropType<ListCollection<any>>,
    required: true,
  },
})
</script>

<template>
  <SelectRoot :collection="collection">
    <slot />
    <SelectHiddenSelect />
  </SelectRoot>
</template>
