import { createSignal, For } from "solid-js"
import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../ui/icon-placeholder"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemContent,
  TreeItemText,
} from "../ui/tree"

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

export default function TreeMultiple() {
  const [selected, setSelected] = createSignal<string[]>([
    "2026-summer/beach.jpg",
    "2026-summer/sunset.jpg",
    "2026-winter/cabin.jpg",
  ])

  return (
    <div sx={page.example}>
      <div sx={styles.column}>
        <Tree<string>
          aria-label="Photos"
          selectionMode="multiple"
          defaultExpandedValue={Object.keys(PHOTOS)}
          selectedValue={selected()}
          onSelectedChange={(value) => setSelected(value)}
        >
          <For each={Object.entries(PHOTOS)}>
            {([album, photos]) => (
              <TreeItem value={album} branch>
                <TreeItemContent>
                  <IconPlaceholder
                    lucide="FolderIcon"
                    tabler="IconFolder"
                    hugeicons="FolderIcon"
                    phosphor="FolderIcon"
                    remixicon="RiFolderLine"
                  />
                  <TreeItemText>{album}</TreeItemText>
                </TreeItemContent>
                <TreeGroup>
                  <For each={photos}>
                    {(photo) => (
                      <TreeItem value={`${album}/${photo}`}>
                        <TreeItemContent>
                          <IconPlaceholder
                            lucide="ImageIcon"
                            tabler="IconPhoto"
                            hugeicons="ImageIcon"
                            phosphor="ImageIcon"
                            remixicon="RiImageLine"
                          />
                          <TreeItemText>{photo}</TreeItemText>
                        </TreeItemContent>
                      </TreeItem>
                    )}
                  </For>
                </TreeGroup>
              </TreeItem>
            )}
          </For>
        </Tree>
        <p sx={styles.count} aria-live="polite">
          {selected().length} selected
        </p>
      </div>
    </div>
  )
}
