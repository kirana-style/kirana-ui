<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { field } from "../../../../styles/field.styles"

  let {
    orientation = "vertical",
    class: className,
    children,
    ...rest
  }: {
    orientation?: "vertical" | "horizontal" | "responsive"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="field" role="group" data-orientation={orientation} {...rest} sx={[field.root, className as Sx]}>
  {@render children?.()}
</div>
