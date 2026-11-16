<script setup lang="ts">
import { ComboboxList } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"
import { ITEMS } from "./context"

defineOptions({ inheritAttrs: false })

defineSlots<{ default?: (props: { item: any; index: number }) => unknown }>()
const { sx, attrs } = useSx()
const items = inject(ITEMS, undefined)
</script>

<template>
  <!-- Each of the root's items through the slot, as Base UI's list calls its children with each;
       ui-sdk hides those that do not match what is typed. -->
  <UisdkPart
    :part="ComboboxList"
    slot-name="combobox-list"
    tag="div"
    v-bind="attrs"
    :sx="[combobox.list, sx]"
  >
    <template v-for="(item, index) in items ?? []" :key="index">
      <slot :item="item" :index="index" />
    </template>
  </UisdkPart>
</template>
