<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "bits-ui"

  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"

  // `asChild`, as Svelte's Ark UI parts take it: a snippet given the part's props as a function.
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

<Dialog.Close data-slot="dialog-close" {...rest} sx={className as Sx}>
  {#snippet child({ props })}
    {#if asChild}
      {@render asChild(propsFn({ type: "button", ...props }))}
    {:else}
      <button type="button" {...props}>
        {@render children?.()}
      </button>
    {/if}
  {/snippet}
</Dialog.Close>
