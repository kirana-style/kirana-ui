<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Select.Group
    data-slot="select-group"
    v-bind="attrs"
    :sx="[select.group, sx]"
  >
    <slot />
  </Select.Group>
</template>
