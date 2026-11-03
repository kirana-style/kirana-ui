<script setup lang="ts">
import { NavigationMenuItem } from "@ark-ui/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"
import { useId } from "vue"

import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

// Base UI's `value` is optional: one is made when it is not given.
const { value = useId() } = defineProps<{ value?: string }>()
const { sx, attrs } = useSx()
</script>

<template>
  <NavigationMenuItem :value="value" as-child>
    <li
      data-slot="navigation-menu-item"
      v-bind="attrs"
      :sx="[navigationMenu.item, sx]"
    >
      <slot />
    </li>
  </NavigationMenuItem>
</template>
