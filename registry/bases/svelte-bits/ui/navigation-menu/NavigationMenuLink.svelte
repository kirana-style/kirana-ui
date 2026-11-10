<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenu } from "bits-ui"

  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { AsChild } from "../../../../lib/svelte/as-child"
  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  let {
    active = false,
    asChild,
    class: className,
    children,
    ...rest
  }: {
    /** Base UI's: the current page's link. */
    active?: boolean
    asChild?: AsChild<"a">
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

{#if asChild}
  <NavigationMenu.Link data-slot="navigation-menu-link" {active} {...rest} sx={[navigationMenu.link, className as Sx]}>
    {#snippet child({ props })}
      {@render asChild(propsFn(props))}
    {/snippet}
  </NavigationMenu.Link>
{:else}
  <NavigationMenu.Link data-slot="navigation-menu-link" {active} {...rest} sx={[navigationMenu.link, className as Sx]}>
    {@render children?.()}
  </NavigationMenu.Link>
{/if}
