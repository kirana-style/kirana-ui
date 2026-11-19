import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { Spinner } from "../ui/spinner"

const styles = {
  full: css({ width: "100%" }),
}

@Component({
  selector: "spinner-empty",
  imports: [
    Button,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    Spinner,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiEmpty [sx]="styles.full">
        <div kuiEmptyHeader>
          <div kuiEmptyMedia variant="icon">
            <svg kuiSpinner></svg>
          </div>
          <div kuiEmptyTitle>Processing your request</div>
          <div kuiEmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </div>
        </div>
        <div kuiEmptyContent>
          <button kuiButton variant="outline" size="sm">Cancel</button>
        </div>
      </div>
    </div>
  `,
})
export default class SpinnerEmpty {
  protected readonly styles = styles
  protected readonly page = page
}
