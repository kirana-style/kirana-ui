<script setup lang="ts">
import { SelectContent, SelectList, SelectPositioner } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { inject, onBeforeUnmount, ref, watch, watchEffect } from "vue"

import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
import { popupMotion } from "../../../../styles/overlay.styles"
import { select } from "../../../../styles/select.styles"
import { PLACEMENT } from "./placement"
import SelectScrollButton from "./SelectScrollButton.vue"

defineOptions({ inheritAttrs: false })

// Base UI's placement, which the root places the popup with. `alignItemWithTrigger`, Base UI's
// popup laid over its trigger with the chosen item level with it, has no counterpart in Ark: the
// popup always opens beside the trigger.
const {
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
} = defineProps<{
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  alignItemWithTrigger?: boolean
}>()
const placement = inject(PLACEMENT, undefined)
watchEffect(() => {
  if (placement) placement.value = { side, sideOffset, align, alignOffset }
})
const { sx, attrs } = useSx()

// Whether the list can scroll up or down, for Base UI's scroll arrows (`SelectScrollButton`).
const list = ref<HTMLElement | null>(null)
const canUp = ref(false)
const canDown = ref(false)
const measure = () => {
  const element = list.value
  if (!element) return
  canUp.value = element.scrollTop > 0
  canDown.value =
    element.scrollTop + element.clientHeight < element.scrollHeight - 1
}
let resize: ResizeObserver | undefined
watch(list, (element) => {
  resize?.disconnect()
  if (!element) return
  measure()
  resize = new ResizeObserver(measure)
  resize.observe(element)
  for (const child of element.children) resize.observe(child)
})
onBeforeUnmount(() => resize?.disconnect())
const setList = (value: unknown) => {
  list.value =
    value && typeof value === "object" && "$el" in value
      ? ((value as { $el: HTMLElement }).$el ?? null)
      : (value as HTMLElement | null)
}
</script>

<template>
  <Teleport to="body">
    <SelectPositioner :sx="menuPositioner">
      <SelectContent
        data-slot="select-content"
        v-bind="attrs"
        :sx="[popupMotion, menuSurface, select.content, sx]"
      >
        <SelectScrollButton v-if="canUp" direction="up" :list="list" />
        <!-- Ark focuses the list, not an item: it draws no focus ring of its own. -->
        <SelectList :ref="setList" :sx="select.list" @scroll="measure">
          <slot />
        </SelectList>
        <SelectScrollButton v-if="canDown" direction="down" :list="list" />
      </SelectContent>
    </SelectPositioner>
  </Teleport>
</template>
