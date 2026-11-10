<script lang="ts">
  import emblaCarouselSvelte from "embla-carousel-svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

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

<!-- The viewport Embla moves: its action, with the carousel's options and plugins. -->
<div
  use:emblaCarouselSvelte={{ options: context.options, plugins: context.plugins }}
  onemblaInit={(event) => context.init(event.detail)}
  sx={carousel.viewport}
  data-slot="carousel-content"
>
  <div
    {...rest}
    class={className} sx={context.orientation === "horizontal" ? carousel.content : carousel.contentVertical}
  >
    {@render children?.()}
  </div>
</div>
