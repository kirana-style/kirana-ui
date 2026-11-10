<script setup lang="ts">
import { DrawerRoot } from "reka-ui"
import { computed, provide, reactive } from "vue"

import { DRAWER } from "./context"
import type { SwipeDirection } from "./context"

const props = withDefaults(
  defineProps<{
    /** Base UI's: `true`, `"trap-focus"` (focus kept inside, the page still usable) or `false`. */
    modal?: boolean | "trap-focus"
    showSwipeHandle?: boolean
    snapPoints?: (number | string)[]
    swipeDirection?: SwipeDirection
    /** Base UI's name for staying open on a click outside. */
    disablePointerDismissal?: boolean
  }>(),
  { modal: true, showSwipeHandle: false, swipeDirection: "down" }
)

// Reka's Drawer is Base UI's, its sides physical as Base UI's are.
provide(
  DRAWER,
  reactive({
    hasSnapPoints: computed(() => (props.snapPoints?.length ?? 0) > 0),
    modal: computed(() => props.modal),
    showSwipeHandle: computed(() => props.showSwipeHandle),
    swipeDirection: computed(() => props.swipeDirection),
    disablePointerDismissal: computed(() => props.disablePointerDismissal),
  })
)
</script>

<template>
  <DrawerRoot
    data-slot="drawer"
    :modal="modal"
    :snap-points="snapPoints"
    :swipe-direction="swipeDirection"
  >
    <slot />
  </DrawerRoot>
</template>
