<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { codeBlock } from "../../../../styles/code-block.styles"

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

<div data-slot="code-block-header" {...rest} class={className} sx={codeBlock.header}>
  {@render children?.()}
</div>
