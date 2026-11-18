<script setup lang="ts">
import { Select } from "@kirana-ui/vue/select"
import { useSx } from "@kirana-style/core/vue"

import { menuSeparator } from "../../../../styles/menu.styles"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <Select.Separator
    data-slot="select-separator"
    v-bind="attrs"
    :sx="[menuSeparator, select.separator, sx]"
  />
</template>
