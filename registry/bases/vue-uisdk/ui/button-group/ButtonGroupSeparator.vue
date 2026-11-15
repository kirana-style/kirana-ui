<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { buttonGroup } from "../../../../styles/button-group.styles"
import { Separator } from "../separator"

defineOptions({ inheritAttrs: false })

const { orientation = "vertical" } = defineProps<{
  orientation?: "horizontal" | "vertical"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    :orientation="orientation"
    v-bind="attrs"
    :sx="[buttonGroup.separator, sx]"
  />
</template>
