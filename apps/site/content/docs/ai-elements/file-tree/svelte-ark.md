# File Tree

<!-- ::preview item="file-tree-demo" height="370" combinations="svelte/ark" -->

File Tree is the files the agent changed, shown as folders you can open. A folder is a [Collapsible](/docs/components/collapsible). A file is a [Button](/docs/components/button). For a single file the agent read or edited, use a [Tool](/docs/ai-elements/tool) line instead.

## Installation

File Tree is built with the [Collapsible](/docs/components/collapsible) and [Button](/docs/components/button) components.

<!-- ::installation name="collapsible button" combinations="svelte/ark" -->

## Usage

Render nodes recursively. Nest each folder's children in its `CollapsibleContent`.

See [Collapsible](/docs/components/collapsible#file-tree).

The example draws each step with its own parts, which you copy beside it:

```svelte showLineNumbers title="FileTreeNode.svelte"
<script lang="ts" module>
  export type FileNode =
    | { type: "file"; name: string; path: string }
    | { type: "folder"; name: string; path: string; children: FileNode[] }
</script>

<script lang="ts">
  import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.svelte"
  import FileTreeNode from "./FileTreeNode.svelte"
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

  let { node, selected, onselect }: { node: FileNode; selected: string; onselect: (path: string) => void } = $props()
</script>

{#if node.type === 'folder'}
  <Collapsible defaultOpen>
    <CollapsibleTrigger>
      {#snippet asChild(props)}
        <Button {...props()} class={props().class} style={props().style} variant="ghost" size="sm" sx={[styles.fileTreeNodeButton, styles.fileTreeNodeTrigger]}>
          <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={styles.fileTreeNodeIconPlaceholder} />
          <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="FolderIcon" phosphor="FolderIcon" remixicon="RiFolderLine" />
          {node.name}
        </Button>
      {/snippet}
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div sx={styles.fileTreeNodeDiv}>
        {#each node.children as child (child.path)}
          <FileTreeNode node={child} selected={selected} {onselect} />
        {/each}
      </div>
    </CollapsibleContent>
  </Collapsible>
{:else}
  <Button variant="ghost" size="sm" sx={[styles.fileTreeNodeButton, selected === node.path && styles.selected]} aria-current={selected === node.path ? 'true' : undefined} onclick={() => { onselect(node.path) }}>
    <IconPlaceholder lucide="FileIcon" tabler="IconFile" hugeicons="FileIcon" phosphor="FileIcon" remixicon="RiFileLine" />
    {node.name}
  </Button>
{/if}
```
