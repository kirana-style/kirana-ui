<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { bubble } from "../../../../styles/bubble.styles"

  let {
    variant = "default", align = "start",
    class: className,
    children,
    ...rest
  }: {
    variant?:
    | "default"
    | "secondary"
    | "muted"
    | "tinted"
    | "outline"
    | "ghost"
    | "destructive"
    align?: "start" | "end"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="bubble" data-variant={variant} data-align={align} {...rest} sx={[bubble.root, className as Sx]}>
  {@render children?.()}
</div>
