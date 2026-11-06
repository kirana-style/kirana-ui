import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"

// The target's and the limit's header, aligned as their fields are.
import { styles } from "./table"

@Component({
  selector: "kui-number-header",
  imports: [SxDirective],
  host: { style: "display: contents" },
  template: `
    <div [sx]="field() === 'target' ? styles.div4 : styles.div5">
      {{ field() === "target" ? "Target" : "Limit" }}
    </div>
  `,
})
export class NumberHeader {
  protected readonly styles = styles
  readonly field = input.required<"target" | "limit">()
}
