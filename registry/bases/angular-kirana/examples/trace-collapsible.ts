import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
  maxH64: css({ maxHeight: space[64] }),
}

@Component({
  selector: "trace-collapsible",
  imports: [
    CodeBlock,
    CodeBlockContent,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.narrowSm">
        <div kuiTraceCollapsible>
          <button kuiTraceCollapsibleTrigger>
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
              <span kuiTraceTitle>Ran node --version</span>
            </span>
          </button>
          <div kuiTraceCollapsibleContent>
            <div kuiCodeBlock size="sm">
              <pre kuiCodeBlockContent wrap [sx]="styles.maxH64">{{
                "$ node --version
v24.18.0"
              }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class TraceCollapsibleExample {
  protected readonly styles = styles
  protected readonly page = page
}
