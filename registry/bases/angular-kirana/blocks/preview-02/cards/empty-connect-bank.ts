import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../ui/empty"

const styles = {
  empty: css({
    padding: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "kui-empty-connect-bank",
  imports: [
    Button,
    Card,
    CardContent,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <div kuiEmpty [sx]="styles.empty">
          <div kuiEmptyMedia variant="icon">
            <svg
              iconPlaceholder
              lucide="CreditCardIcon"
              tabler="IconCreditCard"
              hugeicons="CreditCardIcon"
              phosphor="CreditCardIcon"
              remixicon="RiBankCardLine"
            ></svg>
          </div>
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>Connect Bank</div>
            <div kuiEmptyDescription>
              Link your payout method to receive monthly royalty distributions
              automatically.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton>Set Up Payouts</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EmptyConnectBank {
  protected readonly styles = styles
}
