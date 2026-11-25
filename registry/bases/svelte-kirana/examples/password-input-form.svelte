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

  let error = $state<string | null>(null)
  let saved = $state(false)

  function submit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const problem = check(String(data.get("password") ?? ""))
    error = problem
    saved = problem === null
  }
</script>

<div sx={page.example}>
  <form sx={page.narrow} novalidate onsubmit={submit}>
    <FieldGroup>
      <Field data-invalid={error ? "true" : undefined}>
        <FieldLabel for="password-input-form">New password</FieldLabel>
        <PasswordInput
          id="password-input-form"
          name="password"
          autocomplete="new-password"
          required
          minlength={8}
          aria-invalid={error ? true : undefined}
          aria-describedby="password-input-form-description password-input-form-error"
          onValueChange={() => {
            error = null
            saved = false
          }}
        />
        <FieldDescription id="password-input-form-description">
          At least 8 characters. It is hidden again when the form is sent.
        </FieldDescription>
        {#if error}
          <FieldError id="password-input-form-error">{error}</FieldError>
        {/if}
      </Field>
      <Field orientation="horizontal">
        <Button type="submit">Save password</Button>
        {#if saved}
          <span sx={styles.result} aria-live="polite">
            Password saved.
          </span>
        {/if}
      </Field>
    </FieldGroup>
  </form>
</div>
