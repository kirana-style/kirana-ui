import { Rating } from "@kirana-ui/react/rating"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"field" | "label" | "root" | "star" | "hint">
}) {
  const [stars, setStars] = useState(3.5)

  return (
    <div {...s.field}>
      <span aria-hidden="true" {...s.label}>
        How was your stay?
      </span>
      <Rating.Root
        allowHalf
        value={stars}
        onValueChange={(next: number) => setStars(next)}
        aria-label="How was your stay?"
        {...s.root}
      >
        <Rating.Items>
          {(place) => (
            <Rating.Item place={place} {...s.star}>
              ★
            </Rating.Item>
          )}
        </Rating.Items>
      </Rating.Root>
      <p {...s.hint}>
        {stars === 0 ? "No stars yet." : `${stars} out of 5 stars.`}
      </p>
    </div>
  )
}
