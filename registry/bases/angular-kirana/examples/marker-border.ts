import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[3] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

@Component({
  selector: "marker-border",
  imports: [Marker, MarkerContent, MarkerIcon, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMarker variant="border">
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
          <span kuiMarkerContent>Switched to release-candidate</span>
        </div>
        <div kuiMarker variant="border">
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
          <span kuiMarkerContent>Reviewed 8 related files</span>
        </div>
        <div kuiMarker variant="border">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Opened implementation notes</span>
        </div>
      </div>
    </div>
  `,
})
export default class MarkerBorder {
  protected readonly styles = styles
  protected readonly page = page
}
