<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { steps } from "../../../../styles/steps.styles"

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

<span data-slot="steps-title" {...rest} class={className} sx={steps.title}>
  {@render children?.()}
</span>
