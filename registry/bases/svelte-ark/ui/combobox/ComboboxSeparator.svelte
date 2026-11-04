<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { menuSeparator } from "../../../../styles/menu.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="combobox-separator" role="separator" aria-orientation="horizontal" {...rest} sx={[menuSeparator, className as Sx]}></div>
