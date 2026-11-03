<script setup lang="ts">
import { ComboboxItemGroup } from "@ark-ui/vue"
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
  <ComboboxItemGroup data-slot="combobox-group" v-bind="attrs" :sx="sx">
    <slot />
  </ComboboxItemGroup>
</template>
