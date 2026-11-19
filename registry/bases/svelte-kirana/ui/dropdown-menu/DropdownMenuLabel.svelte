<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Menu } from "@kirana-ui/svelte/menu"

  import { menuLabel, menuLabelWeight } from "../../../../styles/menu.styles"

  // The group's label: inside its group, as Base UI's label must be.
  let {
    inset = false,
    class: className,
    children,
    ...rest
  }: {
    inset?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Menu.GroupLabel data-slot="dropdown-menu-label" data-inset={inset || undefined} {...rest} sx={[menuLabel, menuLabelWeight, className as Sx]}>
  {@render children?.()}
</Menu.GroupLabel>
