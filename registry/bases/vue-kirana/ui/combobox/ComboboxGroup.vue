<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"
import { computed, provide } from "vue"

import { COMBOBOX_GROUP } from "./context"

defineOptions({ inheritAttrs: false })

/** Base UI's Group, whose `items` its collection renders. */
const { items } = defineProps<{ items?: readonly unknown[] }>()
const { sx, attrs } = useSx()
provide(
  COMBOBOX_GROUP,
  computed(() => items ?? [])
)
</script>

<template>
  <Combobox.Group data-slot="combobox-group" v-bind="attrs" :sx="sx">
    <slot />
  </Combobox.Group>
</template>
