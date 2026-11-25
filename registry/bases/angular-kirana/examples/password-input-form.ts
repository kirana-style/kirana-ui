import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field"
import { PasswordInput } from "../ui/password-input"

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

@Component({
  selector: "password-input-form",
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    PasswordInput,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <form [sx]="page.narrow" novalidate (submit)="submit($event)">
        <div kuiFieldGroup>
          <div kuiField [attr.data-invalid]="error() ? 'true' : null">
            <label kuiFieldLabel for="password-input-form">New password</label>
            <div
              kuiPasswordInput
              id="password-input-form"
              name="password"
              autocomplete="new-password"
              [required]="true"
              [minLength]="8"
              [aria-invalid]="error() ? true : undefined"
              aria-describedby="password-input-form-description password-input-form-error"
              (valueChanged)="changed()"
            ></div>
            <p kuiFieldDescription id="password-input-form-description">
              At least 8 characters. It is hidden again when the form is sent.
            </p>
            <div
              kuiFieldError
              id="password-input-form-error"
              [errors]="error() ? [{ message: error()! }] : undefined"
            ></div>
          </div>
          <div kuiField orientation="horizontal">
            <button kuiButton type="submit">Save password</button>
            @if (saved()) {
              <span [sx]="styles.result" aria-live="polite">
                Password saved.
              </span>
            }
          </div>
        </div>
      </form>
    </div>
  `,
})
export default class PasswordInputForm {
  protected readonly error = signal<string | null>(null)
  protected readonly saved = signal(false)
  protected readonly styles = styles
  protected readonly page = page

  protected submit(event: SubmitEvent) {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    const problem = check(String(data.get("password") ?? ""))
    this.error.set(problem)
    this.saved.set(problem === null)
  }

  protected changed() {
    this.error.set(null)
    this.saved.set(false)
  }
}
