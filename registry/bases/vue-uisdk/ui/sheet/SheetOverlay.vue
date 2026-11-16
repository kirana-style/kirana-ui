<script setup lang="ts">
import { DialogBackdrop } from "@ui-sdk/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { sheet } from "../../../../styles/sheet.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DialogBackdrop"
    slot-name="sheet-overlay"
    tag="div"
    v-bind="attrs"
    :sx="[sheet.overlay, sx]"
  >
    <slot />
  </UisdkPart>
</template>
