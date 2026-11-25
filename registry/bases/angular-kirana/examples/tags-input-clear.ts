import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldLabel } from "../ui/field"
import { TagsInput, TagsInputClear, TagsInputInput } from "../ui/tags-input"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

@Component({
  selector: "tags-input-clear",
  imports: [
    Field,
    FieldLabel,
    SxDirective,
    TagsInput,
    TagsInputClear,
    TagsInputInput,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="styles.narrow">
        <label kuiFieldLabel for="tags-input-filters">Filters</label>
        <div
          kuiTagsInput
          [defaultValue]="['Open', 'Assigned to me', 'This week']"
        >
          <input
            kuiTagsInputInput
            id="tags-input-filters"
            placeholder="Add a filter"
          />
          <button kuiTagsInputClear></button>
        </div>
      </div>
    </div>
  `,
})
export default class TagsInputClearDemo {
  protected readonly styles = styles
  protected readonly page = page
}
