<script setup lang="ts">
import { DrawerContent } from "@ui-sdk/vue/drawer"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { drawer } from "../../../../styles/drawer.styles"
import { DRAWER } from "./context"
import DrawerOverlay from "./DrawerOverlay.vue"
import DrawerSwipeHandle from "./DrawerSwipeHandle.vue"

defineOptions({ inheritAttrs: false })

/**
 * The sheet. ui-sdk's content places itself in a viewport of its own and moves itself (`translate`),
 * so it takes the popup's and the content's styles but not Base UI's motion, and the attributes the
 * registry's styles read on Base UI's (`data-swipe-direction`, `data-swipe-axis`).
 */
const context = inject(DRAWER)!
const axis = () =>
  context.swipeDirection === "down" || context.swipeDirection === "up"
    ? "y"
    : "x"
const { sx, attrs } = useSx()
</script>

<template>
  <DrawerOverlay
    v-if="context.modal"
    :data-snap-points="context.hasSnapPoints ? '' : undefined"
  />
  <!-- Focus on the popup as it opens, as Base UI's drawer puts it; ui-sdk's goes to the first field. -->
  <UisdkPart
    :part="DrawerContent"
    name="drawer-popup"
    tag="div"
    initial-focus="content"
    :data-modal="context.modal"
    :data-swipe-axis="axis()"
    :data-swipe-direction="context.swipeDirection"
    :data-snap-points="context.hasSnapPoints ? '' : undefined"
    v-bind="attrs"
    :sx="[drawer.popup, sx]"
  >
    <DrawerSwipeHandle v-if="context.showSwipeHandle" />
    <div
      data-slot="drawer-content"
      :ref="(el) => (context.content = el as HTMLElement | null)"
      :sx="drawer.content"
    >
      <slot />
    </div>
  </UisdkPart>
</template>
