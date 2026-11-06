import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "../../../ui/empty"

const styles = {
  empty: css({
    height: { "*": null, base: space[48] },
  }),
}

@Component({
  selector: "kui-anomaly-alert",
  imports: [
    Button,
    Card,
    CardContent,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <div kuiEmpty [sx]="styles.empty">
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>Get alerted for anomalies</div>
            <div kuiEmptyDescription>
              Automatically monitor your projects for anomalies and get
              notified.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton>Upgrade to Observability Plus</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AnomalyAlert {
  protected readonly styles = styles
}
