<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { getContext } from "svelte"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Portal } from "@ark-ui/svelte"

  import { NavigationMenuContent } from "@ark-ui/svelte/navigation-menu"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"
  import { VIEWPORT } from "./context"
  import type { ViewportContext } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const viewport = getContext<ViewportContext | undefined>(VIEWPORT)
</script>

<!-- Shown in the menu's viewport, as Base UI's content moves into its own. -->
<!-- Not rendered until the viewport is there (Ark's `disabled`). -->
<Portal container={viewport?.element} disabled={!viewport?.element}>
  <NavigationMenuContent data-slot="navigation-menu-content" {...rest} sx={[navigationMenu.content, className as Sx]}>
    {@render children?.()}
  </NavigationMenuContent>
</Portal>
