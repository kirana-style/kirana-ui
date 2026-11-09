<script setup lang="ts">
import { DrawerRoot, useLocaleContext } from "@ark-ui/vue"
import { computed, provide, reactive, useId } from "vue"

import { DRAWER } from "./context"
import type { SwipeDirection } from "./context"

const props = withDefaults(
  defineProps<{
    modal?: boolean
    showSwipeHandle?: boolean
    snapPoints?: (number | string)[]
    swipeDirection?: SwipeDirection
    /** Base UI's name for staying open on a click outside. */
    disablePointerDismissal?: boolean
  }>(),
  { modal: true, showSwipeHandle: false, swipeDirection: "down" }
)

// Zag's sides are logical (`start`, `end`) and it writes the physical one; Base UI's are physical.
// Base UI focuses a drawer's popup when it opens, not its first tabbable element (a dialog's):
// a chart or a field inside would take the focus, and with it its focus ring or keyboard tooltip.
const contentId = useId()
const focusContent = () => document.getElementById(contentId)

const locale = useLocaleContext()
const logicalDirection = computed(() => {
  const { swipeDirection } = props
  if (swipeDirection === "up" || swipeDirection === "down")
    return swipeDirection
  const rtl = locale?.value?.dir === "rtl"
  return (swipeDirection === "left") !== rtl ? "start" : "end"
})

provide(
  DRAWER,
  reactive({
    hasSnapPoints: computed(() => (props.snapPoints?.length ?? 0) > 0),
    modal: computed(() => props.modal),
    showSwipeHandle: computed(() => props.showSwipeHandle),
    swipeDirection: computed(() => props.swipeDirection),
  })
)
</script>

<template>
  <!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
  <DrawerRoot
    data-slot="drawer"
    :modal="modal"
    :snap-points="snapPoints"
    :swipe-direction="logicalDirection"
    :close-on-interact-outside="!disablePointerDismissal"
    :ids="{ content: contentId }"
    :initial-focus-el="focusContent"
    lazy-mount
    unmount-on-exit
  >
    <slot />
  </DrawerRoot>
</template>
