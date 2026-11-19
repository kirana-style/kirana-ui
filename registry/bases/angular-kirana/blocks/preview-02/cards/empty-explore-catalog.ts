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
  selector: "kui-empty-explore-catalog",
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
              lucide="AudioLinesIcon"
              tabler="IconPlayerRecordFilled"
              hugeicons="AudioWave01Icon"
              phosphor="RecordIcon"
              remixicon="RiRecordCircleLine"
            ></svg>
          </div>
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>Explore Catalog</div>
            <div kuiEmptyDescription>
              Check your ISRC codes, metadata, and visual assets before going
              live.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton>View Catalog</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EmptyExploreCatalog {
  protected readonly styles = styles
}
