import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { IconPlaceholder } from "@workspace/registry/icons/angular"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/angular-ng/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/registry/bases/angular-ng/ui/input-group"
import { Item, ItemContent } from "@workspace/registry/bases/angular-ng/ui/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/registry/bases/angular-ng/ui/select"
import { Separator } from "@workspace/registry/bases/angular-ng/ui/separator"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  selectTrigger2: css({
    width: { "*": null, base: "100%" },
  }),
  item: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent: css({
    gap: { "*": null, base: space[3] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  span: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  span3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  span5: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  span6: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

const FROM_ACCOUNTS = [
  { label: "Main Checking (··8402) — $12,450.00", value: "checking" },
  { label: "Business (··7731) — $8,920.00", value: "business" },
]

const TO_ACCOUNTS = [
  { label: "High Yield Savings (··1192) — $42,100.00", value: "savings" },
  { label: "Investment (··3349) — $18,200.00", value: "investment" },
]

@Component({
  selector: "kui-transfer-funds",
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
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    Item,
    ItemContent,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Transfer Funds</div>
        <div kuiCardDescription>
          Move money between your connected accounts.
        </div>
        <div kuiCardAction>
          <button
            kuiButton
            variant="ghost"
            size="icon-sm"
            [sx]="styles.button"
            aria-label="Dismiss transfer funds"
          >
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
            <label kuiFieldLabel for="transfer-amount"
              >Amount to Transfer</label
            >
            <div kuiInputGroup>
              <div kuiInputGroupAddon>
                <span kuiInputGroupText>$</span>
              </div>
              <input
                kuiInputGroupInput
                id="transfer-amount"
                default-value="1,200.00"
              />
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="from-account">From Account</label>
            <ng-container
              kuiSelect
              [items]="FROM_ACCOUNTS"
              defaultValue="checking"
            >
              <button
                kuiSelectTrigger
                id="from-account"
                [sx]="styles.selectTrigger"
              >
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of FROM_ACCOUNTS; track item.value) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="to-account">To Account</label>
            <ng-container
              kuiSelect
              [items]="TO_ACCOUNTS"
              defaultValue="savings"
            >
              <button
                kuiSelectTrigger
                id="to-account"
                [sx]="styles.selectTrigger2"
              >
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of TO_ACCOUNTS; track item.value) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiItem variant="muted" [sx]="styles.item">
            <div kuiItemContent [sx]="styles.itemContent">
              <div [sx]="styles.div">
                <span [sx]="styles.span">Estimated arrival</span>
                <span [sx]="styles.span2">Today, Apr 14</span>
              </div>
              <div kuiSeparator></div>
              <div [sx]="styles.div2">
                <span [sx]="styles.span3">Transaction fee</span>
                <span [sx]="styles.span4">$0.00</span>
              </div>
              <div kuiSeparator></div>
              <div [sx]="styles.div3">
                <span [sx]="styles.span5">Total amount</span>
                <span [sx]="styles.span6">$1,200.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton [sx]="styles.button2">Confirm Transfer</button>
      </div>
    </div>
  `,
})
export class TransferFunds {
  protected readonly styles = styles
  protected readonly FROM_ACCOUNTS = FROM_ACCOUNTS
  protected readonly TO_ACCOUNTS = TO_ACCOUNTS
}
