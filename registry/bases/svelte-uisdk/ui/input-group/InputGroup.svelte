<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { inputGroup } from "../../../../styles/input-group.styles"

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

<div data-slot="input-group" role="group" {...rest} class={className} sx={inputGroup.root}>
  {@render children?.()}
</div>
