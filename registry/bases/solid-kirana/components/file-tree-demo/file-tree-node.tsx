import { For, splitProps } from "solid-js"
import { css, props as styleProps, select } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { Button } from "../../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible"
import { theme } from "../../../../core/tokens"
import { duration, easing, fontWeight, space } from "../../../../core/scales"
import type { Sx } from "@kirana-style/core"

export type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

export function FileTreeNode(props: {
  node: FileNode
  selected: string
  onselect: (path: string) => void
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, [
    "node",
    "selected",
    "onselect",
    "sx",
    "class",
  ])
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

  return (
    <>
      {local.node.type === "folder" ? (
        <Collapsible defaultOpen>
          <CollapsibleTrigger
            asChild={(childProps) => (
              <Button
                {...childProps()}
                variant="ghost"
                size="sm"
                sx={[styles.fileTreeNodeButton, styles.fileTreeNodeTrigger]}
              >
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                  {...styleProps(styles.fileTreeNodeIconPlaceholder)}
                />
                <IconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                />{" "}
                {local.node.name}
              </Button>
            )}
          />
          <CollapsibleContent>
            <div sx={styles.fileTreeNodeDiv}>
              <For each={local.node.children}>
                {(child) => (
                  <FileTreeNode
                    node={child}
                    selected={local.selected}
                    onselect={local.onselect}
                  />
                )}
              </For>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          sx={[
            styles.fileTreeNodeButton,
            local.selected === local.node.path && styles.selected,
          ]}
          aria-current={local.selected === local.node.path ? "true" : undefined}
          onClick={() => {
            local.onselect(local.node.path)
          }}
        >
          <IconPlaceholder
            lucide="FileIcon"
            tabler="IconFile"
            hugeicons="FileIcon"
            phosphor="FileIcon"
            remixicon="RiFileLine"
          />{" "}
          {local.node.name}
        </Button>
      )}
    </>
  )
}
