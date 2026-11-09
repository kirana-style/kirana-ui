# File Tree

<!-- ::preview item="file-tree-demo" height="370" combinations="vue/ark" -->

File Tree is the files the agent changed, shown as folders you can open. A folder is a [Collapsible](/docs/components/collapsible). A file is a [Button](/docs/components/button). For a single file the agent read or edited, use a [Tool](/docs/ai-elements/tool) line instead.

## Installation

File Tree is built with the [Collapsible](/docs/components/collapsible) and [Button](/docs/components/button) components.

<!-- ::installation name="collapsible button" combinations="vue/ark" -->

## Usage

Render nodes recursively. Nest each folder's children in its `CollapsibleContent`.

See [Collapsible](/docs/components/collapsible#file-tree).

The example draws each step with its own parts, which you copy beside it:

```vue showLineNumbers title="FileTreeNode.vue"
<script setup lang="ts">
import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { css, select } from "@kirana-style/core"
import { theme } from "@/lib/kirana/tokens"
import { duration, easing, fontWeight, space } from "@/lib/kirana/scales"

const styles = {
  fileTreeNodeButton: css({
    width: { "*": null, base: "100%" },
    justifyContent: { "*": null, base: "flex-start" },
    fontWeight: { "*": null, base: fontWeight.normal },
    backgroundColor: {
      '[aria-expanded="true"]': {
        base: "transparent",
        ":hover": `light-dark(${theme.muted}, color-mix(in oklab, ${theme.muted} 50%, transparent))`,
      },
    },
  }),
  // The chevron of an open folder, upstream's `group-data-panel-open/button:rotate-90` (React Aria's
  // `group-data-expanded/folder:`): the trigger's `aria-expanded`, which both bases set.
  fileTreeNodeTrigger: css({
    [select.child("svg:first-child")]: {
      rotate: { '[aria-expanded="true"]': "90deg" },
    },
  }),
  fileTreeNodeIconPlaceholder: css({
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
  }),
  // The file that is open: `bg-accent text-accent-foreground` (a hover keeps the ghost button's).
  selected: css({
    backgroundColor: theme.accent,
    color: theme.accentForeground,
  }),
  fileTreeNodeDiv: css({
    marginLeft: space[4],
    display: "flex",
    flexDirection: "column",
  }),
}

export type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

defineProps<{ node: FileNode; selected: string }>()
const emit = defineEmits<{ select: [path: string] }>()
</script>

<template>
  <Collapsible v-if="node.type === 'folder'" default-open>
    <CollapsibleTrigger as-child>
      <Button
        variant="ghost"
        size="sm"
        :sx="[styles.fileTreeNodeButton, styles.fileTreeNodeTrigger]"
      >
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
          :sx="styles.fileTreeNodeIconPlaceholder"
        />
        <IconPlaceholder
          lucide="FolderIcon"
          tabler="IconFolder"
          hugeicons="FolderIcon"
          phosphor="FolderIcon"
          remixicon="RiFolderLine"
        />
        {{ node.name }}
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div :sx="styles.fileTreeNodeDiv">
        <FileTreeNode
          v-for="child in node.children"
          :key="child.path"
          :node="child"
          :selected="selected"
          @select="(path: string) => emit('select', path)"
        />
      </div>
    </CollapsibleContent>
  </Collapsible>
  <Button
    v-else
    variant="ghost"
    size="sm"
    :sx="[styles.fileTreeNodeButton, selected === node.path && styles.selected]"
    :aria-current="selected === node.path ? 'true' : undefined"
    @click="emit('select', node.path)"
  >
    <IconPlaceholder
      lucide="FileIcon"
      tabler="IconFile"
      hugeicons="FileIcon"
      phosphor="FileIcon"
      remixicon="RiFileLine"
    />
    {{ node.name }}
  </Button>
</template>
```
