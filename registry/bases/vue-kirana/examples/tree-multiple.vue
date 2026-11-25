<script setup lang="ts">
import { css } from "@kirana-style/core"
import { ref } from "vue"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemContent,
  TreeItemText,
} from "../ui/tree"

const styles = {
  column: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: space[3],
  }),
  count: css({ color: theme.mutedForeground }),
}

const PHOTOS = {
  "2026-summer": ["beach.jpg", "harbour.jpg", "sunset.jpg"],
  "2026-winter": ["snow.jpg", "cabin.jpg"],
}

const selected = ref<string[]>([
  "2026-summer/beach.jpg",
  "2026-summer/sunset.jpg",
  "2026-winter/cabin.jpg",
])
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.column">
      <Tree
        v-model:selectedValue="selected"
        aria-label="Photos"
        selection-mode="multiple"
        :default-expanded-value="Object.keys(PHOTOS)"
      >
        <TreeItem
          v-for="[album, photos] in Object.entries(PHOTOS)"
          :key="album"
          :value="album"
          branch
        >
          <TreeItemContent>
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            />
            <TreeItemText>{{ album }}</TreeItemText>
          </TreeItemContent>
          <TreeGroup>
            <TreeItem
              v-for="photo in photos"
              :key="photo"
              :value="`${album}/${photo}`"
            >
              <TreeItemContent>
                <IconPlaceholder
                  lucide="ImageIcon"
                  tabler="IconPhoto"
                  hugeicons="ImageIcon"
                  phosphor="ImageIcon"
                  remixicon="RiImageLine"
                />
                <TreeItemText>{{ photo }}</TreeItemText>
              </TreeItemContent>
            </TreeItem>
          </TreeGroup>
        </TreeItem>
      </Tree>
      <p :sx="styles.count" aria-live="polite">
        {{ selected.length }} selected
      </p>
    </div>
  </div>
</template>
