<script setup lang="ts">
import { DialogCloseTrigger } from "@ark-ui/vue"
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
    <DialogCloseTrigger v-if="showCloseButton" as-child>
      <Button variant="outline">Close</Button>
    </DialogCloseTrigger>
  </div>
</template>
