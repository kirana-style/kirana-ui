import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { TagsInput, TagsInputInput } from "../ui/tags-input"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

@Component({
  selector: "tags-input-demo",
  imports: [Field, FieldLabel, SxDirective, TagsInput, TagsInputInput],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.narrow">
        <label kuiFieldLabel for="tags-input-skills">Skills</label>
        <div kuiTagsInput [defaultValue]="['React', 'TypeScript']">
          <input
            kuiTagsInputInput
            id="tags-input-skills"
            placeholder="Add a skill"
          />
        </div>
      </div>
    </div>
  `,
})
export default class TagsInputDemo {
  protected readonly styles = styles
  protected readonly page = page
}
