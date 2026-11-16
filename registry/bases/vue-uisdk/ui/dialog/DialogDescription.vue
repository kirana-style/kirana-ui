<script setup lang="ts">
import { DialogDescription } from "@ui-sdk/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DialogDescription"
    slot-name="dialog-description"
    tag="p"
    v-bind="attrs"
    :sx="[dialog.description, sx]"
  >
    <slot />
  </UisdkPart>
</template>
