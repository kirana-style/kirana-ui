<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { NavigationMenuList } from "@ark-ui/svelte/navigation-menu"

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

<!-- Zag writes `position: relative` on the list for its indicator; Base UI's list is static. -->
<NavigationMenuList style="position: static">
  {#snippet asChild(props)}
    <ul {...props()} class={props().class} style={props().style} data-slot="navigation-menu-list" {...rest} sx={[navigationMenu.list, className as Sx]}>
      {@render children?.()}
    </ul>
  {/snippet}
</NavigationMenuList>
