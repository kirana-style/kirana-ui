<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import { Primitive } from "@kirana-ui/svelte/primitive"
  import { propsFn } from "../../../../lib/svelte/as-child"

  import { sidebar } from "../../../../styles/sidebar.styles"

  let {
    asChild,
    size = "md",
    isActive = false,
    class: className,
    children,
    ...rest
  }: {
  
    size?: "sm" | "md"
    isActive?: boolean
    asChild?: Snippet<[PropsFn<"a">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- `asChild` (Ark UI's, given the props as a function) as the primitive's `child`. -->
{#snippet composed({ props }: { props: Record<string, unknown> })}
  {@render asChild?.(propsFn(props))}
{/snippet}

<Primitive as="a" data-slot="sidebar-menu-sub-button" data-sidebar="menu-sub-button" data-size={size} data-active={isActive ? '' : undefined} {...rest} sx={[sidebar.menuSubButton, className as Sx]} child={asChild && composed}>
  {@render children?.()}
</Primitive>
