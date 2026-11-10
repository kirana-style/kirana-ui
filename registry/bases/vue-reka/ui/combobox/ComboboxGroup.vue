<script setup lang="ts">
import { ComboboxGroup } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, provide } from "vue"

import { COMBOBOX_GROUP, useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

const { items } = defineProps<{ items?: readonly unknown[] }>()
const { sx, attrs } = useSx()
const { filter } = useCombobox()
provide(
  COMBOBOX_GROUP,
  computed(() => filter(items ?? []))
)
</script>

<template>
  <ComboboxGroup data-slot="combobox-group" v-bind="attrs" :sx="sx">
    <slot />
  </ComboboxGroup>
</template>
