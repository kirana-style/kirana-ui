<script setup lang="ts">
import { ComboboxContent } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject, provide } from "vue"

import { sideOf, UisdkPart } from "../../../../lib/vue/uisdk-slot"
import type { BaseSide } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"
import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { ANCHORS, IN_CONTENT } from "./context"

defineOptions({ inheritAttrs: false })

// Base UI's placement. ui-sdk's content places itself, with no positioner: the positioner's styles
// join the content's.
const {
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
} = defineProps<{
  side?: BaseSide
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  /** Base UI's anchor; without it, the chips, the input's group or the trigger. */
  anchor?: { value: HTMLElement | null } | HTMLElement | null
}>()
const { sx, attrs } = useSx()

const anchors = inject(ANCHORS, undefined)
provide(IN_CONTENT, true)
const given = computed(() =>
  anchor && "value" in anchor ? anchor.value : (anchor ?? null)
)
const placedAgainst = computed(
  () =>
    given.value ??
    anchors?.chips ??
    anchors?.input ??
    anchors?.trigger ??
    undefined
)

/** ui-sdk's room on the popup, under names its descendants inherit (LF-025). */
const ROOM = {
  "--uisdk-available-height": "var(--available-height)",
  "--uisdk-available-width": "var(--available-width)",
}
</script>

<template>
  <UisdkPart
    :part="ComboboxContent"
    slot-name="combobox-content"
    tag="div"
    :data-chips="String(!!(given ?? anchors?.chips))"
    :side="sideOf(side)"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    :anchor="placedAgainst"
    :style="ROOM"
    v-bind="attrs"
    :sx="[menuPositioner, popupMotion, menuSurface, combobox.content, sx]"
  >
    <slot />
  </UisdkPart>
</template>
