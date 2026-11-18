<script setup lang="ts">
import { Popover } from "@kirana-ui/vue/popover"
import type { Side } from "@kirana-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import { popupMotion } from "../../../../styles/overlay.styles"
import { popover } from "../../../../styles/popover.styles"

defineOptions({ inheritAttrs: false })

const {
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
} = defineProps<{
  side?: Side
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <Popover.Portal>
    <Popover.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :sx="popover.positioner"
    >
      <Popover.Popup
        data-slot="popover-content"
        v-bind="attrs"
        :sx="[popupMotion, popover.content, sx]"
      >
        <slot />
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</template>
