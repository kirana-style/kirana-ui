import { createSignal, For, Show } from "solid-js"
import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../ui/icon-placeholder"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
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
  actions: css({ display: "flex", gap: space[2] }),
}

type Node = { name: string; children?: Node[] }

const DOCS: Node[] = [
  {
    name: "Getting started",
    children: [{ name: "Installation" }, { name: "Configuration" }],
  },
  {
    name: "Guides",
    children: [
      { name: "Theming" },
      {
        name: "Forms",
        children: [{ name: "Validation" }, { name: "Server actions" }],
      },
    ],
  },
  { name: "Changelog" },
]

/** The value of every branch under `nodes`. */
function branches(nodes: Node[], parent = ""): string[] {
  return nodes.flatMap((node) =>
    node.children
      ? [
          `${parent}${node.name}`,
          ...branches(node.children, `${parent}${node.name}/`),
        ]
      : []
  )
}

function Nodes(props: { nodes: Node[]; parent?: string }) {
  return (
    <For each={props.nodes}>
      {(node) => {
        const value = `${props.parent ?? ""}${node.name}`
        return (
          <TreeItem value={value} branch={Boolean(node.children)}>
            <TreeItemContent>
              <Show
                when={node.children}
                fallback={
                  <IconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="FileIcon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                  />
                }
              >
                <IconPlaceholder
                  lucide="FolderIcon"
                  tabler="IconFolder"
                  hugeicons="FolderIcon"
                  phosphor="FolderIcon"
                  remixicon="RiFolderLine"
                />
              </Show>
              <TreeItemText>{node.name}</TreeItemText>
            </TreeItemContent>
            <Show when={node.children}>
              {(children) => (
                <TreeGroup>
                  <Nodes nodes={children()} parent={`${value}/`} />
                </TreeGroup>
              )}
            </Show>
          </TreeItem>
        )
      }}
    </For>
  )
}

export default function TreeControlled() {
  const [expanded, setExpanded] = createSignal<string[]>(["Guides"])

  return (
    <div sx={page.example}>
      <div sx={styles.column}>
        <div sx={styles.actions}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpanded(branches(DOCS))}
          >
            Expand all
          </Button>
          <Button variant="outline" size="sm" onClick={() => setExpanded([])}>
            Collapse all
          </Button>
        </div>
        <Tree<string>
          aria-label="Documentation"
          expandedValue={expanded()}
          onExpandedChange={(value) => setExpanded(value)}
        >
          <Nodes nodes={DOCS} />
        </Tree>
      </div>
    </div>
  )
}
