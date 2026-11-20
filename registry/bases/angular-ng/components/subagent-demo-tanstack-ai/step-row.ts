import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { Step } from "./tools"
import { IconPlaceholder } from "../../../../icons/angular"
import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

const styles = {
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

@Component({
  selector: "kui-step-row",
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
  host: { style: "display: contents" },
  template: `
    <div kuiTraceCollapsible>
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine>
          <span kuiTraceIcon>
            <svg
              iconPlaceholder
              lucide="CircleCheckIcon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle01Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleFill"
            ></svg>
          </span>
          <span kuiTraceTitle>
            Ran
            {{ step().command }}
          </span>
        </span>
      </button>
      <div kuiTraceCollapsibleContent>
        <div kuiCodeBlock size="sm">
          <pre kuiCodeBlockContent wrap [sx]="styles.stepRowCodeBlockContent">{{
            step().stdout
          }}</pre>
        </div>
      </div>
    </div>
  `,
})
export class StepRow {
  /** A command the subagent ran: its report lists each with its output. */
  readonly step = input.required<Step>()
  protected readonly styles = styles
}
