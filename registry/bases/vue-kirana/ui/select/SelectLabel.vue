<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { menuLabel } from "../../../../styles/menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Select.GroupLabel
    data-slot="select-label"
    v-bind="attrs"
    :sx="[menuLabel, sx]"
  >
    <slot />
  </Select.GroupLabel>
</template>
