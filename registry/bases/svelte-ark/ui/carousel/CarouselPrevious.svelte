<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import type { button } from "../../../../styles/button.styles"
  import { carousel } from "../../../../styles/carousel.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import { Button } from "../button"
  import { useCarousel } from "./context"

  let {
    variant = "outline", size = "icon-sm",
    class: className,
    ...rest
  }: {
    variant?: ButtonVariants["variant"]
    size?: ButtonVariants["size"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

  const context = useCarousel()
</script>

<Button data-slot="carousel-previous" variant={variant} size={size} sx={[context.orientation === 'horizontal'
        ? carousel.previous
        : carousel.previousVertical, className as Sx]} disabled={!context.canScrollPrev} {...rest} onclick={context.scrollPrev}>
  <IconPlaceholder lucide="ChevronLeftIcon" tabler="IconChevronLeft" hugeicons="ArrowLeft01Icon" phosphor="CaretLeftIcon" remixicon="RiArrowLeftSLine" sx={carousel.flip} />
  <span sx={visuallyHidden}>
    Previous slide
  </span>
</Button>
