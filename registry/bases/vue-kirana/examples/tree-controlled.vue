<script setup lang="ts">
import { css } from "@kirana-style/core"
import { defineComponent, h, ref } from "vue"
import type { PropType, VNode } from "vue"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
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
  actions: css({ display: "flex", gap: space[2] }),
}

type Node = { name: string; children?: Node[] }

const DOCS: Node[] = [
  {
    name: "Getting started",
    children: [{ name: "Installation" }, { name: "Configuration" }],
  },
  {
    name: "Guides",
    children: [
      { name: "Theming" },
      {
        name: "Forms",
        children: [{ name: "Validation" }, { name: "Server actions" }],
      },
    ],
  },
  { name: "Changelog" },
]

/** The value of every branch under `nodes`. */
function branches(nodes: Node[], parent = ""): string[] {
  return nodes.flatMap((node) =>
    node.children
      ? [
          `${parent}${node.name}`,
          ...branches(node.children, `${parent}${node.name}/`),
        ]
      : []
  )
}

/** Each node under `nodes`, a branch drawing its children in its group. */
const Nodes = defineComponent({
  props: {
    nodes: { type: Array as PropType<Node[]>, required: true },
    parent: { type: String, default: "" },
  },
  setup(props): () => VNode[] {
    return () =>
      props.nodes.map((node) => {
        const value = `${props.parent}${node.name}`
        return h(
          TreeItem,
          { key: value, value, branch: Boolean(node.children) },
          () => [
            h(TreeItemContent, null, () => [
              node.children
                ? h(IconPlaceholder, {
                    lucide: "FolderIcon",
                    tabler: "IconFolder",
                    hugeicons: "FolderIcon",
                    phosphor: "FolderIcon",
                    remixicon: "RiFolderLine",
                  })
                : h(IconPlaceholder, {
                    lucide: "FileTextIcon",
                    tabler: "IconFileText",
                    hugeicons: "FileIcon",
                    phosphor: "FileTextIcon",
                    remixicon: "RiFileTextLine",
                  }),
              h(TreeItemText, null, () => node.name),
            ]),
            node.children
              ? h(TreeGroup, null, () =>
                  h(Nodes, { nodes: node.children!, parent: `${value}/` })
                )
              : null,
          ]
        )
      })
  },
})

const expanded = ref<string[]>(["Guides"])
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.column">
      <div :sx="styles.actions">
        <Button variant="outline" size="sm" @click="expanded = branches(DOCS)">
          Expand all
        </Button>
        <Button variant="outline" size="sm" @click="expanded = []">
          Collapse all
        </Button>
      </div>
      <Tree v-model:expandedValue="expanded" aria-label="Documentation">
        <Nodes :nodes="DOCS" />
      </Tree>
    </div>
  </div>
</template>
