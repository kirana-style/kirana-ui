<script setup lang="ts">
/**
 * Base UI's `ScrollUpArrow` and `ScrollDownArrow`, which Ark UI's select has no counterpart for:
 * at the popup's top or bottom while the list can scroll that way, scrolling it while the pointer
 * rests on it. `SelectContent` mounts one per direction.
 */
import { useSx } from "@kirana-style/core/vue"
import { onBeforeUnmount } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { select } from "../../../../styles/select.styles"

defineOptions({ inheritAttrs: false })

const { direction, list } = defineProps<{
  direction: "up" | "down"
  /** The list it scrolls. */
  list: HTMLElement | null
}>()
const { sx, attrs } = useSx()

/** Pixels a frame, about Base UI's pace. */
const STEP = 15
let frame = 0
function scroll() {
  if (!list) return
  list.scrollTop += direction === "up" ? -STEP : STEP
  frame = requestAnimationFrame(scroll)
}
const stop = () => cancelAnimationFrame(frame)
onBeforeUnmount(stop)
</script>

<template>
  <div
    :data-slot="
      direction === 'up'
        ? 'select-scroll-up-button'
        : 'select-scroll-down-button'
    "
    :data-direction="direction"
    :data-side="direction === 'up' ? 'top' : 'bottom'"
    data-visible=""
    aria-hidden="true"
    style="position: absolute"
    v-bind="attrs"
    :sx="[
      select.scrollButton,
      direction === 'up' ? select.scrollUp : select.scrollDown,
      sx,
    ]"
    @pointerenter="scroll"
    @pointerleave="stop"
  >
    <IconPlaceholder
      v-if="direction === 'up'"
      lucide="ChevronUpIcon"
      tabler="IconChevronUp"
      hugeicons="ArrowUp01Icon"
      phosphor="CaretUpIcon"
      remixicon="RiArrowUpSLine"
    />
    <IconPlaceholder
      v-else
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
    />
  </div>
</template>
