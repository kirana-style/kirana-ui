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
  selector: "alert-basic",
  imports: [Alert, AlertDescription, AlertTitle, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiAlert [sx]="styles.maxWMd">
        <svg
          iconPlaceholder
          lucide="CheckCircle2Icon"
          tabler="IconCircleCheckFilled"
          hugeicons="CheckmarkCircle02Icon"
          phosphor="CheckCircleIcon"
          remixicon="RiCheckboxCircleLine"
        ></svg>
        <div kuiAlertTitle>Account updated successfully</div>
        <div kuiAlertDescription>
          Your profile information has been saved. Changes will be reflected
          immediately.
        </div>
      </div>
    </div>
  `,
})
export default class AlertBasic {
  protected readonly styles = styles
  protected readonly page = page
}
