<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { ChangeDetails } from "@kirana-ui/svelte"
  import { Rating } from "@kirana-ui/svelte/rating"
  import { untrack } from "svelte"

  import { rating } from "../../../../styles/rating.styles"
  import RatingItem from "./RatingItem.svelte"
  import RatingItems from "./RatingItems.svelte"

  type RatingVariants = NonNullable<Parameters<typeof rating>[0]>

  /**
   * A score from a row of stars, drawn from `count`; `children` replaces the stars. `value` (or
   * `bind:value`), `defaultValue`, read once, and `onValueChange(value, details)`.
   */
  let {
    size = "default",
    value = $bindable(),
    defaultValue = 0,
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    size?: RatingVariants["size"]
    value?: number
    defaultValue?: number
    onValueChange?: (value: number, details: ChangeDetails) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state(untrack(() => defaultValue))
  const get = () => value ?? own
  const set = (next: number) => {
    own = next
    value = next
  }
</script>

<Rating.Root data-slot="rating" data-size={size} bind:value={get, set} {onValueChange} {...rest} sx={[rating({ size }), className as Sx]}>
  {#if children}
    {@render children()}
  {:else}
    <RatingItems>
      {#snippet children(place: number)}
        <RatingItem {place} />
      {/snippet}
    </RatingItems>
  {/if}
</Rating.Root>
