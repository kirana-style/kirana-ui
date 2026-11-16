<script setup lang="ts">
import { PopoverTitle } from "@ui-sdk/vue/popover"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="PopoverTitle"
    slot-name="popover-title"
    tag="h2"
    v-bind="attrs"
    :sx="[popover.title, sx]"
  >
    <slot />
  </UisdkPart>
</template>
