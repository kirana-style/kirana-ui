<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tree } from "@kirana-ui/svelte/tree"

  import { tree } from "../../../../styles/tree.styles"
  import { setTreeBranch } from "./context"

  let {
    value,
    branch = false,
    class: className,
    children,
    ...rest
  }: {
    value: unknown
    branch?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  setTreeBranch(() => branch)
</script>

<Tree.Item data-slot="tree-item" {value} {branch} {...rest} sx={[tree.item, className as Sx]}>
  {@render children?.()}
</Tree.Item>
