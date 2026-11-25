<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tree } from "@kirana-ui/svelte/tree"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { tree } from "../../../../styles/tree.styles"

  /** The chevron that turns while its branch is open. Without children it draws a chevron. */
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

<Tree.ItemIndicator data-slot="tree-item-indicator" {...rest} sx={[tree.indicator, className as Sx]}>
  {#if children}
    {@render children()}
  {:else}
    <IconPlaceholder lucide="ChevronRightIcon" tabler="IconChevronRight" hugeicons="ArrowRight01Icon" phosphor="CaretRightIcon" remixicon="RiArrowRightSLine" />
  {/if}
</Tree.ItemIndicator>
