<script setup lang="ts">
import { Primitive } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { sidebar } from "../../../../styles/sidebar.styles"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"
import { useSidebar } from "./context"

defineOptions({ inheritAttrs: false })

const {
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
} = defineProps<{
  asChild?: boolean
  isActive?: boolean
  /** A label shown beside the button while the sidebar is collapsed to its icons. */
  tooltip?: string | { children: string; hidden?: boolean }
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}>()
const { sx, attrs } = useSx()
const { isMobile, state } = useSidebar()

const label = computed(() =>
  typeof tooltip === "string" ? { children: tooltip } : tooltip
)

const VARIANTS = { default: null, outline: sidebar.menuButtonOutline }
const SIZES = {
  default: sidebar.menuButtonDefault,
  sm: sidebar.menuButtonSm,
  lg: sidebar.menuButtonLg,
}
</script>

<template>
  <Tooltip
    v-if="label"
    :disabled="state !== 'collapsed' || isMobile || label.hidden"
  >
    <TooltipTrigger as-child>
      <Primitive
        as="button"
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        :data-size="size"
        :data-active="isActive ? '' : undefined"
        v-bind="attrs"
        :sx="[sidebar.menuButton, VARIANTS[variant], SIZES[size], sx]"
        :as-child="asChild"
      >
        <slot />
      </Primitive>
    </TooltipTrigger>
    <TooltipContent side="right" align="center">{{
      label.children
    }}</TooltipContent>
  </Tooltip>
  <Primitive
    as="button"
    v-else
    data-slot="sidebar-menu-button"
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive ? '' : undefined"
    v-bind="attrs"
    :sx="[sidebar.menuButton, VARIANTS[variant], SIZES[size], sx]"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
