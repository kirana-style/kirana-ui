<script lang="ts">
  import { css } from "@kirana-style/core"

  import { Button } from "../ui/button"
  import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
  } from "../ui/field"
  import { TimeField } from "../ui/time-field"
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

  let error = $state<string | null>(null)
  let booked = $state<string | null>(null)

  function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const time = String(data.get("pickup") ?? "")
    // An ISO time compares as text: "07:30" < "08:00".
    const problem = !time
      ? "Choose a pick-up time."
      : time < "08:00" || time > "18:00"
        ? "We pick up between 8:00 AM and 6:00 PM."
        : null
    if (problem) {
      error = problem
      booked = null
      return
    }
    error = null
    booked = time
  }
</script>

<div sx={page.example}>
  <form sx={page.narrow} novalidate onsubmit={submit}>
    <FieldGroup>
      <Field data-invalid={error ? "true" : undefined}>
        <FieldLabel id="time-field-form-label">Pick-up time</FieldLabel>
        <TimeField
          name="pickup"
          aria-labelledby="time-field-form-label"
          aria-describedby="time-field-form-description time-field-form-error"
          aria-invalid={error ? true : undefined}
          locale="en-US"
          min="08:00"
          max="18:00"
          required
          onValueChange={() => (error = null)}
        />
        <FieldDescription id="time-field-form-description">
          Between 8:00 AM and 6:00 PM.
        </FieldDescription>
        {#if error}
          <FieldError id="time-field-form-error">{error}</FieldError>
        {/if}
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">Book</Button>
        {#if booked}
          <span sx={styles.result} aria-live="polite">
            Booked for {booked}.
          </span>
        {/if}
      </Field>
    </FieldGroup>
  </form>
</div>
