<script setup lang="ts">
import { css } from "@kirana-style/core"
import { ref } from "vue"

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

const sent = ref<string | null>(null)

function submit(event: SubmitEvent) {
  const data = new FormData(event.currentTarget as HTMLFormElement)
  const rating = String(data.get("rating") ?? "")
  sent.value = rating ? `Sent ${rating} of 5.` : "Sent with no rating."
}
</script>

<template>
  <div :sx="page.example">
    <form :sx="page.narrow" @submit.prevent="submit">
      <FieldGroup>
        <Field>
          <FieldLabel id="rating-form-label">Rate this article</FieldLabel>
          <Rating name="rating" aria-labelledby="rating-form-label" />
        </Field>
        <Field>
          <FieldLabel for="rating-form-comment">Comment</FieldLabel>
          <Textarea
            id="rating-form-comment"
            name="comment"
            placeholder="What could be better?"
          />
          <FieldDescription>Optional.</FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">Send</Button>
          <span v-if="sent" :sx="styles.result" aria-live="polite">
            {{ sent }}
          </span>
        </Field>
      </FieldGroup>
    </form>
  </div>
</template>
