<script setup lang="ts">
import { SelectItemGroup } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <SelectItemGroup
    data-slot="select-group"
    v-bind="attrs"
    :sx="[select.group, sx]"
  >
    <slot />
  </SelectItemGroup>
</template>
