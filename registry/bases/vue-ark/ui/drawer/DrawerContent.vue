<script setup lang="ts">
import { DrawerContent, DrawerPositioner } from "@ark-ui/vue"
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
  <!-- Ark's positioner is Base UI's viewport, its content the popup; the content inside is ours. -->
  <Teleport to="body">
    <DrawerOverlay
      v-if="context.modal"
      :data-snap-points="context.hasSnapPoints ? '' : undefined"
    />
    <DrawerPositioner
      data-slot="drawer-viewport"
      :data-modal="String(context.modal)"
      :sx="drawer.viewport"
    >
      <DrawerContent
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
      </DrawerContent>
    </DrawerPositioner>
  </Teleport>
</template>
