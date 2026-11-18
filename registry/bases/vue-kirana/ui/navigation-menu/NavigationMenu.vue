<script setup lang="ts">
import { NavigationMenu } from "@kirana-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { align = "start" } = defineProps<{
  align?: "start" | "center" | "end"
}>()
const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenu.Root
    data-slot="navigation-menu"
    v-bind="attrs"
    :sx="[navigationMenu.root, sx]"
  >
    <slot />
    <!-- Base UI's portal, positioner, popup and viewport, which Kirana UI's menu has: the open
         item's content is drawn in the viewport. -->
    <NavigationMenu.Portal>
      <NavigationMenu.Positioner
        side="bottom"
        :side-offset="8"
        :align="align"
        :align-offset="0"
        :sx="navigationMenu.positioner"
      >
        <NavigationMenu.Popup :sx="navigationMenu.popup">
          <NavigationMenu.Viewport :sx="navigationMenu.viewport" />
        </NavigationMenu.Popup>
      </NavigationMenu.Positioner>
    </NavigationMenu.Portal>
  </NavigationMenu.Root>
</template>
