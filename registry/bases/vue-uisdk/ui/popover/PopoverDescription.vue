<script setup lang="ts">
import { PopoverDescription } from "@ui-sdk/vue/popover"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="PopoverDescription"
    slot-name="popover-description"
    tag="p"
    v-bind="attrs"
    :sx="[popover.description, sx]"
  >
    <slot />
  </UisdkPart>
</template>
