import type { rating } from "../../../../styles/rating.styles"

export { default as Rating } from "./Rating.svelte"
export { default as RatingItems } from "./RatingItems.svelte"
export { default as RatingItem } from "./RatingItem.svelte"
export { rating as ratingVariants } from "../../../../styles/rating.styles"

export type RatingVariants = NonNullable<Parameters<typeof rating>[0]>
