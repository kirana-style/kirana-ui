<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Drawer } from "@kirana-ui/svelte/drawer"

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

<Drawer.Close data-slot="drawer-close" {...rest} sx={className as Sx}>
  {#snippet child({ props })}
    {#if asChild}
      {@render asChild(propsFn({ type: "button", ...props }))}
    {:else}
      <button type="button" {...props}>
        {@render children?.()}
      </button>
    {/if}
  {/snippet}
</Drawer.Close>
