<script lang="ts">
  import { css } from "@kirana-style/core"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { containerSize, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import { Button } from "../ui/button"
  import { Tree, TreeGroup, TreeItem, TreeItemContent, TreeItemText } from "../ui/tree"

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
      node.children ? [`${parent}${node.name}`, ...branches(node.children, `${parent}${node.name}/`)] : []
    )
  }

  let expanded = $state<string[]>(["Guides"])
</script>

{#snippet nodesOf(nodes: Node[], parent: string)}
  {#each nodes as node (`${parent}${node.name}`)}
    {@const value = `${parent}${node.name}`}
    <TreeItem {value} branch={Boolean(node.children)}>
      <TreeItemContent>
        {#if node.children}
          <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="FolderIcon" phosphor="FolderIcon" remixicon="RiFolderLine" />
        {:else}
          <IconPlaceholder lucide="FileTextIcon" tabler="IconFileText" hugeicons="FileIcon" phosphor="FileTextIcon" remixicon="RiFileTextLine" />
        {/if}
        <TreeItemText>{node.name}</TreeItemText>
      </TreeItemContent>
      {#if node.children}
        <TreeGroup>
          {@render nodesOf(node.children, `${value}/`)}
        </TreeGroup>
      {/if}
    </TreeItem>
  {/each}
{/snippet}

<div sx={page.example}>
  <div sx={styles.column}>
    <div sx={styles.actions}>
      <Button variant="outline" size="sm" onclick={() => (expanded = branches(DOCS))}>Expand all</Button>
      <Button variant="outline" size="sm" onclick={() => (expanded = [])}>Collapse all</Button>
    </div>
    <Tree aria-label="Documentation" bind:expandedValue={expanded}>
      {@render nodesOf(DOCS, "")}
    </Tree>
  </div>
</div>
