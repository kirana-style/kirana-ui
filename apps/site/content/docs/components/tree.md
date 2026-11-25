---
title: Tree
description: Items in branches that open and close, chosen with the pointer or the keys. Built on Kirana UI Primitives.
section: components
variants:
  [react/kirana, vue/kirana, svelte/kirana, solid/kirana, angular/kirana]
keywords: [tree, tree view, file tree, hierarchy, branches, component, kirana]
---

# Tree

<!-- ::preview item="tree-demo" height="420" combinations="react/kirana" -->

Tree is the registry's own component, built on the [Tree](/docs/primitives/components/tree) of Kirana UI Primitives. Its rows have a menu row's size in every style and the sidebar's colours: a chosen row is on the accent surface, the row in focus draws the control's ring, and each level is indented along a guide line, as the [Sidebar](/docs/components/sidebar)'s sub menu is. A branch's children open and close over their height.

## Installation

<!-- ::installation name="tree" combinations="react/kirana" -->

## Usage

```tsx
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemContent,
  TreeItemText,
} from "@/components/ui/tree"
```

```tsx
<Tree aria-label="Files" defaultExpandedValue={["src"]}>
  <TreeItem value="src" branch>
    <TreeItemContent>
      <TreeItemText>src</TreeItemText>
    </TreeItemContent>
    <TreeGroup>
      <TreeItem value="src/app.tsx">
        <TreeItemContent>
          <TreeItemText>app.tsx</TreeItemText>
        </TreeItemContent>
      </TreeItem>
    </TreeGroup>
  </TreeItem>
</Tree>
```

`TreeItemContent` draws the chevron of a `branch` item first, and the same room on a leaf so the names line up. Put an icon before the `TreeItemText` and it takes the row's icon size.

## Examples

### Multiple

`selectionMode="multiple"` chooses several items at once.

<!-- ::preview item="tree-multiple" height="380" combinations="react/kirana" -->

### Controlled

`expandedValue` with `onExpandedChange` holds which branches are open, so buttons outside the tree can open or close every one.

<!-- ::preview item="tree-controlled" height="420" combinations="react/kirana" -->

### Disabled

A `disabled` item cannot be chosen, opened or closed, and the keys pass over it.

<!-- ::preview item="tree-disabled" height="320" combinations="react/kirana" -->

## API Reference

Every part takes the props of its primitive's part, listed on the [Tree primitive](/docs/primitives/components/tree)'s page, and Kirana's `sx` in place of `className`: a style, or an array of them, merged with the part's own.

### Tree

The root: its items in a column.

| Prop                   | Type                                               | Default    | Description                                                           |
| ---------------------- | -------------------------------------------------- | ---------- | --------------------------------------------------------------------- |
| `expandedValue`        | `readonly Value[]`                                 | -          | The values of the open branches, when the caller holds them.          |
| `defaultExpandedValue` | `readonly Value[]`                                 | -          | The branches open at first. Read once.                                |
| `onExpandedChange`     | `(value: Value[], details: ChangeDetails) => void` | -          | Heard as a branch is about to open or close.                          |
| `selectionMode`        | `"none" \| "single" \| "multiple"`                 | `"single"` | Whether items can be chosen: none, one, or several.                   |
| `selectedValue`        | `readonly Value[]`                                 | -          | The values of the chosen items, when the caller holds them.           |
| `defaultSelectedValue` | `readonly Value[]`                                 | -          | The items chosen at first. Read once.                                 |
| `onSelectedChange`     | `(value: Value[], details: ChangeDetails) => void` | -          | Heard as items are about to be chosen or taken away.                  |
| `expandOnClick`        | `boolean`                                          | `true`     | Whether a press on a branch, or Enter on it, also opens or closes it. |
| `sx`                   | `Sx`                                               | -          | Styles merged with the root's own.                                    |

### TreeItem

One item: a leaf, or a branch that holds its row and its group.

| Prop       | Type      | Default | Description                                                         |
| ---------- | --------- | ------- | ------------------------------------------------------------------- |
| `value`    | `unknown` | -       | Required. What tells this item from the others.                     |
| `branch`   | `boolean` | `false` | A branch: it has children in its `TreeGroup`, and opens and closes. |
| `disabled` | `boolean` | `false` | It cannot be chosen, opened or closed, and the keys pass over it.   |
| `loading`  | `boolean` | `false` | A branch whose children are being loaded.                           |
| `label`    | `string`  | -       | What typing matches, when it is not the item's text.                |
| `sx`       | `Sx`      | -       | Styles merged with the item's own.                                  |

### TreeItemContent

The item's row: the chevron or the room for one, then its children. A chosen row is on the accent surface.

| Prop | Type | Default | Description                       |
| ---- | ---- | ------- | --------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the row's own. |

### TreeItemIndicator

The chevron, turned a quarter while its branch is open. A press on it opens or closes the branch and chooses nothing. `TreeItemContent` draws it on a branch; without children it draws a chevron.

| Prop | Type | Default | Description                           |
| ---- | ---- | ------- | ------------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the chevron's own. |

### TreeItemText

The item's name, cut short with an ellipsis: what names it to assistive technology, and what typing matches.

| Prop | Type | Default | Description                        |
| ---- | ---- | ------- | ---------------------------------- |
| `sx` | `Sx` | -       | Styles merged with the text's own. |

### TreeGroup

A branch's children, indented along a guide line. In the page while the branch is open, its height moving as it opens and closes.

| Prop          | Type      | Default | Description                                   |
| ------------- | --------- | ------- | --------------------------------------------- |
| `keepMounted` | `boolean` | `false` | Keeps the closed group in the page, `hidden`. |
| `sx`          | `Sx`      | -       | Styles merged with the group's own.           |
