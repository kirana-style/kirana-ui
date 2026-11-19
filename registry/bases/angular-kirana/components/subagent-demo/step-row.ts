import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { SubagentPart } from "./types"
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

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
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
    @if (part().state === "output-available") {
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
              {{ command() }}
            </span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <div kuiCodeBlock size="sm">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent"
              >{{ stdout() }}</pre>
          </div>
        </div>
      </div>
    } @else {
      <span kuiTraceLine [status]="running() ? 'running' : 'error'">
        <span kuiTraceIcon>
          @if (running()) {
            <svg
              iconPlaceholder
              lucide="LoaderCircleIcon"
              tabler="IconLoader2"
              hugeicons="Loading03Icon"
              phosphor="CircleNotchIcon"
              remixicon="RiLoader4Line"
              [sx]="styles.stepRowIconPlaceholder"
            ></svg>
          } @else {
            <svg
              iconPlaceholder
              lucide="CircleAlertIcon"
              tabler="IconExclamationCircle"
              hugeicons="AlertCircleIcon"
              phosphor="WarningCircleIcon"
              remixicon="RiErrorWarningLine"
            ></svg>
          }
        </span>
        <span kuiTraceTitle>
          {{ running() ? "Running" : "Failed to run" }}
          {{ command() }}
        </span>
      </span>
    }
  `,
})
export class StepRow {
  readonly part =
    input.required<Extract<SubagentPart, { type: "tool-runCommand" }>>()
  readonly running = input.required<boolean>()
  protected readonly command = computed(() => this.part().input?.command)
  protected readonly stdout = computed(() => {
    const part = this.part()
    return part.state === "output-available" ? part.output.stdout : ""
  })
  protected readonly styles = styles
}
