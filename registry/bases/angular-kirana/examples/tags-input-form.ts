import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { TagsInput, TagsInputInput } from "../ui/tags-input"

const styles = {
  form: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: space[4],
  }),
}

@Component({
  selector: "tags-input-form",
  imports: [
    Button,
    Field,
    FieldDescription,
    FieldLabel,
    SxDirective,
    TagsInput,
    TagsInputInput,
  ],
  template: `
    <div [sx]="page.example">
      <form [sx]="styles.form" (submit)="send($event)">
        <div kuiField>
          <label kuiFieldLabel for="tags-input-recipients">Recipients</label>
          <div
            kuiTagsInput
            [name]="'recipients'"
            [required]="true"
            [defaultValue]="['ada@example.com']"
            [validate]="isAddress"
          >
            <input
              kuiTagsInputInput
              id="tags-input-recipients"
              placeholder="Add an email address"
            />
          </div>
          <p kuiFieldDescription>
            {{
              sent() === null
                ? "Press Enter or type a comma after each address."
                : "Sent to " + sent()!.join(", ") + "."
            }}
          </p>
        </div>
        <button kuiButton type="submit">Send invitation</button>
      </form>
    </div>
  `,
})
export default class TagsInputForm {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly sent = signal<string[] | null>(null)
  protected readonly isAddress = (text: string) => text.includes("@")

  protected send(event: SubmitEvent) {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    this.sent.set(new FormData(form).getAll("recipients").map(String))
  }
}
