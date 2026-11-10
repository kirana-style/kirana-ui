<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  import { separator } from "../../../../styles/separator.styles"

  let {
    orientation = "horizontal",
    class: className,
    ...rest
  }: {
    orientation?: "horizontal" | "vertical"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="separator" role="separator" aria-orientation={orientation} data-orientation={orientation} {...rest} class={className} sx={separator}></div>
