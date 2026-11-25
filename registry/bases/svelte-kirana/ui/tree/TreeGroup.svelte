<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tree } from "@kirana-ui/svelte/tree"

  import { tree } from "../../../../styles/tree.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Tree.Group data-slot="tree-group" {...rest} sx={[tree.group, className as Sx]}>
  {@render children?.()}
</Tree.Group>
