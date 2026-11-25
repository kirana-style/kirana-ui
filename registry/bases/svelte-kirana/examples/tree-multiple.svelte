<script lang="ts">
  import { css } from "@kirana-style/core"

  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { containerSize, space } from "../../../core/scales"
  import { theme } from "../../../core/tokens"
  import { page } from "../../../styles/page.styles"
  import { Tree, TreeGroup, TreeItem, TreeItemContent, TreeItemText } from "../ui/tree"

  const styles = {
    column: css({
      display: "flex",
      width: "100%",
      maxWidth: containerSize.xs,
      flexDirection: "column",
      gap: space[3],
    }),
    count: css({ color: theme.mutedForeground }),
  }

  const PHOTOS = {
    "2026-summer": ["beach.jpg", "harbour.jpg", "sunset.jpg"],
    "2026-winter": ["snow.jpg", "cabin.jpg"],
  }

  let selected = $state<string[]>(["2026-summer/beach.jpg", "2026-summer/sunset.jpg", "2026-winter/cabin.jpg"])
</script>

<div sx={page.example}>
  <div sx={styles.column}>
    <Tree aria-label="Photos" selectionMode="multiple" defaultExpandedValue={Object.keys(PHOTOS)} bind:selectedValue={selected}>
      {#each Object.entries(PHOTOS) as [album, photos] (album)}
        <TreeItem value={album} branch>
          <TreeItemContent>
            <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="FolderIcon" phosphor="FolderIcon" remixicon="RiFolderLine" />
            <TreeItemText>{album}</TreeItemText>
          </TreeItemContent>
          <TreeGroup>
            {#each photos as photo (photo)}
              <TreeItem value={`${album}/${photo}`}>
                <TreeItemContent>
                  <IconPlaceholder lucide="ImageIcon" tabler="IconPhoto" hugeicons="ImageIcon" phosphor="ImageIcon" remixicon="RiImageLine" />
                  <TreeItemText>{photo}</TreeItemText>
                </TreeItemContent>
              </TreeItem>
            {/each}
          </TreeGroup>
        </TreeItem>
      {/each}
    </Tree>
    <p sx={styles.count} aria-live="polite">
      {selected.length} selected
    </p>
  </div>
</div>
