<script setup lang="ts">
import { NavigationMenuTrigger } from "@ui-sdk/vue/navigation-menu"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { navigationMenu } from "../../../../styles/navigation-menu.styles"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="NavigationMenuTrigger"
    slot-name="navigation-menu-trigger"
    tag="button"
    v-bind="attrs"
    :sx="[navigationMenu.trigger, sx]"
  >
    <slot />
    {{ " " }}
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconChevronDown"
      hugeicons="ArrowDown01Icon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      aria-hidden="true"
      :sx="navigationMenu.triggerIcon"
    />
  </UisdkPart>
</template>
