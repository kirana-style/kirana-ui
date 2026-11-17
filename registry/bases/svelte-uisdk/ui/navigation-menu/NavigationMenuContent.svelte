<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenuContent } from "@ui-sdk/svelte/navigation-menu"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
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

<UisdkPart part={NavigationMenuContent} slotName="navigation-menu-content" tag="div" {...rest} sx={[navigationMenu.content, className as Sx]}>
  {@render children?.()}
</UisdkPart>
