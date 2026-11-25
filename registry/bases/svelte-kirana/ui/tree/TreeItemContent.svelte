<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tree } from "@kirana-ui/svelte/tree"

  import { menuRowBase, menuRowPadding } from "../../../../styles/menu.styles"
  import { tree } from "../../../../styles/tree.styles"
  import { useTreeBranch } from "./context"
  import TreeItemIndicator from "./TreeItemIndicator.svelte"

  /**
   * A node's row. It draws the chevron first on a branch, and the same room on a leaf, then its
   * children: an icon and the `TreeItemText`.
   */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const branch = useTreeBranch()
</script>

<Tree.ItemRow data-slot="tree-item-content" {...rest} sx={[menuRowBase, menuRowPadding, tree.row, className as Sx]}>
  {#if branch()}
    <TreeItemIndicator />
  {:else}
    <span aria-hidden="true" data-slot="tree-item-indicator-space" sx={tree.indicatorSpace}></span>
  {/if}
  {@render children?.()}
</Tree.ItemRow>
