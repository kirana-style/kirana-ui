<script setup lang="ts">
import { Drawer } from "@kirana-ui/vue/drawer"
import { computed, provide, reactive } from "vue"

import { DRAWER } from "./context"
import type { SwipeDirection } from "./context"

const props = withDefaults(
  defineProps<{
    /** Whether it blocks the page behind it (Kirana UI's `modal` is a boolean, as React's). */
    modal?: boolean
    showSwipeHandle?: boolean
    snapPoints?: (number | string)[]
    swipeDirection?: SwipeDirection
    /** Base UI's name for staying open on a click outside. */
    disablePointerDismissal?: boolean
  }>(),
  { modal: true, showSwipeHandle: false, swipeDirection: "down" }
)

// Kirana UI's Drawer is Base UI's, its sides physical as Base UI's are.
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
  <!-- Base UI's `disablePointerDismissal` as Kirana UI's `dismissible`, inverted. -->
  <Drawer.Root
    :modal="modal"
    :snap-points="snapPoints"
    :swipe-direction="swipeDirection"
    :dismissible="disablePointerDismissal ? false : undefined"
  >
    <slot />
  </Drawer.Root>
</template>
