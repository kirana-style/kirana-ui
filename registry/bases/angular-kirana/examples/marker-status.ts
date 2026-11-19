import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"
import { Spinner } from "../ui/spinner"

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
  selector: "marker-status",
  imports: [Marker, MarkerContent, MarkerIcon, Spinner, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMarker role="status">
          <span kuiMarkerIcon>
            <svg kuiSpinner></svg>
          </span>
          <span kuiMarkerContent>Compacting conversation</span>
        </div>
        <div kuiMarker variant="separator" role="status">
          <span kuiMarkerIcon>
            <svg kuiSpinner></svg>
          </span>
          <span kuiMarkerContent>Running tests</span>
        </div>
      </div>
    </div>
  `,
})
export default class MarkerStatus {
  protected readonly styles = styles
  protected readonly page = page
}
