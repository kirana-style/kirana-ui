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
import { PasswordInput } from "../ui/password-input"
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

/** What is wrong with a new password, or `null` when it will do. */
function check(password: string) {
  if (!password) return "Enter a password."
  if (password.length < 8) return "Use at least 8 characters."
  return null
}

const error = ref<string | null>(null)
const saved = ref(false)

function submit(event: SubmitEvent) {
  const data = new FormData(event.currentTarget as HTMLFormElement)
  const problem = check(String(data.get("password") ?? ""))
  error.value = problem
  saved.value = problem === null
}
</script>

<template>
  <div :sx="page.example">
    <form :sx="page.narrow" novalidate @submit.prevent="submit">
      <FieldGroup>
        <Field :data-invalid="error ? 'true' : undefined">
          <FieldLabel for="password-input-form">New password</FieldLabel>
          <PasswordInput
            id="password-input-form"
            name="password"
            autocomplete="new-password"
            required
            :minlength="8"
            :aria-invalid="error ? true : undefined"
            aria-describedby="password-input-form-description password-input-form-error"
            @value-change="() => ((error = null), (saved = false))"
          />
          <FieldDescription id="password-input-form-description">
            At least 8 characters. It is hidden again when the form is sent.
          </FieldDescription>
          <FieldError v-if="error" id="password-input-form-error">
            {{ error }}
          </FieldError>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit">Save password</Button>
          <span v-if="saved" :sx="styles.result" aria-live="polite">
            Password saved.
          </span>
        </Field>
      </FieldGroup>
    </form>
  </div>
</template>
