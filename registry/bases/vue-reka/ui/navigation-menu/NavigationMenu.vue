<script setup lang="ts">
/**
 * Reka UI's navigation menu, drawn as Base UI's: the bar, and below it a positioner holding the
 * popup, which is Reka's viewport: the open item's content is shown in it, as Base UI's moves into
 * its viewport. Reka measures the panel and the open trigger's offset
 * (`--reka-navigation-menu-viewport-*`), which the popup reads under Ark UI's names
 * (`navigationMenu.popupArk`).
 */
import { NavigationMenuRoot, NavigationMenuViewport } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { align = "start" } = defineProps<{
  align?: "start" | "center" | "end"
}>()
const { sx, attrs } = useSx()
/** Reka's measures, under the names the popup reads. */
const MEASURES = {
  "--viewport-width": "var(--reka-navigation-menu-viewport-width)",
  "--viewport-height": "var(--reka-navigation-menu-viewport-height)",
  "--viewport-x": "var(--reka-navigation-menu-viewport-left)",
}
</script>

<template>
  <!-- Closed panels unmount, as Base UI's do: Reka's default `unmount-on-hide`. -->
  <NavigationMenuRoot
    data-slot="navigation-menu"
    v-bind="attrs"
    :sx="[navigationMenu.root, sx]"
  >
    <slot />
    <div :sx="[navigationMenu.positioner, navigationMenu.positionerArk]">
      <!-- The popup clips the panel as Base UI's viewport inside it does. -->
      <NavigationMenuViewport as-child :align="align">
        <div
          :style="MEASURES"
          :sx="[
            navigationMenu.viewport,
            navigationMenu.popup,
            navigationMenu.popupArk,
          ]"
        />
      </NavigationMenuViewport>
    </div>
  </NavigationMenuRoot>
</template>
