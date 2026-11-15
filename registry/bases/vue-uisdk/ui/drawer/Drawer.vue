<script setup lang="ts">
import { Drawer } from "@ui-sdk/vue/drawer"
import { computed, provide, reactive } from "vue"

import {
  endScrollAnimations,
  popupContainer,
} from "../../../../lib/vue/uisdk-slot"
import type { SwipeDirection } from "./context"
import { DRAWER } from "./context"

/**
 * ui-sdk's drawer, with Vue's Ark UI part's props: `swipe-direction` (the edge it leaves through) is
 * ui-sdk's `side`, `disable-pointer-dismissal` its `closeOnOutsidePress` inverted, `snap-points` as
 * fractions or lengths, which ui-sdk reads the same. Its popup renders in the body; as it closes,
 * the content's scroll-driven animations end (LF-024).
 */
const props = withDefaults(
  defineProps<{
    modal?: boolean
    showSwipeHandle?: boolean
    snapPoints?: (number | string)[]
    swipeDirection?: SwipeDirection
    disablePointerDismissal?: boolean
  }>(),
  { modal: true, showSwipeHandle: false, swipeDirection: "down" }
)
const open = defineModel<boolean | undefined>("open", { default: undefined })

const SIDES = {
  up: "top",
  down: "bottom",
  left: "left",
  right: "right",
} as const
const state = reactive({
  hasSnapPoints: computed(() => (props.snapPoints?.length ?? 0) > 0),
  modal: computed(() => props.modal),
  showSwipeHandle: computed(() => props.showSwipeHandle),
  swipeDirection: computed(() => props.swipeDirection),
  content: null as HTMLElement | null,
})
provide(DRAWER, state)
const change = (value: boolean) => {
  // Before ui-sdk gathers what its exit waits for (LF-024).
  if (!value) endScrollAnimations(state.content)
  open.value = value
}
</script>

<template>
  <Drawer
    data-slot="drawer"
    :container="popupContainer()"
    :modal="modal"
    :snap-points="snapPoints as never"
    :side="SIDES[swipeDirection]"
    :close-on-outside-press="
      disablePointerDismissal === undefined
        ? undefined
        : !disablePointerDismissal
    "
    :open="open"
    @update:open="change"
    v-bind="$attrs"
  >
    <slot />
  </Drawer>
</template>
