---
title: File Tree
description: The files the agent changed, as a folder tree.
section: ai-elements
variants: [react/base, react/aria]
keywords: [file tree, ai elements, agent, chat]
---

# File Tree

<!-- ::preview item="file-tree-demo" height="370" combinations="react/base,react/aria" -->

File Tree is the files the agent changed, shown as folders you can open. A folder is a [Collapsible](/docs/components/collapsible). A file is a [Button](/docs/components/button). For a single file the agent read or edited, use a [Tool](/docs/ai-elements/tool) line instead.

## Installation

File Tree is built with the [Collapsible](/docs/components/collapsible) and [Button](/docs/components/button) components.

<!-- ::installation name="collapsible button" combinations="react/base,react/aria" -->

## Usage

Render nodes recursively. Nest each folder's children in its `CollapsibleContent`.

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  row: css({ width: "100%", justifyContent: "flex-start" }),
  // The chevron turns while the folder is open: the trigger's `aria-expanded`.
  folder: css({
    [select.child("svg:first-child")]: {
      transitionProperty: "rotate",
      transitionDuration: duration[150],
      rotate: { '[aria-expanded="true"]': "90deg" },
    },
  }),
  children: css({
    marginLeft: space[4],
    display: "flex",
    flexDirection: "column",
  }),
}

if (node.type === "folder") {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger
        render={
          <Button variant="ghost" size="sm" sx={[styles.row, styles.folder]} />
        }
      >
        <ChevronRightIcon />
        <FolderIcon />
        {node.name}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div sx={styles.children}>
          {node.children.map((child) => (
            <FileTreeNode key={child.path} node={child} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/base -->

```tsx showLineNumbers
const styles = {
  row: css({ width: "100%", justifyContent: "flex-start" }),
}

<Button
  variant="ghost"
  size="sm"
  sx={styles.row}
  onClick={() => onSelect(node.path)}
>
  <FileIcon />
  {node.name}
</Button>
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  row: css({ width: "100%", justifyContent: "flex-start" }),
  // The chevron turns while the folder is open: the trigger's `aria-expanded`.
  folder: css({
    [select.child("svg:first-child")]: {
      transitionProperty: "rotate",
      transitionDuration: duration[150],
      rotate: { '[aria-expanded="true"]': "90deg" },
    },
  }),
  children: css({
    marginLeft: space[4],
    display: "flex",
    flexDirection: "column",
  }),
}

if (node.type === "folder") {
  return (
    <Collapsible defaultExpanded>
      <Button
        slot="trigger"
        variant="ghost"
        size="sm"
        sx={[styles.row, styles.folder]}
      >
        <ChevronRightIcon />
        <FolderIcon />
        {node.name}
      </Button>
      <CollapsibleContent>
        <div sx={styles.children}>
          {node.children.map((child) => (
            <FileTreeNode key={child.path} node={child} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const styles = {
  row: css({ width: "100%", justifyContent: "flex-start" }),
}

<Button
  variant="ghost"
  size="sm"
  sx={styles.row}
  onPress={() => onSelect(node.path)}
>
  <FileIcon />
  {node.name}
</Button>
```

<!-- ::end:only -->

See [Collapsible](/docs/components/collapsible#file-tree).

## Migrating from AI SDK Elements

If you added File Tree from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/file-tree.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Collapsible and Button. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/file-tree.tsx from AI SDK Elements to kirana/ui's Collapsible and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add collapsible button
2. Read https://ui.kirana.style/docs/ai-elements/react/base/file-tree.md and build File Tree the same way.
3. Rebuild each part:
   - FileTreeFolder renders a Collapsible. Its trigger is a CollapsibleTrigger with render={<Button variant="ghost" size="sm" sx={[styles.row, styles.folder]} />}, and its children go in a CollapsibleContent. styles.row is css({ width: "100%", justifyContent: "flex-start" }); styles.folder turns the chevron while the folder is open, as the page shows.
   - FileTreeFile renders a Button with variant="ghost" and size="sm" that calls onSelect with its path. If a file has FileTreeActions, render them next to the Button, not inside it.
   - Keep FileTree with its expanded and selection state, and keep FileTreeIcon, FileTreeName and FileTreeActions as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/file-tree.tsx from AI SDK Elements to kirana/ui's Collapsible and Button components.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install the components: npx kirana-style ui add collapsible button
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/file-tree.md and build File Tree the same way.
3. Rebuild each part:
   - FileTreeFolder renders a Collapsible. Its trigger is a Button with slot="trigger", variant="ghost", size="sm" and sx={[styles.row, styles.folder]}, and its children go in a CollapsibleContent. styles.row is css({ width: "100%", justifyContent: "flex-start" }); styles.folder turns the chevron while the folder is open, as the page shows.
   - FileTreeFile renders a Button with variant="ghost" and size="sm" that calls onSelect with its path. If a file has FileTreeActions, render them next to the Button, not inside it.
   - Keep FileTree with its expanded and selection state, and keep FileTreeIcon, FileTreeName and FileTreeActions as they are.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->
