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

<NavigationMenu.Content data-slot="navigation-menu-content" {...rest} sx={[navigationMenu.content, navigationMenu.contentBits, className as Sx]}>
  {@render children?.()}
</NavigationMenu.Content>
