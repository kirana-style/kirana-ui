<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { carousel } from "../../../../styles/carousel.styles"
  import { useCarousel } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const context = useCarousel()
</script>

<div role="group" aria-roledescription="slide" data-slot="carousel-item" {...rest} sx={[context.orientation === 'horizontal' ? carousel.item : carousel.itemVertical, className as Sx]}>
  {@render children?.()}
</div>
