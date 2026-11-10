<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Collapsible } from "bits-ui"

  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"

  // `asChild`, as Svelte's Ark UI parts take it: a snippet given the trigger's props as a function.
  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"button">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

{#snippet bridge({ props }: { props: Record<string, unknown> })}
  {@render asChild?.(propsFn(props))}
{/snippet}

<Collapsible.Trigger
  data-slot="collapsible-trigger"
  {...rest}
  child={asChild ? bridge : undefined}
  sx={className as Sx}
>
  {@render children?.()}
</Collapsible.Trigger>
