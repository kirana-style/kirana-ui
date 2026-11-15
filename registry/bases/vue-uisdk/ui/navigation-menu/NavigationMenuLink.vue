<script setup lang="ts">
import { NavigationMenuLink } from "@ui-sdk/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

/** A link: Base UI's `active` is ui-sdk's `current` (`aria-current="page"`). */
const { asChild = false, active = false } = defineProps<{
  asChild?: boolean
  active?: boolean
}>()

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="NavigationMenuLink"
    name="navigation-menu-link"
    tag="a"
    :current="active"
    :as-child="asChild"
    v-bind="attrs"
    :sx="[navigationMenu.link, sx]"
  >
    <slot />
  </UisdkPart>
</template>
