<script lang="ts" generics="Value = unknown">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ChangeDetails } from "@kirana-ui/svelte"
  import { Tree } from "@kirana-ui/svelte/tree"

  import { tree } from "../../../../styles/tree.styles"

  /**
   * Kirana UI's tree: `bind:expandedValue` is the values of the open branches, `bind:selectedValue`
   * those of the chosen nodes; the rest goes to the primitive.
   */
  let {
    expandedValue = $bindable(),
    selectedValue = $bindable(),
    class: className,
    children,
    ...rest
  }: {
    expandedValue?: Value[]
    selectedValue?: Value[]
    onExpandedChange?: (value: Value[], details: ChangeDetails) => void
    onSelectedChange?: (value: Value[], details: ChangeDetails) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Tree.Root data-slot="tree" bind:expandedValue bind:selectedValue {...rest} sx={[tree.root, className as Sx]}>
  {@render children?.()}
</Tree.Root>
