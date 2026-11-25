import { Show, createSignal } from "solid-js"
import { css } from "@kirana-style/core"

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

export default function PasswordInputForm() {
  const [error, setError] = createSignal<string | null>(null)
  const [saved, setSaved] = createSignal(false)

  return (
    <div sx={page.example}>
      <form
        sx={page.narrow}
        novalidate
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          const problem = check(String(data.get("password") ?? ""))
          setError(problem)
          setSaved(problem === null)
        }}
      >
        <FieldGroup>
          <Field data-invalid={error() ? "true" : undefined}>
            <FieldLabel for="password-input-form">New password</FieldLabel>
            <PasswordInput
              id="password-input-form"
              name="password"
              autocomplete="new-password"
              required
              minlength={8}
              aria-invalid={error() ? "true" : undefined}
              aria-describedby="password-input-form-description password-input-form-error"
              onValueChange={() => {
                setError(null)
                setSaved(false)
              }}
            />
            <FieldDescription id="password-input-form-description">
              At least 8 characters. It is hidden again when the form is sent.
            </FieldDescription>
            <FieldError id="password-input-form-error">{error()}</FieldError>
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Save password</Button>
            <Show when={saved()}>
              <span sx={styles.result} aria-live="polite">
                Password saved.
              </span>
            </Show>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
