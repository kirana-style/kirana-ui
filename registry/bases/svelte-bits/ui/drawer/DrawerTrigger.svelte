<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "bits-ui"

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

<Dialog.Trigger data-slot="drawer-trigger" {...rest} sx={className as Sx}>
  {#snippet child({ props })}
    {#if asChild}
      {@render asChild(propsFn(props))}
    {:else}
      <button {...props}>
        {@render children?.()}
      </button>
    {/if}
  {/snippet}
</Dialog.Trigger>
