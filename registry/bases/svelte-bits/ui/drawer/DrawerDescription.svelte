<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Dialog } from "bits-ui"

  import { drawer } from "../../../../styles/drawer.styles"
  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"

  // A paragraph, as Base UI's description, where Bits draws a `div`.
  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild<"p">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Dialog.Description data-slot="drawer-description" {...rest} sx={[drawer.description, className as Sx]}>
  {#snippet child({ props })}
    {#if asChild}
      {@render asChild(propsFn(props))}
    {:else}
      <p {...props}>
        {@render children?.()}
      </p>
    {/if}
  {/snippet}
</Dialog.Description>
