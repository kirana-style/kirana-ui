<script setup lang="ts">
import { DialogTitle } from "@ui-sdk/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { dialog } from "../../../../styles/dialog.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="DialogTitle"
    name="dialog-title"
    tag="h2"
    v-bind="attrs"
    :sx="[dialog.title, sx]"
  >
    <slot />
  </UisdkPart>
</template>
