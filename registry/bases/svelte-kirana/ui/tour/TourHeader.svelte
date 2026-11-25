<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { popover } from "../../../../styles/popover.styles"
  import { tour } from "../../../../styles/tour.styles"

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

<div data-slot="tour-header" {...rest} class={className} sx={[popover.header, tour.header]}>
  {@render children?.()}
</div>
