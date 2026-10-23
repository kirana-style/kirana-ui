<script setup lang="ts">
import {
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
} from "@ark-ui/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { useStyleAttrs } from "../../../../lib/vue"
import { dialog } from "../../../../styles/dialog.styles"
import { modalMotion } from "../../../../styles/overlay.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"
import DialogOverlay from "./DialogOverlay.vue"

defineOptions({ inheritAttrs: false })

const { showCloseButton = true } = defineProps<{ showCloseButton?: boolean }>()
const bound = useStyleAttrs(() => [modalMotion, dialog.content])
</script>

<template>
  <Teleport to="body">
    <DialogOverlay />
    <DialogPositioner>
      <DialogContent data-slot="dialog-content" v-bind="bound">
        <slot />
        <DialogCloseTrigger
          v-if="showCloseButton"
          data-slot="dialog-close"
          as-child
        >
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
        </DialogCloseTrigger>
      </DialogContent>
    </DialogPositioner>
  </Teleport>
</template>
