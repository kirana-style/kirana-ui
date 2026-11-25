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
import { TimeField } from "../ui/time-field"

const styles = {
  result: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "time-field-form",
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    SxDirective,
    TimeField,
  ],
  template: `
    <div [sx]="page.example">
      <form [sx]="page.narrow" novalidate (submit)="submit($event)">
        <div kuiFieldGroup>
          <div kuiField [attr.data-invalid]="error() ? 'true' : null">
            <label kuiFieldLabel id="time-field-form-label">Pick-up time</label>
            <div
              kuiTimeField
              aria-labelledby="time-field-form-label"
              aria-describedby="time-field-form-description time-field-form-error"
              [attr.aria-invalid]="error() ? true : null"
              [name]="'pickup'"
              [locale]="'en-US'"
              [min]="'08:00'"
              [max]="'18:00'"
              [required]="true"
              (valueChanged)="error.set(null)"
            ></div>
            <p kuiFieldDescription id="time-field-form-description">
              Between 8:00 AM and 6:00 PM.
            </p>
            <div
              kuiFieldError
              id="time-field-form-error"
              [errors]="error() ? [{ message: error()! }] : undefined"
            ></div>
          </div>
          <div kuiField orientation="horizontal">
            <button kuiButton type="submit">Book</button>
            @if (booked()) {
              <span [sx]="styles.result" aria-live="polite">
                Booked for {{ booked() }}.
              </span>
            }
          </div>
        </div>
      </form>
    </div>
  `,
})
export default class TimeFieldForm {
  protected readonly error = signal<string | null>(null)
  protected readonly booked = signal<string | null>(null)
  protected readonly styles = styles
  protected readonly page = page

  protected submit(event: SubmitEvent) {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    const time = String(data.get("pickup") ?? "")
    // An ISO time compares as text: "07:30" < "08:00".
    const problem = !time
      ? "Choose a pick-up time."
      : time < "08:00" || time > "18:00"
        ? "We pick up between 8:00 AM and 6:00 PM."
        : null
    if (problem) {
      this.error.set(problem)
      this.booked.set(null)
      return
    }
    this.error.set(null)
    this.booked.set(time)
  }
}
