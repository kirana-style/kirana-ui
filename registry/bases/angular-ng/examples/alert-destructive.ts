import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const styles = {
  maxWMd: css({ maxWidth: containerSize.md }),
}

@Component({
  selector: "alert-destructive",
  imports: [Alert, AlertDescription, AlertTitle, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiAlert variant="destructive" [sx]="styles.maxWMd">
        <svg
          iconPlaceholder
          lucide="AlertCircleIcon"
          tabler="IconAlertCircle"
          hugeicons="AlertCircleIcon"
          phosphor="WarningCircleIcon"
          remixicon="RiErrorWarningLine"
        ></svg>
        <div kuiAlertTitle>Payment failed</div>
        <div kuiAlertDescription>
          Your payment could not be processed. Please check your payment method
          and try again.
        </div>
      </div>
    </div>
  `,
})
export default class AlertDestructive {
  protected readonly styles = styles
  protected readonly page = page
}
