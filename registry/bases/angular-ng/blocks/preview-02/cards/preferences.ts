import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../../../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Switch } from "../../../ui/switch"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  fieldSeparator: css({
    marginBlock: { "*": null, base: `calc(${space[4]} * -1)` },
    display: { [axes.style.sera]: "none" },
  }),
  fieldSeparator2: css({
    marginBlock: { "*": null, base: `calc(${space[4]} * -1)` },
    display: { [axes.style.sera]: "none" },
  }),
  button2: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]

@Component({
  selector: "kui-preferences",
  imports: [
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Preferences</div>
        <div kuiCardDescription>
          Manage your account settings and notifications.
        </div>
        <div kuiCardAction>
          <button kuiButton variant="ghost" size="icon-sm" [sx]="styles.button">
            <svg
              iconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            ></svg>
          </button>
        </div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="default-currency">Default Currency</label>
            <ng-container kuiSelect [items]="CURRENCIES" defaultValue="usd">
              <button
                kuiSelectTrigger
                id="default-currency"
                [sx]="styles.selectTrigger"
              >
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of CURRENCIES; track item.value) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiFieldSeparator [sx]="styles.fieldSeparator"></div>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="public-statistics"
                >Public Statistics</label
              >
              <p kuiFieldDescription>
                Allow others to see your total stream count and listening
                activity
              </p>
            </div>
            <span kuiSwitch id="public-statistics" defaultChecked></span>
          </div>
          <div kuiFieldSeparator [sx]="styles.fieldSeparator2"></div>
          <div kuiField orientation="horizontal">
            <div kuiFieldContent>
              <label kuiFieldLabel for="email-notifications"
                >Email Notifications</label
              >
              <p kuiFieldDescription>
                Monthly royalty reports and distribution updates
              </p>
            </div>
            <span kuiSwitch id="email-notifications" defaultChecked></span>
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton variant="outline">Reset</button>
        <button kuiButton [sx]="styles.button2">Save Preferences</button>
      </div>
    </div>
  `,
})
export class Preferences {
  protected readonly styles = styles
  protected readonly CURRENCIES = CURRENCIES
}
