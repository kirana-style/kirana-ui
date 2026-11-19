import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { styles } from "./table"
import { Badge } from "../../../ui/badge"

@Component({
  selector: "kui-type-cell",
  imports: [Badge, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.div3">
      <span kuiBadge variant="outline" [sx]="styles.badge">{{ type() }}</span>
    </div>
  `,
})
export class TypeCell {
  readonly type = input.required<string>()
  protected readonly styles = styles
}
