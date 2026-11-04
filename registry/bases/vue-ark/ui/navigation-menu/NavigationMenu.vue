<script setup lang="ts">
/**
 * Ark UI's navigation menu, drawn as Base UI's: the bar, and below it a positioner holding the
 * popup and its viewport, which the open item's content is shown in (each content teleports
 * there, as Base UI's moves into its viewport). Zag measures the panel and the open trigger's
 * offset (`--viewport-*`), which the popup reads (`navigationMenu.popupArk`). Ark's package
 * root does not export the navigation menu (LF-010), so every part imports its subpath, the
 * same one.
 */
import {
  NavigationMenuRoot,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
} from "@ark-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"
import { provide, ref } from "vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"
import { VIEWPORT } from "./context"

defineOptions({ inheritAttrs: false })

const { align = "start" } = defineProps<{
  align?: "start" | "center" | "end"
}>()
const { sx, attrs } = useSx()
const viewport = ref<HTMLElement>()
provide(VIEWPORT, viewport)
</script>

<template>
  <!-- Closed panels unmount, as Base UI's do. -->
  <NavigationMenuRoot as-child lazy-mount unmount-on-exit v-bind="attrs">
    <nav data-slot="navigation-menu" :sx="[navigationMenu.root, sx]">
      <slot />
      <NavigationMenuViewportPositioner :align="align" as-child>
        <div :sx="[navigationMenu.positioner, navigationMenu.positionerArk]">
          <!-- The viewport takes its alignment from the positioner; an `align` here would land on the
               div as HTML's presentational attribute, a `text-align`. -->
          <NavigationMenuViewport as-child>
            <div :sx="[navigationMenu.popup, navigationMenu.popupArk]">
              <div ref="viewport" :sx="navigationMenu.viewport"></div>
            </div>
          </NavigationMenuViewport>
        </div>
      </NavigationMenuViewportPositioner>
    </nav>
  </NavigationMenuRoot>
</template>
