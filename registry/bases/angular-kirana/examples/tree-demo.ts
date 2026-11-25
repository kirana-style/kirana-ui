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
  selector: "tree-demo",
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
        aria-label="Project files"
        [defaultExpandedValue]="['src']"
        [defaultSelectedValue]="['src/app.tsx']"
        [sx]="styles.tree"
      >
        <div kuiTreeItem [value]="'src'" [branch]="true">
          <div kuiTreeItemContent>
            <svg
              iconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
            <span kuiTreeItemText>src</span>
          </div>
          <div kuiTreeGroup>
            <div kuiTreeItem [value]="'src/components'" [branch]="true">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                ></svg>
                <span kuiTreeItemText>components</span>
              </div>
              <div kuiTreeGroup>
                <div kuiTreeItem [value]="'src/components/button.tsx'">
                  <div kuiTreeItemContent>
                    <svg
                      iconPlaceholder
                      lucide="FileCodeIcon"
                      tabler="IconFileCode"
                      hugeicons="File01Icon"
                      phosphor="FileCodeIcon"
                      remixicon="RiFileCodeLine"
                    ></svg>
                    <span kuiTreeItemText>button.tsx</span>
                  </div>
                </div>
                <div kuiTreeItem [value]="'src/components/card.tsx'">
                  <div kuiTreeItemContent>
                    <svg
                      iconPlaceholder
                      lucide="FileCodeIcon"
                      tabler="IconFileCode"
                      hugeicons="File01Icon"
                      phosphor="FileCodeIcon"
                      remixicon="RiFileCodeLine"
                    ></svg>
                    <span kuiTreeItemText>card.tsx</span>
                  </div>
                </div>
              </div>
            </div>
            <div kuiTreeItem [value]="'src/app.tsx'">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FileCodeIcon"
                  tabler="IconFileCode"
                  hugeicons="File01Icon"
                  phosphor="FileCodeIcon"
                  remixicon="RiFileCodeLine"
                ></svg>
                <span kuiTreeItemText>app.tsx</span>
              </div>
            </div>
            <div kuiTreeItem [value]="'src/main.tsx'">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FileCodeIcon"
                  tabler="IconFileCode"
                  hugeicons="File01Icon"
                  phosphor="FileCodeIcon"
                  remixicon="RiFileCodeLine"
                ></svg>
                <span kuiTreeItemText>main.tsx</span>
              </div>
            </div>
          </div>
        </div>
        <div kuiTreeItem [value]="'public'" [branch]="true">
          <div kuiTreeItemContent>
            <svg
              iconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            ></svg>
            <span kuiTreeItemText>public</span>
          </div>
          <div kuiTreeGroup>
            <div kuiTreeItem [value]="'public/favicon.svg'">
              <div kuiTreeItemContent>
                <svg
                  iconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="FileIcon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                ></svg>
                <span kuiTreeItemText>favicon.svg</span>
              </div>
            </div>
          </div>
        </div>
        <div kuiTreeItem [value]="'package.json'">
          <div kuiTreeItemContent>
            <svg
              iconPlaceholder
              lucide="FileCodeIcon"
              tabler="IconFileCode"
              hugeicons="File01Icon"
              phosphor="FileCodeIcon"
              remixicon="RiFileCodeLine"
            ></svg>
            <span kuiTreeItemText>package.json</span>
          </div>
        </div>
        <div kuiTreeItem [value]="'README.md'">
          <div kuiTreeItemContent>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
            <span kuiTreeItemText>README.md</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TreeDemo {
  protected readonly styles = styles
  protected readonly page = page
}
