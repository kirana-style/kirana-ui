<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Popover } from "bits-ui"

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
  <Popover.Trigger data-slot="popover-trigger" {...rest} sx={className as Sx}>
    {#snippet child({ props })}
      {@render asChild(propsFn(props))}
    {/snippet}
  </Popover.Trigger>
{:else}
  <Popover.Trigger data-slot="popover-trigger" {...rest} sx={className as Sx}>
    {@render children?.()}
  </Popover.Trigger>
{/if}
