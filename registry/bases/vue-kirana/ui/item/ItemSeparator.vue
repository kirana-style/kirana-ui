<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { item } from "../../../../styles/item.styles"
import { Separator } from "../separator"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Separator
    data-slot="item-separator"
    orientation="horizontal"
    v-bind="attrs"
    :sx="[item.separator, sx]"
  />
</template>
