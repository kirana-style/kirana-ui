<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { sidebar } from "../../../../styles/sidebar.styles"
  import { Skeleton } from "../skeleton"

  let {
    showIcon = false,
    class: className,
    ...rest
  }: {
    showIcon?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // A width between 50 and 90%, so a list of them reads as text.
  const width = `${Math.floor(Math.random() * 40) + 50}%`
</script>

<div data-slot="sidebar-menu-skeleton" data-sidebar="menu-skeleton" {...rest} sx={[sidebar.menuSkeleton, className as Sx]}>
  {#if showIcon}
    <Skeleton data-sidebar="menu-skeleton-icon" sx={sidebar.menuSkeletonIcon} />
  {/if}
  <Skeleton data-sidebar="menu-skeleton-text" sx={sidebar.menuSkeletonText} style={`max-width: ${width}`} />
</div>
