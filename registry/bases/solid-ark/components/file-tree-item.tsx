/** One entry of `collapsible-file-tree`'s tree: a folder that opens on its entries, or a file. */
import { props as styleProps } from "@kirana-style/core"
import { For, mergeProps } from "solid-js"

import { Button } from "../ui/button"
import { fileTree } from "../../../styles/file-tree.styles"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { IconPlaceholder } from "../ui/icon-placeholder"

export type FileTreeEntry =
  | { name: string }
  | { name: string; items: FileTreeEntry[] }

// The Hugeicons names, which upstream's two copies of the tree draw differently.
export function FileTreeItem(props: {
  item: FileTreeEntry
  folderIcon?: string
  fileIcon?: string
}) {
  const merged = mergeProps(
    { folderIcon: "FolderIcon", fileIcon: "FileIcon" },
    props
  )
  const item = () => merged.item
  return "items" in item() ? (
    <Collapsible>
      <CollapsibleTrigger
        asChild={(childProps) => (
          <Button
            {...childProps()}
            variant="ghost"
            size="sm"
            sx={fileTree.folder}
          >
            <IconPlaceholder
              lucide="ChevronRightIcon"
              tabler="IconChevronRight"
              hugeicons="ArrowRight01Icon"
              phosphor="CaretRightIcon"
              remixicon="RiArrowRightSLine"
              {...styleProps(fileTree.chevron)}
            />
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons={merged.folderIcon}
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
            />
            {item().name}
          </Button>
        )}
      />
      <CollapsibleContent sx={fileTree.content}>
        <div sx={fileTree.entries}>
          <For each={(item() as { items: FileTreeEntry[] }).items}>
            {(child) => (
              <FileTreeItem
                item={child}
                folderIcon={merged.folderIcon}
                fileIcon={merged.fileIcon}
              />
            )}
          </For>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <Button variant="link" size="sm" sx={fileTree.file}>
      <IconPlaceholder
        lucide="FileIcon"
        tabler="IconFile"
        hugeicons={merged.fileIcon}
        phosphor="FileIcon"
        remixicon="RiFileLine"
      />
      <span>{item().name}</span>
    </Button>
  )
}
