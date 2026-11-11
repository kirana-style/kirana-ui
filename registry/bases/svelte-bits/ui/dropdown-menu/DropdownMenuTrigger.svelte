<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { DropdownMenu } from "bits-ui"

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
  <DropdownMenu.Trigger data-slot="dropdown-menu-trigger" {...rest} sx={className as Sx}>
    {#snippet child({ props })}
      {@render asChild(propsFn({ type: "button", ...props }))}
    {/snippet}
  </DropdownMenu.Trigger>
{:else}
  <DropdownMenu.Trigger data-slot="dropdown-menu-trigger" {...rest} sx={className as Sx}>
    {@render children?.()}
  </DropdownMenu.Trigger>
{/if}
