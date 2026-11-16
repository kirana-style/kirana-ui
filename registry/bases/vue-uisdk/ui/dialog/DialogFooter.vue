<script setup lang="ts">
import { DialogClose } from "@ui-sdk/vue/dialog"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { useSx } from "@kirana-style/core/vue"

import { dialog } from "../../../../styles/dialog.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

const { showCloseButton = false } = defineProps<{ showCloseButton?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="dialog-footer" v-bind="attrs" :sx="[dialog.footer, sx]">
    <slot />
    <UisdkPart
      :part="DialogClose"
      name="dialog-close"
      tag="button"
      v-if="showCloseButton"
      as-child
    >
      <Button variant="outline">Close</Button>
    </UisdkPart>
  </div>
</template>
