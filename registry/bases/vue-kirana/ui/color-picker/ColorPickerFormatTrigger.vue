<script setup lang="ts">
import { ColorPicker } from "@kirana-ui/vue/color-picker"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Button } from "../button"

defineOptions({ inheritAttrs: false })

/** A ghost icon Button that writes the colour in the next format: hex, then rgb, then hsl. */
const { sx, attrs } = useSx()
</script>

<template>
  <ColorPicker.FormatTrigger
    data-slot="color-picker-format-trigger"
    v-bind="attrs"
    as-child
  >
    <Button variant="ghost" size="icon" :sx="sx">
      <slot>
        <IconPlaceholder
          lucide="ArrowLeftRightIcon"
          tabler="IconArrowsLeftRight"
          hugeicons="ArrowDataTransferHorizontalIcon"
          phosphor="ArrowsLeftRightIcon"
          remixicon="RiArrowLeftRightLine"
        />
        <span :sx="visuallyHidden">Change the format</span>
      </slot>
    </Button>
  </ColorPicker.FormatTrigger>
</template>
