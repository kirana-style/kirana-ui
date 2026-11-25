import type { rating } from "../../../../styles/rating.styles"

export { default as Rating } from "./Rating.vue"
export { default as RatingItems } from "./RatingItems.vue"
export { default as RatingItem } from "./RatingItem.vue"
export { rating as ratingVariants } from "../../../../styles/rating.styles"
export type RatingVariants = NonNullable<Parameters<typeof rating>[0]>
