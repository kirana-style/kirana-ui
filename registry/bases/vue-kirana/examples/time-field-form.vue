<script setup lang="ts">
import { css } from "@kirana-style/core"
import { ref } from "vue"

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

const error = ref<string | null>(null)
const booked = ref<string | null>(null)

function submit(event: SubmitEvent) {
  const data = new FormData(event.currentTarget as HTMLFormElement)
  const time = String(data.get("pickup") ?? "")
  // An ISO time compares as text: "07:30" < "08:00".
  const problem = !time
    ? "Choose a pick-up time."
    : time < "08:00" || time > "18:00"
      ? "We pick up between 8:00 AM and 6:00 PM."
      : null
  if (problem) {
    error.value = problem
    booked.value = null
    return
  }
  error.value = null
  booked.value = time
}
</script>

<template>
  <div :sx="page.example">
    <form :sx="page.narrow" novalidate @submit.prevent="submit">
      <FieldGroup>
        <Field :data-invalid="error ? 'true' : undefined">
          <FieldLabel id="time-field-form-label">Pick-up time</FieldLabel>
          <TimeField
            name="pickup"
            aria-labelledby="time-field-form-label"
            aria-describedby="time-field-form-description time-field-form-error"
            :aria-invalid="error ? true : undefined"
            locale="en-US"
            min="08:00"
            max="18:00"
            required
            @value-change="() => (error = null)"
          />
          <FieldDescription id="time-field-form-description">
            Between 8:00 AM and 6:00 PM.
          </FieldDescription>
          <FieldError v-if="error" id="time-field-form-error">
            {{ error }}
          </FieldError>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">Book</Button>
          <span v-if="booked" :sx="styles.result" aria-live="polite">
            Booked for {{ booked }}.
          </span>
        </Field>
      </FieldGroup>
    </form>
  </div>
</template>
