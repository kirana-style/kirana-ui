<script setup lang="ts">
import { DialogTitle } from "@ui-sdk/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DialogTitle"
    slot-name="sheet-title"
    tag="h2"
    v-bind="attrs"
    :sx="[sheet.title, sx]"
  >
    <slot />
  </UisdkPart>
</template>
