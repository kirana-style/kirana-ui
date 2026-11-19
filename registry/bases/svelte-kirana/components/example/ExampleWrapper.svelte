<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { example } from "../../../../styles/example.styles"

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

<div sx={example.page}>
  <div data-slot="example-wrapper" {...rest} class={className} sx={example.wrapper}>
    {@render children?.()}
  </div>
</div>
