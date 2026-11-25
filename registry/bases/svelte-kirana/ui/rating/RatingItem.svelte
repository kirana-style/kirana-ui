<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Rating } from "@kirana-ui/svelte/rating"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { ratingItem } from "../../../../styles/rating.styles"

  /**
   * One star, at `place`. Its icon (`children`, a star by default) is drawn twice: empty, and filled
   * over it, whole or by half.
   */
  let {
    place,
    class: className,
    children,
    ...rest
  }: {
    place: number
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

{#snippet icon()}
  {#if children}
    {@render children()}
  {:else}
    <IconPlaceholder lucide="StarIcon" tabler="IconStar" hugeicons="StarIcon" phosphor="StarIcon" remixicon="RiStarLine" />
  {/if}
{/snippet}

<Rating.Item data-slot="rating-item" {place} {...rest} sx={[ratingItem.item, className as Sx]}>
  {@render icon()}
  <span data-slot="rating-item-fill" aria-hidden="true" sx={ratingItem.fill}>
    {@render icon()}
  </span>
</Rating.Item>
