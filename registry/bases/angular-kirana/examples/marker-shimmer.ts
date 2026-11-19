import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { shimmer } from "../../../styles/shimmer.styles"
import { Marker, MarkerContent } from "../ui/marker"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

@Component({
  selector: "marker-shimmer",
  imports: [Marker, MarkerContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMarker role="status">
          <span kuiMarkerContent [sx]="shimmer">Thinking...</span>
        </div>
        <div kuiMarker variant="separator" role="status">
          <span kuiMarkerContent [sx]="shimmer">Reading 4 files</span>
        </div>
      </div>
    </div>
  `,
})
export default class MarkerShimmer {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly shimmer = shimmer
}
