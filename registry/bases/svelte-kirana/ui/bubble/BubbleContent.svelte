<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import { Primitive } from "@kirana-ui/svelte/primitive"
  import { propsFn } from "../../../../lib/svelte/as-child"

  import { bubble } from "../../../../styles/bubble.styles"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {

    asChild?: Snippet<[PropsFn<"div">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- `asChild` (Ark UI's, given the props as a function) as the primitive's `child`. -->
{#snippet composed({ props }: { props: Record<string, unknown> })}
  {@render asChild?.(propsFn(props))}
{/snippet}

<Primitive as="div" data-slot="bubble-content" {...rest} sx={[bubble.content, className as Sx]} child={asChild && composed}>
  {@render children?.()}
</Primitive>
