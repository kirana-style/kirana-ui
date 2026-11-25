import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../ui/icon-placeholder"
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

function Mailbox(props: { label: string }) {
  return (
    <TreeItemContent>
      <IconPlaceholder
        lucide="FolderIcon"
        tabler="IconFolder"
        hugeicons="FolderIcon"
        phosphor="FolderIcon"
        remixicon="RiFolderLine"
      />
      <TreeItemText>{props.label}</TreeItemText>
    </TreeItemContent>
  )
}

export default function TreeDisabled() {
  return (
    <div sx={page.example}>
      <Tree
        aria-label="Mailboxes"
        defaultExpandedValue={["inbox"]}
        defaultSelectedValue={["inbox"]}
        sx={styles.tree}
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
  )
}
