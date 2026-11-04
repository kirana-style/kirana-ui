import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const styles = {
  gridWFullMaxWMdItemsStar: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    alignItems: "flex-start",
    gap: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "alert-demo",
  imports: [Alert, AlertDescription, AlertTitle, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.gridWFullMaxWMdItemsStar">
        <div kuiAlert>
          <svg
            iconPlaceholder
            lucide="CheckCircle2Icon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
          ></svg>
          <div kuiAlertTitle>Payment successful</div>
          <div kuiAlertDescription>
            Your payment of $29.99 has been processed. A receipt has been sent
            to your email address.
          </div>
        </div>
        <div kuiAlert>
          <svg
            iconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="AlertCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
          ></svg>
          <div kuiAlertTitle>New feature available</div>
          <div kuiAlertDescription>
            We've added dark mode support. You can enable it in your account
            settings.
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AlertDemo {
  protected readonly styles = styles
  protected readonly page = page
}
