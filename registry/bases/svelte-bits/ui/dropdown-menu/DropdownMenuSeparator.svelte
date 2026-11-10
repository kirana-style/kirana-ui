<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { DropdownMenu } from "bits-ui"

  import { menuSeparator } from "../../../../styles/menu.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<DropdownMenu.Separator data-slot="dropdown-menu-separator" {...rest} sx={[menuSeparator, className as Sx]} />
