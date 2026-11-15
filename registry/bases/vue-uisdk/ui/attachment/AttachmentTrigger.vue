<script setup lang="ts">
import { Element } from "../../../../lib/vue/uisdk-slot"
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
  <Element
    as="button"
    data-slot="attachment-trigger"
    :type="asChild ? type : (type ?? 'button')"
    v-bind="attrs"
    :sx="[attachment.trigger, sx]"
    :as-child="asChild"
  >
    <slot />
  </Element>
</template>
