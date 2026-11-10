<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { codeBlock } from "../../../../styles/code-block.styles"

  let {
    variant = "default", size = "default",
    class: className,
    children,
    ...rest
  }: {
    variant?: "default" | "destructive"
    size?: "default" | "sm"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="code-block" data-variant={variant} data-size={size} {...rest} class={className} sx={codeBlock.root}>
  {@render children?.()}
</div>
