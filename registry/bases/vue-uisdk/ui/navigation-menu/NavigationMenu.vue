<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuViewport,
} from "@ui-sdk/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart, popupContainer } from "../../../../lib/vue/uisdk-slot"
import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

/**
 * ui-sdk's navigation menu. Its viewport, where the open panel shows, is Base UI's positioner, popup
 * and viewport in one element, which places itself: their styles on it, then its own sizes
 * (`viewportUisdk`).
 */
const { align = "start" } = defineProps<{
  align?: "start" | "center" | "end"
}>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="NavigationMenu"
    slot-name="navigation-menu"
    tag="nav"
    :container="popupContainer()"
    v-bind="attrs"
    :sx="[navigationMenu.root, sx]"
  >
    <slot />
    <NavigationMenuViewport
      side="bottom"
      :side-offset="8"
      :align="align"
      :align-offset="0"
      :sx="[
        navigationMenu.positioner,
        navigationMenu.popup,
        navigationMenu.viewport,
        navigationMenu.viewportUisdk,
      ]"
    />
  </UisdkPart>
</template>
