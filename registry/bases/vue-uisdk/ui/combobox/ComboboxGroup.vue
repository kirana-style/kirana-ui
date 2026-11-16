<script setup lang="ts">
import { ComboboxGroup } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"
import { computed, provide } from "vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { GROUP_ITEMS } from "./context"

defineOptions({ inheritAttrs: false })

/** Base UI's group `items`, which its collection draws. */
const { items } = defineProps<{ items?: readonly unknown[] }>()
const { sx, attrs } = useSx()
provide(
  GROUP_ITEMS,
  computed(() => items ?? [])
)
</script>

<template>
  <UisdkPart
    :part="ComboboxGroup"
    slot-name="combobox-group"
    tag="div"
    v-bind="attrs"
    :sx="sx"
  >
    <slot />
  </UisdkPart>
</template>
