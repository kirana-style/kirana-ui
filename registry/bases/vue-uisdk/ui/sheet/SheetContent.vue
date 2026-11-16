<script setup lang="ts">
import { DialogContent, DialogClose } from "@ui-sdk/vue/dialog"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { sheet } from "../../../../styles/sheet.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"
import { CONTENT } from "./context"
import SheetOverlay from "./SheetOverlay.vue"

defineOptions({ inheritAttrs: false })

const { side = "right", showCloseButton = true } = defineProps<{
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}>()
const content = inject(CONTENT, undefined)
const { sx, attrs } = useSx()
</script>

<template>
  <SheetOverlay />
  <UisdkPart
    :part="DialogContent"
    slot-name="sheet-content"
    tag="div"
    :data-side="side"
    :element="
      (el: Element | null) => content && (content.el = el as HTMLElement | null)
    "
    v-bind="attrs"
    :sx="[sheet.content, sheet.side[side], sx]"
  >
    <slot />
    <UisdkPart
      v-if="showCloseButton"
      :part="DialogClose"
      slot-name="sheet-close"
      tag="button"
      as-child
    >
      <Button variant="ghost" size="icon-sm" :sx="sheet.close">
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
