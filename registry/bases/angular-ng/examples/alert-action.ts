import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

const styles = {
  maxWMd: css({ maxWidth: containerSize.md }),
}

@Component({
  selector: "alert-action",
  imports: [
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
    Button,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiAlert [sx]="styles.maxWMd">
        <div kuiAlertTitle>Dark mode is now available</div>
        <div kuiAlertDescription>
          Enable it under your profile settings to get started.
        </div>
        <div kuiAlertAction>
          <button kuiButton size="xs" variant="default">Enable</button>
        </div>
      </div>
    </div>
  `,
})
export default class AlertActionExample {
  protected readonly styles = styles
  protected readonly page = page
}
