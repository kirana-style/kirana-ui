import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Rating } from "../ui/rating"
import { Textarea } from "../ui/textarea"

const styles = {
  result: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "rating-form",
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Rating,
    SxDirective,
    Textarea,
  ],
  template: `
    <div [sx]="page.example">
      <form [sx]="page.narrow" (submit)="submit($event)">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel id="rating-form-label"
              >Rate this article</label
            >
            <div
              kuiRating
              [name]="'rating'"
              aria-labelledby="rating-form-label"
            ></div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="rating-form-comment">Comment</label>
            <textarea
              kuiTextarea
              id="rating-form-comment"
              name="comment"
              placeholder="What could be better?"
            ></textarea>
            <p kuiFieldDescription>Optional.</p>
          </div>
          <div kuiField orientation="horizontal">
            <button kuiButton type="submit">Send</button>
            @if (sent()) {
              <span [sx]="styles.result" aria-live="polite">{{ sent() }}</span>
            }
          </div>
        </div>
      </form>
    </div>
  `,
})
export default class RatingForm {
  protected readonly sent = signal<string | null>(null)
  protected readonly styles = styles
  protected readonly page = page

  protected submit(event: SubmitEvent) {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    const rating = String(data.get("rating") ?? "")
    this.sent.set(rating ? `Sent ${rating} of 5.` : "Sent with no rating.")
  }
}
