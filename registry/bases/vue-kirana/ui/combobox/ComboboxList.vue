<script setup lang="ts">
import { Combobox } from "@kirana-ui/vue/combobox"
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

defineSlots<{ default?: (props: { item: any; index: number }) => unknown }>()
const { sx, attrs } = useSx()
const { items } = useCombobox()
</script>

<template>
  <!-- Each of the root's items through the slot, as Base UI's list calls its children with each;
       Kirana UI shows the ones that match what is typed. -->
  <Combobox.List
    data-slot="combobox-list"
    v-bind="attrs"
    :sx="[combobox.list, sx]"
  >
    <template v-for="(item, index) in items" :key="index">
      <slot :item="item" :index="index" />
    </template>
  </Combobox.List>
</template>
