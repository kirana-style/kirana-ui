<script setup lang="ts">
import { Dialog } from "@kirana-ui/vue/dialog"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { dialog } from "../../../../styles/dialog.styles"
import { modalMotion } from "../../../../styles/overlay.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"
import DialogOverlay from "./DialogOverlay.vue"

defineOptions({ inheritAttrs: false })

const { showCloseButton = true } = defineProps<{ showCloseButton?: boolean }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Dialog.Portal>
    <DialogOverlay />
    <Dialog.Popup
      data-slot="dialog-content"
      v-bind="attrs"
      :sx="[modalMotion, dialog.content, sx]"
    >
      <slot />
      <Dialog.Close v-if="showCloseButton" data-slot="dialog-close" as-child>
        <Button variant="ghost" size="icon-sm" :sx="dialog.close">
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
          <span :sx="visuallyHidden">Close</span>
        </Button>
      </Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</template>
