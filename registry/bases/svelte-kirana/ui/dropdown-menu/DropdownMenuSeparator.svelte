<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Menu } from "@kirana-ui/svelte/menu"

  import { menuSeparator } from "../../../../styles/menu.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Menu.Separator data-slot="dropdown-menu-separator" {...rest} sx={[menuSeparator, className as Sx]} />
