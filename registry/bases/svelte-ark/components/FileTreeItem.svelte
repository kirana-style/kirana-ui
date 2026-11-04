<script lang="ts" module>
  export type FileTreeEntry =
    | { name: string }
    | { name: string; items: FileTreeEntry[] }
</script>

<script lang="ts">
  /** One entry of `collapsible-file-tree`'s tree: a folder that opens on its entries, or a file. */
  import FileTreeItem from "./FileTreeItem.svelte"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { Button } from "../ui/button"
  import { fileTree } from "../../../styles/file-tree.styles"
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../ui/collapsible"

  let {
    item,
    folderIcon = "FolderIcon",
    fileIcon = "FileIcon",
  }: {
    item: FileTreeEntry
    folderIcon?: string
    fileIcon?: string
  } = $props()

  // The Hugeicons names, which upstream's two copies of the tree draw differently.

</script>

{#if 'items' in item}
  <Collapsible>
    <CollapsibleTrigger>
      {#snippet asChild(props)}
        <Button {...props()} class={props().class} style={props().style} variant="ghost" size="sm" sx={fileTree.folder}>
          <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" sx={fileTree.chevron} />
          <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons={folderIcon} phosphor="FolderIcon" remixicon="RiFolderLine" />
          {item.name}
        </Button>
      {/snippet}
    </CollapsibleTrigger>
    <CollapsibleContent sx={fileTree.content}>
      <div sx={fileTree.entries}>
        {#each item.items as child (child.name)}
          <FileTreeItem item={child} folderIcon={folderIcon} fileIcon={fileIcon} />
        {/each}
      </div>
    </CollapsibleContent>
  </Collapsible>
{:else}
  <Button variant="link" size="sm" sx={fileTree.file}>
    <IconPlaceholder lucide="FileIcon" tabler="IconFile" hugeicons={fileIcon} phosphor="FileIcon" remixicon="RiFileLine" />
    <span>
      {item.name}
    </span>
  </Button>
{/if}
