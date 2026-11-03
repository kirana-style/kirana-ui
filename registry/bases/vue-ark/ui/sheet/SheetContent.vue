<script setup lang="ts">
import {
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { sheet } from "../../../../styles/sheet.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"
import SheetOverlay from "./SheetOverlay.vue"

defineOptions({ inheritAttrs: false })

const { side = "right", showCloseButton = true } = defineProps<{
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Teleport to="body">
    <SheetOverlay />
    <DialogPositioner>
      <DialogContent
        data-slot="sheet-content"
        :data-side="side"
        v-bind="attrs"
        :sx="[sheet.content, sheet.side[side], sx]"
      >
        <slot />
        <DialogCloseTrigger
          v-if="showCloseButton"
          data-slot="sheet-close"
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
        </DialogCloseTrigger>
      </DialogContent>
    </DialogPositioner>
  </Teleport>
</template>
