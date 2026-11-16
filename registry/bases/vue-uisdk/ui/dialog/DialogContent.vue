<script setup lang="ts">
import { DialogContent, DialogClose } from "@ui-sdk/vue/dialog"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { modalMotion } from "../../../../styles/overlay.styles"
import { dialog } from "../../../../styles/dialog.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"
import { CONTENT } from "./context"
import DialogOverlay from "./DialogOverlay.vue"

defineOptions({ inheritAttrs: false })

const { showCloseButton = true } = defineProps<{ showCloseButton?: boolean }>()
const content = inject(CONTENT, undefined)
const { sx, attrs } = useSx()
</script>

<template>
  <DialogOverlay />
  <UisdkPart
    :part="DialogContent"
    name="dialog-content"
    tag="div"
    :element="
      (el: Element | null) => content && (content.el = el as HTMLElement | null)
    "
    v-bind="attrs"
    :sx="[modalMotion, dialog.content, sx]"
  >
    <slot />
    <UisdkPart
      v-if="showCloseButton"
      :part="DialogClose"
      name="dialog-close"
      tag="button"
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
    </UisdkPart>
  </UisdkPart>
</template>
