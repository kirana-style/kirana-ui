<script setup lang="ts">
import { DialogDescription } from "@ui-sdk/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DialogDescription"
    slot-name="sheet-description"
    tag="p"
    v-bind="attrs"
    :sx="[sheet.description, sx]"
  >
    <slot />
  </UisdkPart>
</template>
