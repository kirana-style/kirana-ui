<script setup lang="ts">
import { Drawer } from "@kirana-ui/vue/drawer"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject } from "vue"

import { drawer } from "../../../../styles/drawer.styles"
import { DRAWER } from "./context"
import DrawerOverlay from "./DrawerOverlay.vue"
import DrawerSwipeHandle from "./DrawerSwipeHandle.vue"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const context = inject(DRAWER)
if (!context) throw new Error("DrawerContent must be used within a Drawer.")
const swipeAxis = computed(() =>
  context.swipeDirection === "down" || context.swipeDirection === "up"
    ? "y"
    : "x"
)
</script>

<template>
  <Drawer.Portal>
    <DrawerOverlay
      v-if="context.modal === true"
      :data-snap-points="context.hasSnapPoints ? '' : undefined"
    />
    <!-- Base UI's viewport and content, which Kirana UI's drawer does not have: the boxes
         themselves, as React's Kirana UI drawer draws them. -->
    <div
      data-slot="drawer-viewport"
      :data-modal="String(context.modal)"
      :sx="drawer.viewport"
    >
      <Drawer.Popup
        data-slot="drawer-popup"
        :data-swipe-axis="swipeAxis"
        :data-snap-points="context.hasSnapPoints ? '' : undefined"
        v-bind="attrs"
        :sx="[drawer.popup, drawer.motion, sx]"
      >
        <DrawerSwipeHandle v-if="context.showSwipeHandle" />
        <div data-slot="drawer-content" :sx="drawer.content">
          <slot />
        </div>
      </Drawer.Popup>
    </div>
  </Drawer.Portal>
</template>
