<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  // Ark's select has no separator part: a rule between groups, as the others draw it.
  import { menuSeparator } from "../../../../styles/menu.styles"
  import { select } from "../../../../styles/select.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<div role="separator" data-slot="select-separator" {...rest} sx={[menuSeparator, select.separator, className as Sx]}></div>
