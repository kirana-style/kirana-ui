// The target's and the limit's inline field: saved, as a toast says, when it is submitted.
import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { toast } from "ngx-sonner"

import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { styles } from "./table"
import type { Item } from "./table"

@Component({
  selector: "kui-editable-cell",
  imports: [Input, Label, SxDirective],
  host: { style: "display: contents" },
  template: `
    <form (submit)="$event.preventDefault(); save()">
      <label
        kuiLabel
        [attr.for]="id()"
        [sx]="field() === 'target' ? styles.label : styles.label2"
      >
        {{ field() === "target" ? "Target" : "Limit" }}
      </label>
      <input
        kuiInput
        [sx]="field() === 'target' ? styles.input : styles.input2"
        [value]="item()[field()]"
        [attr.id]="id()"
      />
    </form>
  `,
})
export class EditableCell {
  readonly item = input.required<Item>()
  readonly field = input.required<"target" | "limit">()
  protected readonly styles = styles

  protected id() {
    return `${this.item().id}-${this.field()}`
  }

  protected save() {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: `Saving ${this.item().header}`,
      success: "Done",
      error: "Error",
    })
  }
}
