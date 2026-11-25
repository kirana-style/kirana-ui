<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tour } from "@kirana-ui/svelte/tour"

  import { popover } from "../../../../styles/popover.styles"

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

<Tour.Description data-slot="tour-description" {...rest} sx={[popover.description, className as Sx]}>
  {@render children?.()}
</Tour.Description>
