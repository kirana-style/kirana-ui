import { createContext, omit, Show, useContext } from "solid-js"
import type { Accessor } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Tree as TreePrimitive } from "@kirana-ui/solid/tree"
import type { RootProps } from "@kirana-ui/solid/tree"
import { IconPlaceholder } from "./icon-placeholder"
import { menuRowBase, menuRowPadding } from "../../../styles/menu.styles"
import { tree } from "../../../styles/tree.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

/** Whether the item a row belongs to is a branch: its row draws a chevron, a leaf's the room for one. */
const TreeBranchContext = createContext<Accessor<boolean>>(() => false)

/**
 * The tree, taking Kirana UI's props as they are: `expandedValue`, `selectedValue` and their
 * defaults, and `onExpandedChange` and `onSelectedChange` given `(value, details)`.
 */
function Tree<Value = unknown>(
  props: Omit<RootProps<Value>, "class" | "render"> & {
    class?: string
    sx?: Sx
  }
) {
  const rest = omit(props, "class", "sx")
  return (
    <TreePrimitive.Root<Value>
      data-slot="tree"
      {...(rest as RootProps<Value>)}
      {...styleProps(props.class, tree.root, props.sx)}
    />
  )
}

function TreeItem(props: {
  value: unknown
  branch?: boolean
  disabled?: boolean
  loading?: boolean
  label?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "branch", "class", "sx")
  return (
    <TreeBranchContext value={() => props.branch ?? false}>
      <TreePrimitive.Item
        data-slot="tree-item"
        branch={props.branch ?? false}
        {...rest}
        {...styleProps(props.class, tree.item, props.sx)}
      />
    </TreeBranchContext>
  )
}

/**
 * A node's row. It draws the chevron first on a branch, and the same room on a leaf, then its
 * children: an icon and the `TreeItemText`.
 */
function TreeItemContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const branch = useContext(TreeBranchContext)
  const rest = omit(props, "class", "sx", "children")
  return (
    <TreePrimitive.ItemRow
      data-slot="tree-item-content"
      {...rest}
      {...styleProps(
        props.class,
        menuRowBase,
        menuRowPadding,
        tree.row,
        props.sx
      )}
    >
      <Show
        when={branch()}
        fallback={
          <span
            aria-hidden="true"
            data-slot="tree-item-indicator-space"
            sx={tree.indicatorSpace}
          />
        }
      >
        <TreeItemIndicator />
      </Show>
      {props.children}
    </TreePrimitive.ItemRow>
  )
}

/** The chevron that turns while its branch is open. Without children it draws a chevron. */
function TreeItemIndicator(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <TreePrimitive.ItemIndicator
      data-slot="tree-item-indicator"
      {...rest}
      {...styleProps(props.class, tree.indicator, props.sx)}
    >
      {props.children ?? (
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

function TreeItemText(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <TreePrimitive.ItemText
      data-slot="tree-item-text"
      {...rest}
      {...styleProps(props.class, tree.text, props.sx)}
    />
  )
}

function TreeGroup(props: {
  keepMounted?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <TreePrimitive.Group
      data-slot="tree-group"
      {...rest}
      {...styleProps(props.class, tree.group, props.sx)}
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
