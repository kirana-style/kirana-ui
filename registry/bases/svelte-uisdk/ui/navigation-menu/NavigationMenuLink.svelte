<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenuLink } from "@ui-sdk/svelte/navigation-menu"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  /** A link: Base UI's `active` is ui-sdk's `current` (`aria-current="page"`). */
  let {
    asChild,
    active = false,
    class: className,
    children,
    ...rest
  }: {
    asChild?: AsChild
    active?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={NavigationMenuLink} slotName="navigation-menu-link" tag="a" current={active} asChild={asChild} {...rest} sx={[navigationMenu.link, className as Sx]}>
  {@render children?.()}
</UisdkPart>
