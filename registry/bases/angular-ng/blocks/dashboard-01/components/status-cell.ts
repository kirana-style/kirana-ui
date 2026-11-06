import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { styles } from "./table"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Badge } from "../../../ui/badge"

@Component({
  selector: "kui-status-cell",
  imports: [Badge, IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    <span kuiBadge variant="outline" [sx]="styles.badge2">
      @if (status() === "Done") {
        <svg
          iconPlaceholder
          lucide="CircleCheckIcon"
          tabler="IconCircleCheckFilled"
          hugeicons="CheckmarkCircle01Icon"
          phosphor="CheckCircleIcon"
          remixicon="RiCheckboxCircleFill"
          [sx]="styles.iconPlaceholder"
        ></svg>
      } @else {
        <svg
          iconPlaceholder
          lucide="LoaderIcon"
          tabler="IconLoader"
          hugeicons="Loading03Icon"
          phosphor="SpinnerIcon"
          remixicon="RiLoader4Line"
        ></svg>
      }
      {{ status() }}
    </span>
  `,
})
export class StatusCell {
  readonly status = input.required<string>()
  protected readonly styles = styles
}
