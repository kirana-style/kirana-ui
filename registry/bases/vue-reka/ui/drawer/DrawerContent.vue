<script setup lang="ts">
import {
  DrawerContent,
  DrawerPortal,
  DrawerViewport,
  injectDrawerRootContext,
} from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject, ref } from "vue"

import { drawer } from "../../../../styles/drawer.styles"
import { DRAWER } from "./context"
import DrawerOverlay from "./DrawerOverlay.vue"
import DrawerSwipeHandle from "./DrawerSwipeHandle.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const context = inject(DRAWER)
if (!context) throw new Error("DrawerContent must be used within a Drawer.")
const root = injectDrawerRootContext()
const swipeAxis = computed(() =>
  context.swipeDirection === "down" || context.swipeDirection === "up"
    ? "y"
    : "x"
)
/**
 * Whether the popup is in the page, until its exit has run: Reka's viewport stays mounted while
 * the drawer is closed, where Base UI's leaves with its popup, so it is mounted only while the
 * popup is.
 */
const shown = ref(false)
// Base UI focuses a drawer's popup when it opens, not its first tabbable element (a dialog's):
// a chart or a field inside would take the focus, and with it its focus ring or keyboard tooltip.
const popup = ref<{ $el?: HTMLElement }>()
const focusPopup = (event: Event) => {
  event.preventDefault()
  popup.value?.$el?.focus()
}
</script>

<template>
  <!-- Reka's viewport is Base UI's viewport, its content the popup; the content inside is ours. -->
  <DrawerPortal>
    <DrawerOverlay
      v-if="context.modal === true"
      :data-snap-points="context.hasSnapPoints ? '' : undefined"
    />
    <DrawerViewport
      v-if="root.open.value || shown"
      data-slot="drawer-viewport"
      :data-modal="String(context.modal)"
      :sx="drawer.viewport"
    >
      <DrawerContent
        ref="popup"
        data-slot="drawer-popup"
        tabindex="-1"
        :data-swipe-axis="swipeAxis"
        :data-snap-points="context.hasSnapPoints ? '' : undefined"
        v-bind="attrs"
        :sx="[drawer.popup, drawer.motion, sx]"
        @open-auto-focus="focusPopup"
        @pointer-down-outside="
          (event: Event) =>
            context.disablePointerDismissal && event.preventDefault()
        "
      >
        <DrawerSwipeHandle v-if="context.showSwipeHandle" />
        <div
          data-slot="drawer-content"
          :sx="drawer.content"
          @vue:mounted="shown = true"
          @vue:unmounted="shown = false"
        >
          <slot />
        </div>
      </DrawerContent>
    </DrawerViewport>
  </DrawerPortal>
</template>
