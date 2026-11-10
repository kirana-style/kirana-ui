<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { LinkPreview } from "bits-ui"

  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"a">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

{#if asChild}
  <LinkPreview.Trigger data-slot="hover-card-trigger" {...rest} sx={className as Sx}>
    {#snippet child({ props })}
      {@render asChild(propsFn(props))}
    {/snippet}
  </LinkPreview.Trigger>
{:else}
  <LinkPreview.Trigger data-slot="hover-card-trigger" {...rest} sx={className as Sx}>
    {@render children?.()}
  </LinkPreview.Trigger>
{/if}
