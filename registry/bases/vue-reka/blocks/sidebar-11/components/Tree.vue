<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../ui/collapsible"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../../../ui/sidebar"
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { css, select } from "@kirana-style/core"
import { collapsibleScope } from "../../../../../styles/collapsible.styles"
import { duration, easing } from "../../../../../core/scales"

const styles = {
  // `data-[active=true]:bg-transparent`: Base UI's button writes `data-active=""`, which it never
  // matches, so the current file keeps its highlight, as on upstream's site.
  treeSidebarMenuButton: css({
    backgroundColor: { '[data-active="true"]': "transparent" },
  }),
  // A folder's button: its chevron (the first icon) turned while the folder is open, upstream's
  // `[&[data-state=open]>button>svg:first-child]:rotate-90` (whose Radix attribute Base UI never
  // sets), read from the button itself so a closed folder inside an open one keeps its own.
  treeTrigger: css({
    [select.child("svg:first-child")]: {
      rotate: { '[aria-expanded="true"]': "90deg" },
    },
  }),
  treeIconPlaceholder: css({
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
  }),
}

type TreeItem = string | TreeItem[]

const { item } = defineProps<{
  item: TreeItem
}>()
const [name, ...items] = Array.isArray(item) ? item : [item]
</script>

<template>
  <SidebarMenuButton
    v-if="!items.length"
    :is-active="name === 'button.tsx'"
    :sx="styles.treeSidebarMenuButton"
  >
    <IconPlaceholder
      lucide="FileIcon"
      tabler="IconFile"
      hugeicons="FileIcon"
      phosphor="FileIcon"
      remixicon="RiFileLine"
    />{{ name }}
  </SidebarMenuButton>
  <SidebarMenuItem v-else>
    <Collapsible
      :sx="collapsibleScope.anchor"
      :default-open="name === 'components' || name === 'ui'"
    >
      <SidebarMenuButton as-child :sx="styles.treeTrigger">
        <CollapsibleTrigger>
          <IconPlaceholder
            lucide="ChevronRightIcon"
            tabler="IconChevronRight"
            hugeicons="ArrowRight01Icon"
            phosphor="CaretRightIcon"
            remixicon="RiArrowRightSLine"
            :sx="styles.treeIconPlaceholder"
          />
          <IconPlaceholder
            lucide="FolderIcon"
            tabler="IconFolder"
            hugeicons="FolderIcon"
            phosphor="FolderIcon"
            remixicon="RiFolderLine"
          />{{ name }}
        </CollapsibleTrigger>
      </SidebarMenuButton>
      <CollapsibleContent>
        <SidebarMenuSub>
          <Tree
            v-for="(subItem, index) in items"
            :key="index"
            :item="subItem"
          />
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  </SidebarMenuItem>
</template>
