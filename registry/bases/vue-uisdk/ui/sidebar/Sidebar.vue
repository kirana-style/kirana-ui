<script setup lang="ts">
import { useSx } from "@kirana-style/core/vue"

import { sidebar } from "../../../../styles/sidebar.styles"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../sheet"
import { useSidebar } from "./context"

defineOptions({ inheritAttrs: false })

const {
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  dir,
} = defineProps<{
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  dir?: "ltr" | "rtl"
}>()
const { sx, attrs } = useSx()
const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    v-bind="attrs"
    :sx="[sidebar.static, sx]"
  >
    <slot />
  </div>
  <Sheet
    v-else-if="isMobile"
    :open="openMobile"
    v-bind="attrs"
    @update:open="setOpenMobile"
  >
    <SheetContent
      :dir="dir"
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :sx="sidebar.mobile"
      :side="side"
      :show-close-button="false"
    >
      <SheetHeader :sx="visuallyHidden">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <div :sx="sidebar.mobileInner"><slot /></div>
    </SheetContent>
  </Sheet>
  <div
    v-else
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
    data-slot="sidebar"
    :sx="sidebar.root"
  >
    <!-- Holds the room the fixed panel takes on the page. -->
    <div
      data-slot="sidebar-gap"
      :sx="[
        sidebar.gap,
        (variant === 'floating' || variant === 'inset') && sidebar.gapPadded,
      ]"
    />
    <div
      data-slot="sidebar-container"
      :data-side="side"
      :dir="dir"
      v-bind="attrs"
      :sx="[
        sidebar.container,
        (variant === 'floating' || variant === 'inset') &&
          sidebar.containerPadded,
        sx,
      ]"
    >
      <div data-sidebar="sidebar" data-slot="sidebar-inner" :sx="sidebar.inner">
        <slot />
      </div>
    </div>
  </div>
</template>
