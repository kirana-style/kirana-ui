<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { bubble } from "../../../../styles/bubble.styles"

  let {
    side = "bottom", align = "end",
    class: className,
    children,
    ...rest
  }: {
    side?: "top" | "bottom"
    align?: "start" | "end"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="bubble-reactions" data-align={align} data-side={side} {...rest} sx={[bubble.reactions, className as Sx]}>
  {@render children?.()}
</div>
