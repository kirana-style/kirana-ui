<script lang="ts">
  import { css } from "@kirana-style/core"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { containerSize } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import { Tree, TreeGroup, TreeItem, TreeItemContent, TreeItemText } from "../ui/tree"

  const styles = {
    tree: css({ maxWidth: containerSize.xs }),
  }
</script>

{#snippet mailbox(label: string)}
  <TreeItemContent>
    <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="FolderIcon" phosphor="FolderIcon" remixicon="RiFolderLine" />
    <TreeItemText>{label}</TreeItemText>
  </TreeItemContent>
{/snippet}

<div sx={page.example}>
  <Tree aria-label="Mailboxes" defaultExpandedValue={["inbox"]} defaultSelectedValue={["inbox"]} sx={styles.tree}>
    <TreeItem value="inbox" branch>
      {@render mailbox("Inbox")}
      <TreeGroup>
        <TreeItem value="inbox/receipts">
          {@render mailbox("Receipts")}
        </TreeItem>
        <TreeItem value="inbox/travel">
          {@render mailbox("Travel")}
        </TreeItem>
      </TreeGroup>
    </TreeItem>
    <TreeItem value="archive" branch disabled>
      {@render mailbox("Archive (syncing)")}
      <TreeGroup>
        <TreeItem value="archive/2025">
          {@render mailbox("2025")}
        </TreeItem>
      </TreeGroup>
    </TreeItem>
    <TreeItem value="sent">
      {@render mailbox("Sent")}
    </TreeItem>
  </Tree>
</div>
