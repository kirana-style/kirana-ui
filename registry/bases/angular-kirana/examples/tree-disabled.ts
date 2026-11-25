import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "tree-disabled",
  imports: [
    IconPlaceholder,
    SxDirective,
    Tree,
    TreeGroup,
    TreeItem,
    TreeItemContent,
    TreeItemText,
  ],
  template: `
    <div [sx]="page.example">
      <div
        kuiTree
        aria-label="Mailboxes"
        [defaultExpandedValue]="['inbox']"
        [defaultSelectedValue]="['inbox']"
        [sx]="styles.tree"
      >
        <div kuiTreeItem [value]="'inbox'" [branch]="true">
          <div kuiTreeItemContent>
            <svg
              iconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
            <span kuiTreeItemText>Inbox</span>
          </div>
          <div kuiTreeGroup>
            <div kuiTreeItem [value]="'inbox/receipts'">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                ></svg>
                <span kuiTreeItemText>Receipts</span>
              </div>
            </div>
            <div kuiTreeItem [value]="'inbox/travel'">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                ></svg>
                <span kuiTreeItemText>Travel</span>
              </div>
            </div>
          </div>
        </div>
        <div kuiTreeItem [value]="'archive'" [branch]="true" [disabled]="true">
          <div kuiTreeItemContent>
            <svg
              iconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
            <span kuiTreeItemText>Archive (syncing)</span>
          </div>
          <div kuiTreeGroup>
            <div kuiTreeItem [value]="'archive/2025'">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                ></svg>
                <span kuiTreeItemText>2025</span>
              </div>
            </div>
          </div>
        </div>
        <div kuiTreeItem [value]="'sent'">
          <div kuiTreeItemContent>
            <svg
              iconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
            <span kuiTreeItemText>Sent</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TreeDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
