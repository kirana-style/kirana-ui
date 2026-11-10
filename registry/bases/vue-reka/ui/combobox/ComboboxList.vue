<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { combobox } from "../../../../styles/combobox.styles"
import { useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

defineSlots<{ default?: (props: { item: any; index: number }) => unknown }>()
const { sx, attrs } = useSx()
const { filtered } = useCombobox()
</script>

<template>
  <!-- Each matching item through the slot, as Base UI's list calls its children with each. Reka's
       content is the list box; this is the part that scrolls. -->
  <div
    data-slot="combobox-list"
    :data-empty="filtered.length === 0 ? '' : undefined"
    v-bind="attrs"
    :sx="[combobox.list, sx]"
  >
    <!-- The slot itself, so a list drawn again patches its rows rather than mounting them anew. -->
    <template v-for="(item, index) in filtered" :key="index">
      <slot :item="item" :index="index" />
    </template>
  </div>
</template>
