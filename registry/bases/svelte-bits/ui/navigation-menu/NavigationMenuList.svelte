<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenu } from "bits-ui"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- The list alone, the root's own child as Base UI's: Bits' wrapper around it is only for its
     indicator, which these menus do not draw. -->
<NavigationMenu.List data-slot="navigation-menu-list" {...rest} sx={[navigationMenu.list, className as Sx]}>
  {#snippet child({ props })}
    <ul {...props}>
      {@render children?.()}
    </ul>
  {/snippet}
</NavigationMenu.List>
