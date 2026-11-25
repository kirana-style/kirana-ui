"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { Rating as RatingPrimitive } from "@kirana-ui/react/rating"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { rating, ratingItem } from "../../../styles/rating.styles"

type RatingVariants = NonNullable<Parameters<typeof rating>[0]>

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
function RatingItems(
  props: React.ComponentProps<typeof RatingPrimitive.Items>
) {
  return <RatingPrimitive.Items {...props} />
}

/**
 * One star, at `place`. Its icon (`children`, a star by default) is drawn twice: empty, and filled
 * over it, whole or by half.
 */
function RatingItem({
  sx,
  children = <Star />,
  ...props
}: Omit<React.ComponentProps<typeof RatingPrimitive.Item>, "className"> & {
  sx?: Sx
}) {
  return (
    <RatingPrimitive.Item
      data-slot="rating-item"
      {...props}
      {...styleProps(ratingItem.item, sx)}
    >
      {children}
      <span data-slot="rating-item-fill" aria-hidden sx={ratingItem.fill}>
        {children}
      </span>
    </RatingPrimitive.Item>
  )
}

/** A score from a row of stars, drawn from `count`; `children` replaces the stars. */
function Rating({
  sx,
  size = "default",
  children,
  ...props
}: Omit<React.ComponentProps<typeof RatingPrimitive.Root>, "className"> &
  RatingVariants & { sx?: Sx }) {
  return (
    <RatingPrimitive.Root
      data-slot="rating"
      data-size={size}
      {...props}
      {...styleProps(rating({ size }), sx)}
    >
      {children ?? (
        <RatingItems>{(place) => <RatingItem place={place} />}</RatingItems>
      )}
    </RatingPrimitive.Root>
  )
}

export { Rating, RatingItems, RatingItem, rating as ratingVariants }
export type { RatingVariants }
