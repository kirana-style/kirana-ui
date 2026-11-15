<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import FileTreeNode from "../components/file-tree-demo/FileTreeNode.vue"
import type { FileNode } from "../components/file-tree-demo/FileTreeNode.vue"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

const files: FileNode[] = [
  {
    type: "folder",
    name: "app",
    path: "app",
    children: [
      { type: "file", name: "layout.tsx", path: "app/layout.tsx" },
      { type: "file", name: "page.tsx", path: "app/page.tsx" },
    ],
  },
  {
    type: "folder",
    name: "components",
    path: "components",
    children: [
      {
        type: "folder",
        name: "ui",
        path: "components/ui",
        children: [
          {
            type: "file",
            name: "button.tsx",
            path: "components/ui/button.tsx",
          },
        ],
      },
      {
        type: "file",
        name: "login-form.tsx",
        path: "components/login-form.tsx",
      },
    ],
  },
]

const selected = ref("components/ui/button.tsx")
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.div">
      <FileTreeNode
        v-for="node in files"
        :key="node.path"
        :node="node"
        :selected="selected"
        @select="(path: string) => (selected = path)"
      />
    </div>
  </div>
</template>
