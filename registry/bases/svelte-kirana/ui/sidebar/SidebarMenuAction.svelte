<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import { Primitive } from "@kirana-ui/svelte/primitive"
  import { propsFn } from "../../../../lib/svelte/as-child"

  import { sidebar } from "../../../../styles/sidebar.styles"

  let {
    asChild, showOnHover = false,
    class: className,
    children,
    ...rest
  }: {
  
    showOnHover?: boolean
    asChild?: Snippet<[PropsFn<"button">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- `asChild` (Ark UI's, given the props as a function) as the primitive's `child`. -->
{#snippet composed({ props }: { props: Record<string, unknown> })}
  {@render asChild?.(propsFn(props))}
{/snippet}

<Primitive as="button" data-slot="sidebar-menu-action" data-sidebar="menu-action" {...rest} sx={[sidebar.menuAction, showOnHover && sidebar.menuActionOnHover, className as Sx]} child={asChild && composed}>
  {@render children?.()}
</Primitive>
