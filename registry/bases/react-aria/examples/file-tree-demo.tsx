import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent } from "../ui/collapsible"
import { css, select, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

type FileNode =
  | { type: "file"; name: string; path: string }
  | { type: "folder"; name: string; path: string; children: FileNode[] }

const files: FileNode[] = [
  {
    type: "folder",
    name: "app",
    path: "app",
    children: [
      { type: "file", name: "layout.tsx", path: "app/layout.tsx" },
      { type: "file", name: "page.tsx", path: "app/page.tsx" },
    ],
  },
  {
    type: "folder",
    name: "components",
    path: "components",
    children: [
      {
        type: "folder",
        name: "ui",
        path: "components/ui",
        children: [
          {
            type: "file",
            name: "button.tsx",
            path: "components/ui/button.tsx",
          },
        ],
      },
      {
        type: "file",
        name: "login-form.tsx",
        path: "components/login-form.tsx",
      },
    ],
  },
]

function FileTreeNode({
  node,
  selected,
  onSelect,
}: {
  node: FileNode
  selected: string
  onSelect: (path: string) => void
}) {
  switch (node.type) {
    case "folder":
      return (
        <Collapsible defaultExpanded>
          <Button
            slot="trigger"
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
            />
            {node.name}
          </Button>
          <CollapsibleContent>
            <div sx={styles.fileTreeNodeDiv}>
              {node.children.map((child) => (
                <FileTreeNode
                  key={child.path}
                  node={child}
                  selected={selected}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    case "file":
      return (
        <Button
          variant="ghost"
          size="sm"
          sx={[
            styles.fileTreeNodeButton,
            selected === node.path && styles.selected,
          ]}
          aria-current={selected === node.path ? "true" : undefined}
          onPress={() => onSelect(node.path)}
        >
          <IconPlaceholder
            lucide="FileIcon"
            tabler="IconFile"
            hugeicons="FileIcon"
            phosphor="FileIcon"
            remixicon="RiFileLine"
          />
          {node.name}
        </Button>
      )
    default: {
      const unreachable: never = node
      return unreachable
    }
  }
}

export default function FileTreeDemo() {
  const [selected, setSelected] = React.useState("components/ui/button.tsx")

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        {files.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>
    </div>
  )
}
