<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { attachment } from "../../../../styles/attachment.styles"

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

<div data-slot="attachment-actions" {...rest} class={className} sx={attachment.actions}>
  {@render children?.()}
</div>
