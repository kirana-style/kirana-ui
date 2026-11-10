<script lang="ts">
  import type { Snippet } from "svelte"

  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { example } from "../../../../styles/example.styles"

  let {
    title, containerSx,
    class: className,
    children,
    ...rest
  }: {
    title?: string
    containerSx?: Sx
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="example" {...rest} sx={[example.root, containerSx]}>
  {#if title}
    <div sx={example.title}>
      {title}
    </div>
  {/if}
  <div data-slot="example-content" class={className} sx={example.content}>
    {@render children?.()}
  </div>
</div>
