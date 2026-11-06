import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Checkbox } from "../../../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../ui/field"

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
        <div kuiCardDescription>Choose what you want to be notified about.</div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField orientation="horizontal">
            <span
              kuiCheckbox
              id="notify-all"
              [checked]="allChecked()"
              [indeterminate]="someChecked()"
              (checkedChange)="handleSelectAll($event)"
            ></span>
            <div kuiFieldContent>
              <label kuiFieldLabel for="notify-all">Select all</label>
            </div>
          </div>
          @for (n of NOTIFICATIONS; track n.id) {
            <div kuiField orientation="horizontal">
              <span
                kuiCheckbox
                [id]="'notify-' + n.id"
                [checked]="checked()[n.id]"
                (checkedChange)="handleToggle(n.id, $event)"
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
  protected readonly checked = signal<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.defaultChecked]))
  )
  protected readonly styles = styles
  protected readonly NOTIFICATIONS = NOTIFICATIONS
  protected readonly allChecked = computed(() =>
    NOTIFICATIONS.every((n) => this.checked()[n.id])
  )
  protected readonly someChecked = computed(
    () => NOTIFICATIONS.some((n) => this.checked()[n.id]) && !this.allChecked()
  )
  protected readonly handleSelectAll = (value: boolean) => {
    this.checked.set(
      Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, value]))
    )
  }
  protected readonly handleToggle = (id: string, value: boolean) => {
    this.checked.set({ ...this.checked(), [id]: value })
  }
}
