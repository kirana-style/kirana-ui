"use client"

import { css } from "@kirana-style/core"

import { Rating } from "../ui/rating"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
  }),
}

export default function RatingSizes() {
  return (
    <div sx={page.example}>
      <div sx={styles.column}>
        <Rating size="sm" defaultValue={3} aria-label="Small rating" />
        <Rating defaultValue={3} aria-label="Default rating" />
        <Rating size="lg" defaultValue={3} aria-label="Large rating" />
      </div>
    </div>
  )
}
