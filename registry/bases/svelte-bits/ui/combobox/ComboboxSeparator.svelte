<script lang="ts">
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

<div data-slot="combobox-separator" role="separator" aria-orientation="horizontal" {...rest} class={className} sx={menuSeparator}></div>
