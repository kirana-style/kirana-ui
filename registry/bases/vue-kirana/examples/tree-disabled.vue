<script setup lang="ts">
import { css } from "@kirana-style/core"
import { h } from "vue"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemContent,
  TreeItemText,
} from "../ui/tree"

const styles = {
  tree: css({ maxWidth: containerSize.xs }),
}

const Mailbox = ({ label }: { label: string }) =>
  h(TreeItemContent, null, () => [
    h(IconPlaceholder, {
      lucide: "FolderIcon",
      tabler: "IconFolder",
      hugeicons: "FolderIcon",
      phosphor: "FolderIcon",
      remixicon: "RiFolderLine",
    }),
    h(TreeItemText, null, () => label),
  ])
</script>

<template>
  <div :sx="page.example">
    <Tree
      aria-label="Mailboxes"
      :default-expanded-value="['inbox']"
      :default-selected-value="['inbox']"
      :sx="styles.tree"
    >
      <TreeItem value="inbox" branch>
        <Mailbox label="Inbox" />
        <TreeGroup>
          <TreeItem value="inbox/receipts">
            <Mailbox label="Receipts" />
          </TreeItem>
          <TreeItem value="inbox/travel">
            <Mailbox label="Travel" />
          </TreeItem>
        </TreeGroup>
      </TreeItem>
      <TreeItem value="archive" branch disabled>
        <Mailbox label="Archive (syncing)" />
        <TreeGroup>
          <TreeItem value="archive/2025">
            <Mailbox label="2025" />
          </TreeItem>
        </TreeGroup>
      </TreeItem>
      <TreeItem value="sent">
        <Mailbox label="Sent" />
      </TreeItem>
    </Tree>
  </div>
</template>
