import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { containerSize, duration, easing, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Marker, MarkerContent, MarkerIcon } from "../ui/marker"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  transitionColorsHoverTex: css({
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    color: { ":hover": theme.foreground },
  }),
}

@Component({
  selector: "marker-link-button",
  imports: [Marker, MarkerContent, MarkerIcon, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <a kuiMarker href="#links-and-buttons">
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
          <span kuiMarkerContent>View the pull request</span>
        </a>
        <button
          kuiMarker
          type="button"
          [sx]="styles.transitionColorsHoverTex"
          (click)="toast('You clicked the revert button')"
        >
          <span kuiMarkerIcon>
            <svg
              iconPlaceholder
              lucide="RotateCcwIcon"
              tabler="IconRotate"
              hugeicons="RotateLeft01Icon"
              phosphor="ArrowCounterClockwiseIcon"
              remixicon="RiArrowGoBackLine"
            ></svg>
          </span>
          <span kuiMarkerContent>Revert this change</span>
        </button>
      </div>
    </div>
  `,
})
export default class MarkerLinkButton {
  protected readonly styles = styles
  protected readonly toast = toast
  protected readonly page = page
}
