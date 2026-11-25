<script lang="ts">
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

  let sent = $state<string | null>(null)

  function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const rating = String(data.get("rating") ?? "")
    sent = rating ? `Sent ${rating} of 5.` : "Sent with no rating."
  }
</script>

<div sx={page.example}>
  <form sx={page.narrow} onsubmit={submit}>
    <FieldGroup>
      <Field>
        <FieldLabel id="rating-form-label">Rate this article</FieldLabel>
        <Rating name="rating" aria-labelledby="rating-form-label" />
      </Field>
      <Field>
        <FieldLabel for="rating-form-comment">Comment</FieldLabel>
        <Textarea id="rating-form-comment" name="comment" placeholder="What could be better?" />
        <FieldDescription>Optional.</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">Send</Button>
        {#if sent}
          <span sx={styles.result} aria-live="polite">
            {sent}
          </span>
        {/if}
      </Field>
    </FieldGroup>
  </form>
</div>
