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
    gap: { "*": null, base: space[12] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  flexCol: css({ flexDirection: "column" }),
}

@Component({
  selector: "marker-icon",
  imports: [Marker, MarkerContent, MarkerIcon, IconPlaceholder, SxDirective],
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
        <div kuiMarker variant="separator">
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
        <div kuiMarker [sx]="styles.flexCol">
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="BookOpenCheckIcon"
              tabler="IconBook"
              hugeicons="BookOpen01Icon"
              phosphor="BookOpenIcon"
              remixicon="RiBookOpenLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Syncing completed</span>
        </div>
      </div>
    </div>
  `,
})
export default class MarkerIconExample {
  protected readonly styles = styles
  protected readonly page = page
}
