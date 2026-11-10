<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "bits-ui"

  import { drawer } from "../../../../styles/drawer.styles"
  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"

  // An `h2`, as Base UI's title, where Bits draws a `div` with the heading's role.
  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"h2">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Dialog.Title data-slot="drawer-title" {...rest} sx={[drawer.title, className as Sx]}>
  {#snippet child({ props })}
    {#if asChild}
      {@render asChild(propsFn(props))}
    {:else}
      <h2 {...props}>
        {@render children?.()}
      </h2>
    {/if}
  {/snippet}
</Dialog.Title>
