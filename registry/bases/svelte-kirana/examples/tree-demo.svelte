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

{#snippet folder()}
  <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="FolderIcon" phosphor="FolderIcon" remixicon="RiFolderLine" />
{/snippet}

{#snippet codeFile()}
  <IconPlaceholder lucide="FileCodeIcon" tabler="IconFileCode" hugeicons="File01Icon" phosphor="FileCodeIcon" remixicon="RiFileCodeLine" />
{/snippet}

{#snippet textFile()}
  <IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" hugeicons="FileIcon" phosphor="FileTextIcon" remixicon="RiFileTextLine" />
{/snippet}

<div sx={page.example}>
  <Tree aria-label="Project files" defaultExpandedValue={["src"]} defaultSelectedValue={["src/app.tsx"]} sx={styles.tree}>
    <TreeItem value="src" branch>
      <TreeItemContent>
        {@render folder()}
        <TreeItemText>src</TreeItemText>
      </TreeItemContent>
      <TreeGroup>
        <TreeItem value="src/components" branch>
          <TreeItemContent>
            {@render folder()}
            <TreeItemText>components</TreeItemText>
          </TreeItemContent>
          <TreeGroup>
            <TreeItem value="src/components/button.tsx">
              <TreeItemContent>
                {@render codeFile()}
                <TreeItemText>button.tsx</TreeItemText>
              </TreeItemContent>
            </TreeItem>
            <TreeItem value="src/components/card.tsx">
              <TreeItemContent>
                {@render codeFile()}
                <TreeItemText>card.tsx</TreeItemText>
              </TreeItemContent>
            </TreeItem>
          </TreeGroup>
        </TreeItem>
        <TreeItem value="src/app.tsx">
          <TreeItemContent>
            {@render codeFile()}
            <TreeItemText>app.tsx</TreeItemText>
          </TreeItemContent>
        </TreeItem>
        <TreeItem value="src/main.tsx">
          <TreeItemContent>
            {@render codeFile()}
            <TreeItemText>main.tsx</TreeItemText>
          </TreeItemContent>
        </TreeItem>
      </TreeGroup>
    </TreeItem>
    <TreeItem value="public" branch>
      <TreeItemContent>
        {@render folder()}
        <TreeItemText>public</TreeItemText>
      </TreeItemContent>
      <TreeGroup>
        <TreeItem value="public/favicon.svg">
          <TreeItemContent>
            {@render textFile()}
            <TreeItemText>favicon.svg</TreeItemText>
          </TreeItemContent>
        </TreeItem>
      </TreeGroup>
    </TreeItem>
    <TreeItem value="package.json">
      <TreeItemContent>
        {@render codeFile()}
        <TreeItemText>package.json</TreeItemText>
      </TreeItemContent>
    </TreeItem>
    <TreeItem value="README.md">
      <TreeItemContent>
        {@render textFile()}
        <TreeItemText>README.md</TreeItemText>
      </TreeItemContent>
    </TreeItem>
  </Tree>
</div>
