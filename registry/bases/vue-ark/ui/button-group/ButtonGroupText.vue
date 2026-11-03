<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { useSx } from "@kirana-style/core/vue"

import { buttonGroup } from "../../../../styles/button-group.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false } = defineProps<{
  asChild?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ark.div
    data-slot="button-group-text"
    v-bind="attrs"
    :sx="[buttonGroup.text, sx]"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
