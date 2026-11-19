import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"

const styles = {
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

@Component({
  selector: "kui-new-milestone",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Set a new milestone</div>
        <div kuiCardDescription>
          Define your financial target and we'll help you pace your savings.
        </div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="goal-name">Goal Name</label>
            <input
              kuiInput
              id="goal-name"
              placeholder="e.g. New Car, Home Downpayment"
            />
          </div>
          <div [sx]="styles.div">
            <div kuiField>
              <label kuiFieldLabel for="target-amount">Target Amount</label>
              <input kuiInput id="target-amount" value="$15,000" />
            </div>
            <div kuiField>
              <label kuiFieldLabel for="target-date">Target Date</label>
              <input kuiInput id="target-date" value="Dec 2025" />
            </div>
          </div>
        </div>
      </div>
      <div kuiCardFooter [sx]="styles.cardFooter">
        <button kuiButton [sx]="styles.button">Create Goal</button>
        <button kuiButton variant="outline" [sx]="styles.button2">
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class NewMilestone {
  protected readonly styles = styles
}
