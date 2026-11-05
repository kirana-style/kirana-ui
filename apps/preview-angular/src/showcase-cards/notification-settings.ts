import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"
import { Checkbox } from "@workspace/registry/bases/angular-ng/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/angular-ng/ui/field"

const styles = {
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

const NOTIFICATIONS = [
  {
    id: "transactions",
    label: "Transaction alerts",
    description: "Deposits, withdrawals, and transfers.",
    defaultChecked: true,
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Login attempts and account changes.",
    defaultChecked: true,
  },
  {
    id: "goals",
    label: "Goal milestones",
    description: "Updates at 25%, 50%, 75%, and 100%.",
    defaultChecked: false,
  },
  {
    id: "market",
    label: "Market updates",
    description: "Daily portfolio summary and price alerts.",
    defaultChecked: false,
  },
]

@Component({
  selector: "kui-notification-settings",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Notifications</div>
        <div kuiCardDescription>
          Choose which email and push alerts you want to receive.
        </div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          @for (n of NOTIFICATIONS; track n.id) {
            <div kuiField orientation="horizontal">
              <span
                kuiCheckbox
                [id]="\`notify-\${n.id}\`"
                [defaultChecked]="n.defaultChecked"
              ></span>
              <div kuiFieldContent>
                <label kuiFieldLabel [attr.for]="\`notify-\${n.id}\`">{{
                  n.label
                }}</label>
                <p kuiFieldDescription>{{ n.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton [sx]="styles.button">Save Preferences</button>
      </div>
    </div>
  `,
})
export class NotificationSettings {
  protected readonly styles = styles
  protected readonly NOTIFICATIONS = NOTIFICATIONS
}
