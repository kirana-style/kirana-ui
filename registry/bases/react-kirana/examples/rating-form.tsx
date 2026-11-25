"use client"

import * as React from "react"

import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Rating } from "../ui/rating"
import { Textarea } from "../ui/textarea"
import { fontSize, lineHeight } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  result: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

export default function RatingForm() {
  const [sent, setSent] = React.useState<string | null>(null)

  return (
    <div sx={page.example}>
      <form
        sx={page.narrow}
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          const rating = String(data.get("rating") ?? "")
          setSent(rating ? `Sent ${rating} of 5.` : "Sent with no rating.")
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel id="rating-form-label">Rate this article</FieldLabel>
            <Rating name="rating" aria-labelledby="rating-form-label" />
          </Field>
          <Field>
            <FieldLabel htmlFor="rating-form-comment">Comment</FieldLabel>
            <Textarea
              id="rating-form-comment"
              name="comment"
              placeholder="What could be better?"
            />
            <FieldDescription>Optional.</FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Send</Button>
            {sent ? (
              <span sx={styles.result} aria-live="polite">
                {sent}
              </span>
            ) : null}
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
