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
  selector: "tags-input-disabled",
  imports: [Field, FieldLabel, SxDirective, TagsInput, TagsInputInput],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.narrow">
        <label kuiFieldLabel for="tags-input-labels">Labels</label>
        <div
          kuiTagsInput
          [disabled]="true"
          [defaultValue]="['Bug', 'Needs review']"
        >
          <input
            kuiTagsInputInput
            id="tags-input-labels"
            placeholder="Add a label"
          />
        </div>
      </div>
    </div>
  `,
})
export default class TagsInputDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
