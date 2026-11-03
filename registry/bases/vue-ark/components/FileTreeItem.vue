<script setup lang="ts">
/** One entry of `collapsible-file-tree`'s tree: a folder that opens on its entries, or a file. */
import { css, relation } from "@kirana-style/core"

import { axes } from "../../../core/axes"
import { duration, easing, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
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

const group = relation("file-tree-folder")
const styles = {
  // Anchored in the handle: the lint rule reads the script block alone and would miss an anchor
  // in the template (KF-090, for Kirana's next release).
  folder: css(group.anchor, {
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    transitionProperty: "none",
    transitionDuration: "0s",
    transitionTimingFunction: "ease",
    backgroundColor: { ":hover": theme.accent },
    color: { ":hover": theme.accentForeground },
  }),
  chevron: css({
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    rotate: { [group.within('[data-state="open"]')]: "90deg" },
  }),
  content: css({
    marginTop: { "*": null, base: space[1] },
    marginLeft: { "*": null, base: space[5], [axes.style.lyra]: space[4] },
  }),
  entries: css({ display: "flex", flexDirection: "column", gap: space[1] }),
  file: css({
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[2] },
    color: theme.foreground,
  }),
}
</script>

<template>
  <Collapsible v-if="'items' in item">
    <CollapsibleTrigger as-child>
      <Button variant="ghost" size="sm" :sx="styles.folder">
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
          :sx="styles.chevron"
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
    <CollapsibleContent :sx="styles.content">
      <div :sx="styles.entries">
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
  <Button v-else variant="link" size="sm" :sx="styles.file">
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
