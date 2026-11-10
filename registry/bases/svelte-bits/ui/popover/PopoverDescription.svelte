<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { popover } from "../../../../styles/popover.styles"

  // Bits UI's popover has no description part: the paragraph Base UI's description renders.
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

<p data-slot="popover-description" {...rest} class={className} sx={popover.description}>
  {@render children?.()}
</p>
