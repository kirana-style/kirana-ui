import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { TagsInput, TagsInputInput } from "../ui/tags-input"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

const MAX = 3

@Component({
  selector: "tags-input-max",
  imports: [
    Field,
    FieldDescription,
    FieldLabel,
    SxDirective,
    TagsInput,
    TagsInputInput,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.narrow">
        <label kuiFieldLabel for="tags-input-topics">Topics</label>
        <div
          kuiTagsInput
          [value]="topics()"
          [max]="max"
          (valueChanged)="topics.set($event.value)"
        >
          <input
            kuiTagsInputInput
            id="tags-input-topics"
            [attr.placeholder]="topics().length < max ? 'Add a topic' : null"
          />
        </div>
        <p kuiFieldDescription>{{ topics().length }} of {{ max }} topics.</p>
      </div>
    </div>
  `,
})
export default class TagsInputMax {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly max = MAX
  protected readonly topics = signal<readonly string[]>(["Design", "Research"])
}
