"use client"

import * as React from "react"

import { Tree as TreePrimitive } from "@kirana-ui/react/tree"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { menuRowBase, menuRowPadding } from "../../../styles/menu.styles"
import { tree } from "../../../styles/tree.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

/** Whether the item a row belongs to is a branch: its row draws a chevron, a leaf's the room for one. */
const TreeBranchContext = React.createContext(false)

function Tree<Value = unknown>({
  sx,
  ...props
}: Props<React.ComponentProps<typeof TreePrimitive.Root<Value>>>) {
  return (
    <TreePrimitive.Root<Value>
      data-slot="tree"
      {...props}
      {...styleProps(tree.root, sx)}
    />
  )
}

function TreeItem({
  sx,
  branch = false,
  ...props
}: Props<React.ComponentProps<typeof TreePrimitive.Item>>) {
  return (
    <TreeBranchContext.Provider value={branch}>
      <TreePrimitive.Item
        data-slot="tree-item"
        branch={branch}
        {...props}
        {...styleProps(tree.item, sx)}
      />
    </TreeBranchContext.Provider>
  )
}

/**
 * A node's row. It draws the chevron first on a branch, and the same room on a leaf, then its
 * children: an icon and the `TreeItemText`.
 */
function TreeItemContent({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof TreePrimitive.ItemRow>>) {
  const branch = React.useContext(TreeBranchContext)
  return (
    <TreePrimitive.ItemRow
      data-slot="tree-item-content"
      {...props}
      {...styleProps(menuRowBase, menuRowPadding, tree.row, sx)}
    >
      {branch ? (
        <TreeItemIndicator />
      ) : (
        <span
          aria-hidden="true"
          data-slot="tree-item-indicator-space"
          sx={tree.indicatorSpace}
        />
      )}
      {children}
    </TreePrimitive.ItemRow>
  )
}

/** The chevron that turns while its branch is open. Without children it draws a chevron. */
function TreeItemIndicator({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof TreePrimitive.ItemIndicator>>) {
  return (
    <TreePrimitive.ItemIndicator
      data-slot="tree-item-indicator"
      {...props}
      {...styleProps(tree.indicator, sx)}
    >
      {children ?? (
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
        />
      )}
    </TreePrimitive.ItemIndicator>
  )
}

function TreeItemText({
  sx,
  ...props
}: Props<React.ComponentProps<typeof TreePrimitive.ItemText>>) {
  return (
    <TreePrimitive.ItemText
      data-slot="tree-item-text"
      {...props}
      {...styleProps(tree.text, sx)}
    />
  )
}

function TreeGroup({
  sx,
  ...props
}: Props<React.ComponentProps<typeof TreePrimitive.Group>>) {
  return (
    <TreePrimitive.Group
      data-slot="tree-group"
      {...props}
      {...styleProps(tree.group, sx)}
    />
  )
}

export {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemIndicator,
  TreeItemText,
  TreeGroup,
}
