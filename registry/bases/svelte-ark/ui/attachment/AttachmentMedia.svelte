<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { attachment } from "../../../../styles/attachment.styles"

  let {
    variant = "icon",
    class: className,
    children,
    ...rest
  }: {
    variant?: "icon" | "image"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="attachment-media" data-variant={variant} {...rest} class={className} sx={[attachment.media, variant === 'image' && attachment.mediaImage]}>
  {@render children?.()}
</div>
