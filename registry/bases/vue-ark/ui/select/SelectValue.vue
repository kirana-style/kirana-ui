<script setup lang="ts">
import { SelectValueText } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const bound = useStyleAttrs(() => select.value)
</script>

<template>
  <SelectValueText data-slot="select-value" v-bind="bound" />
</template>
