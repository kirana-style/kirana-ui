<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import { Primitive } from "@kirana-ui/svelte/primitive"
  import { propsFn } from "../../../../lib/svelte/as-child"

  import { attachment } from "../../../../styles/attachment.styles"

  let {
    asChild, type,
    class: className,
    children,
    ...rest
  }: {
  
    type?: "button" | "submit" | "reset"
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

<Primitive as="button" data-slot="attachment-trigger" type={asChild ? type : (type ?? 'button')} {...rest} sx={[attachment.trigger, className as Sx]} child={asChild && composed}>
  {@render children?.()}
</Primitive>
