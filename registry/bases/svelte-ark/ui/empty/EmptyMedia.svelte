<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { empty } from "../../../../styles/empty.styles"

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
    variant?: MediaVariants["variant"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  type MediaVariants = NonNullable<Parameters<typeof empty.media>[0]>
</script>

<div data-slot="empty-icon" data-variant={variant} {...rest} sx={[empty.media({ variant }), className as Sx]}>
  {@render children?.()}
</div>
