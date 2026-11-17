<script lang="ts">
  import { css } from "@kirana-style/core"
  import {
    containerSize,
    fontSize,
    lineHeight,
    space,
  } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"
  import FileTreeNode from "../components/file-tree-demo/FileTreeNode.svelte"
  import type { FileNode } from "../components/file-tree-demo/FileTreeNode.svelte"

  const styles = {
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

  let selected = $state("components/ui/button.tsx")
</script>

<div sx={page.example}>
  <div sx={styles.div}>
    {#each files as node (node.path)}
      <FileTreeNode node={node} selected={selected} onselect={(path: string) => (selected = path)} />
    {/each}
  </div>
</div>
