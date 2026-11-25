import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[3] }),
  value: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

const PRICES: Record<string, string> = {
  monthly: "$12 a month",
  yearly: "$120 a year",
}

@Component({
  selector: "segmented-control-form",
  imports: [
    Field,
    FieldDescription,
    FieldLabel,
    SegmentedControl,
    SegmentedControlItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiField [sx]="page.narrow">
        <label kuiFieldLabel id="segmented-control-form-label">Billing</label>
        <div [sx]="styles.row">
          <div
            kuiSegmentedControl
            aria-labelledby="segmented-control-form-label"
            [(value)]="billing"
          >
            <button kuiSegmentedControlItem value="monthly">Monthly</button>
            <button kuiSegmentedControlItem value="yearly">Yearly</button>
          </div>
          <span [sx]="styles.value" aria-live="polite">{{
            prices[billing() ?? "monthly"]
          }}</span>
        </div>
        <p kuiFieldDescription>Change the plan at any time.</p>
      </div>
    </div>
  `,
})
export default class SegmentedControlForm {
  protected readonly billing = signal<string | undefined>("monthly")
  protected readonly prices = PRICES
  protected readonly styles = styles
  protected readonly page = page
}
