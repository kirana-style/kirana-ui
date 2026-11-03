<script setup lang="ts">
import { ark } from "@ark-ui/vue/factory"
import { useSx } from "@kirana-style/core/vue"

import { attachment } from "../../../../styles/attachment.styles"

defineOptions({ inheritAttrs: false })

const { asChild = false, type } = defineProps<{
  asChild?: boolean
  type?: "button" | "submit" | "reset"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <ark.button
    data-slot="attachment-trigger"
    :type="asChild ? type : (type ?? 'button')"
    v-bind="attrs"
    :sx="[attachment.trigger, sx]"
    :as-child="asChild"
  >
    <slot />
  </ark.button>
</template>
