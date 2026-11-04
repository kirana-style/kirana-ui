import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { shimmer } from "../../../styles/shimmer.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
  selector: "marker-demo",
  imports: [
    Marker,
    MarkerContent,
    MarkerIcon,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMarker>
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Switched to a new branch</span>
        </div>
        <div kuiMarker role="status">
          <span kuiMarkerIcon>
            <svg kuiSpinner></svg>
          </span>
          <span kuiMarkerContent [sx]="shimmer">Thinking...</span>
        </div>
        <div kuiMarker variant="separator">
          <span kuiMarkerContent>Conversation compacted</span>
        </div>
        <div kuiMarker>
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Explored 4 files</span>
        </div>
      </div>
    </div>
  `,
})
export default class MarkerDemo {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly shimmer = shimmer
}
