import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
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
  selector: "marker-separator",
  imports: [Marker, MarkerContent, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMarker variant="separator">
          <span kuiMarkerContent>Today</span>
        </div>
        <div kuiMarker variant="separator">
          <span kuiMarkerContent>Worked for 42s</span>
        </div>
        <div kuiMarker variant="separator">
          <span kuiMarkerContent>Conversation compacted</span>
        </div>
      </div>
    </div>
  `,
})
export default class MarkerSeparator {
  protected readonly styles = styles
  protected readonly page = page
}
