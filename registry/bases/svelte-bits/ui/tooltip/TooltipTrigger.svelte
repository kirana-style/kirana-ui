<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tooltip } from "bits-ui"

  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"

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

{#if asChild}
  <Tooltip.Trigger data-slot="tooltip-trigger" {...rest} sx={className as Sx}>
    {#snippet child({ props })}
      {@render asChild(propsFn(props))}
    {/snippet}
  </Tooltip.Trigger>
{:else}
  <Tooltip.Trigger data-slot="tooltip-trigger" {...rest} sx={className as Sx}>
    {@render children?.()}
  </Tooltip.Trigger>
{/if}
