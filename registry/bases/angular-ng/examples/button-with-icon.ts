import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"

const styles = {
  div: css({
    display: "flex",
    gap: space[2],
  }),
}

@Component({
  selector: "button-with-icon",
  imports: [Button, IconPlaceholder, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <button kuiButton variant="outline">
          <svg
            iconPlaceholder
            lucide="GitBranchIcon"
            tabler="IconGitBranch"
            hugeicons="GitBranchIcon"
            phosphor="GitBranchIcon"
            remixicon="RiGitBranchLine"
            data-icon="inline-start"
          ></svg>
          New Branch
        </button>
        <button kuiButton variant="outline">
          Fork
          <svg
            iconPlaceholder
            lucide="GitForkIcon"
            tabler="IconGitFork"
            hugeicons="GitForkIcon"
            phosphor="GitForkIcon"
            remixicon="RiGitForkLine"
            data-icon="inline-end"
          ></svg>
        </button>
      </div>
    </div>
  `,
})
export default class ButtonWithIcon {
  protected readonly styles = styles
  protected readonly page = page
}
