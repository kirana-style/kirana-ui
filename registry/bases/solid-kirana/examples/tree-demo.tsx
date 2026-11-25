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

function Folder() {
  return (
    <IconPlaceholder
      lucide="FolderIcon"
      tabler="IconFolder"
      hugeicons="FolderIcon"
      phosphor="FolderIcon"
      remixicon="RiFolderLine"
    />
  )
}

function CodeFile() {
  return (
    <IconPlaceholder
      lucide="FileCodeIcon"
      tabler="IconFileCode"
      hugeicons="File01Icon"
      phosphor="FileCodeIcon"
      remixicon="RiFileCodeLine"
    />
  )
}

function TextFile() {
  return (
    <IconPlaceholder
      lucide="FileTextIcon"
      tabler="IconFileText"
      hugeicons="FileIcon"
      phosphor="FileTextIcon"
      remixicon="RiFileTextLine"
    />
  )
}

export default function TreeDemo() {
  return (
    <div sx={page.example}>
      <Tree
        aria-label="Project files"
        defaultExpandedValue={["src"]}
        defaultSelectedValue={["src/app.tsx"]}
        sx={styles.tree}
      >
        <TreeItem value="src" branch>
          <TreeItemContent>
            <Folder />
            <TreeItemText>src</TreeItemText>
          </TreeItemContent>
          <TreeGroup>
            <TreeItem value="src/components" branch>
              <TreeItemContent>
                <Folder />
                <TreeItemText>components</TreeItemText>
              </TreeItemContent>
              <TreeGroup>
                <TreeItem value="src/components/button.tsx">
                  <TreeItemContent>
                    <CodeFile />
                    <TreeItemText>button.tsx</TreeItemText>
                  </TreeItemContent>
                </TreeItem>
                <TreeItem value="src/components/card.tsx">
                  <TreeItemContent>
                    <CodeFile />
                    <TreeItemText>card.tsx</TreeItemText>
                  </TreeItemContent>
                </TreeItem>
              </TreeGroup>
            </TreeItem>
            <TreeItem value="src/app.tsx">
              <TreeItemContent>
                <CodeFile />
                <TreeItemText>app.tsx</TreeItemText>
              </TreeItemContent>
            </TreeItem>
            <TreeItem value="src/main.tsx">
              <TreeItemContent>
                <CodeFile />
                <TreeItemText>main.tsx</TreeItemText>
              </TreeItemContent>
            </TreeItem>
          </TreeGroup>
        </TreeItem>
        <TreeItem value="public" branch>
          <TreeItemContent>
            <Folder />
            <TreeItemText>public</TreeItemText>
          </TreeItemContent>
          <TreeGroup>
            <TreeItem value="public/favicon.svg">
              <TreeItemContent>
                <TextFile />
                <TreeItemText>favicon.svg</TreeItemText>
              </TreeItemContent>
            </TreeItem>
          </TreeGroup>
        </TreeItem>
        <TreeItem value="package.json">
          <TreeItemContent>
            <CodeFile />
            <TreeItemText>package.json</TreeItemText>
          </TreeItemContent>
        </TreeItem>
        <TreeItem value="README.md">
          <TreeItemContent>
            <TextFile />
            <TreeItemText>README.md</TreeItemText>
          </TreeItemContent>
        </TreeItem>
      </Tree>
    </div>
  )
}
