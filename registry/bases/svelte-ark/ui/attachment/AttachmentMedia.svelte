<script lang="ts">
  import type { Sx } from "@kirana-style/core"
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

<div data-slot="attachment-media" data-variant={variant} {...rest} sx={[attachment.media, variant === 'image' && attachment.mediaImage, className as Sx]}>
  {@render children?.()}
</div>
