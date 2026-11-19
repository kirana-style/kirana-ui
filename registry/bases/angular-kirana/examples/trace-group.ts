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
  selector: "trace-group",
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
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Searched for minimumReleaseAge</span>
        </span>
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="FileIcon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Read pnpm-workspace.yaml</span>
        </span>
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            ></svg>
          </span>
          <span kuiTraceTitle>Ran pnpm install</span>
        </span>
      </div>
    </div>
  `,
})
export default class TraceGroup {
  protected readonly styles = styles
  protected readonly page = page
}
