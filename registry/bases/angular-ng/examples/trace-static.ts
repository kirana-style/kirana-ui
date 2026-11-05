import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}

@Component({
  selector: "trace-static",
  imports: [
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.narrow">
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="GitBranchIcon"
              tabler="IconGitBranch"
              hugeicons="GitBranchIcon"
              phosphor="GitBranchIcon"
              remixicon="RiGitBranchLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Created branch fix/frozen-lockfile</span>
        </span>
      </div>
    </div>
  `,
})
export default class TraceStatic {
  protected readonly styles = styles
  protected readonly page = page
}
