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
  EmptyMedia,
  EmptyTitle,
} from "../../../ui/empty"
import { Spinner } from "../../../ui/spinner"

const styles = {
  cardContent: css({
    padding: { "*": null, base: space["0"] },
  }),
  empty: css({
    padding: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "kui-syncing-state",
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
    Spinner,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent [sx]="styles.cardContent">
        <div kuiEmpty [sx]="styles.empty">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia variant="icon">
              <svg kuiSpinner></svg>
            </div>
            <div kuiEmptyTitle>Syncing your accounts</div>
            <div kuiEmptyDescription>
              We're pulling in your latest transactions. This usually takes a
              few seconds.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton variant="outline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SyncingState {
  protected readonly styles = styles
}
