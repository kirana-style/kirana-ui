<script setup lang="ts">
import { SelectValueText } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <SelectValueText
    data-slot="select-value"
    v-bind="attrs"
    :sx="[select.value, sx]"
  />
</template>
