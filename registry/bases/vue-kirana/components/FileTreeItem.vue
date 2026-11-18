<script setup lang="ts">
/** One entry of `collapsible-file-tree`'s tree: a folder that opens on its entries, or a file. */

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { fileTree } from "../../../styles/file-tree.styles"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

export type FileTreeEntry =
  | { name: string }
  | { name: string; items: FileTreeEntry[] }

// The Hugeicons names, which upstream's two copies of the tree draw differently.
const { folderIcon = "FolderIcon", fileIcon = "FileIcon" } = defineProps<{
  item: FileTreeEntry
  folderIcon?: string
  fileIcon?: string
}>()
</script>

<template>
  <Collapsible v-if="'items' in item">
    <CollapsibleTrigger as-child>
      <Button variant="ghost" size="sm" :sx="fileTree.folder">
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
          :sx="fileTree.chevron"
        />
        <IconPlaceholder
          lucide="FolderIcon"
          tabler="IconFolder"
          :hugeicons="folderIcon"
          phosphor="FolderIcon"
          remixicon="RiFolderLine"
        />
        {{ item.name }}
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent :sx="fileTree.content">
      <div :sx="fileTree.entries">
        <FileTreeItem
          v-for="child in item.items"
          :key="child.name"
          :item="child"
          :folder-icon="folderIcon"
          :file-icon="fileIcon"
        />
      </div>
    </CollapsibleContent>
  </Collapsible>
  <Button v-else variant="link" size="sm" :sx="fileTree.file">
    <IconPlaceholder
      lucide="FileIcon"
      tabler="IconFile"
      :hugeicons="fileIcon"
      phosphor="FileIcon"
      remixicon="RiFileLine"
    />
    <span>{{ item.name }}</span>
  </Button>
</template>
