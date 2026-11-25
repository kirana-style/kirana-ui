import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Rating as RatingPrimitive } from "@kirana-ui/solid/rating"
import type { ItemProps, ItemsProps, RootProps } from "@kirana-ui/solid/rating"
import type { Sx } from "@kirana-style/core"

import { rating, ratingItem } from "../../../styles/rating.styles"
import { IconPlaceholder } from "./icon-placeholder"

type RatingVariants = NonNullable<Parameters<typeof rating>[0]>

type Styled<P> = Omit<P, "class"> & { class?: string; sx?: Sx }

function Star() {
  return (
    <IconPlaceholder
      lucide="StarIcon"
      tabler="IconStar"
      hugeicons="StarIcon"
      phosphor="StarIcon"
      remixicon="RiStarLine"
    />
  )
}

/** The stars, one from 1 to `count`: draws `children` once for each place. */
function RatingItems(props: ItemsProps) {
  return <RatingPrimitive.Items {...props} />
}

/**
 * One star, at `place`. Its icon (`children`, a star by default) is drawn twice: empty, and filled
 * over it, whole or by half.
 */
function RatingItem(props: Styled<ItemProps>) {
  const rest = omit(props, "class", "sx", "children")
  const own = "children" in props
  return (
    <RatingPrimitive.Item
      data-slot="rating-item"
      {...rest}
      {...styleProps(props.class, ratingItem.item, props.sx)}
    >
      {own ? props.children : <Star />}
      <span
        data-slot="rating-item-fill"
        aria-hidden="true"
        sx={ratingItem.fill}
      >
        {own ? props.children : <Star />}
      </span>
    </RatingPrimitive.Item>
  )
}

/** A score from a row of stars, drawn from `count`; `children` replaces the stars. */
function Rating(props: Styled<RootProps> & RatingVariants) {
  const rest = omit(props, "class", "sx", "size", "children")
  const size = () => props.size ?? "default"
  return (
    <RatingPrimitive.Root
      data-slot="rating"
      data-size={size()}
      {...rest}
      {...styleProps(props.class, rating({ size: size() }), props.sx)}
    >
      {"children" in props ? (
        props.children
      ) : (
        <RatingItems>{(place) => <RatingItem place={place} />}</RatingItems>
      )}
    </RatingPrimitive.Root>
  )
}

export { Rating, RatingItems, RatingItem, rating as ratingVariants }
export type { RatingVariants }
