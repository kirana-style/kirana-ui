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
  selector: "kui-empty-distribute-track",
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
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="Add01Icon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </div>
          <div kuiEmptyHeader>
            <div kuiEmptyTitle>Distribute Track</div>
            <div kuiEmptyDescription>
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton>Create Release</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EmptyDistributeTrack {
  protected readonly styles = styles
}
