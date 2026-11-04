import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { color, containerSize } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const styles = {
  maxWMdBorderAmber200BgAm: css({
    maxWidth: containerSize.md,
    borderColor: {
      "*": null,
      base: `light-dark(${color.amber[200]}, ${color.amber[900]})`,
    },
    backgroundColor: {
      "*": null,
      base: `light-dark(${color.amber[50]}, ${color.amber[950]})`,
    },
    color: {
      "*": null,
      base: `light-dark(${color.amber[900]}, ${color.amber[50]})`,
    },
  }),
}

@Component({
  selector: "alert-colors",
  imports: [Alert, AlertDescription, AlertTitle, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiAlert [sx]="styles.maxWMdBorderAmber200BgAm">
        <svg
          iconPlaceholder
          lucide="AlertTriangleIcon"
          tabler="IconAlertTriangle"
          hugeicons="AlertCircleIcon"
          phosphor="WarningIcon"
          remixicon="RiErrorWarningLine"
        ></svg>
        <div kuiAlertTitle>Your subscription will expire in 3 days.</div>
        <div kuiAlertDescription>
          Renew now to avoid service interruption or upgrade to a paid plan to
          continue using the service.
        </div>
      </div>
    </div>
  `,
})
export default class AlertColors {
  protected readonly styles = styles
  protected readonly page = page
}
