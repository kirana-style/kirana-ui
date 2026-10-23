<script setup lang="ts">
import { DialogCloseTrigger } from "@ark-ui/vue"

import { useStyleAttrs } from "../../../../lib/vue"
import { dialog } from "../../../../styles/dialog.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

const { showCloseButton = false } = defineProps<{ showCloseButton?: boolean }>()
const bound = useStyleAttrs(() => dialog.footer)
</script>

<template>
  <div data-slot="dialog-footer" v-bind="bound">
    <slot />
    <DialogCloseTrigger v-if="showCloseButton" as-child>
      <Button variant="outline">Close</Button>
    </DialogCloseTrigger>
  </div>
</template>
