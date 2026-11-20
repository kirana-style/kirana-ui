import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { ToolPart, ToolResultPart } from "./tools"
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
import { StackTrace } from "./stack-trace"

const styles = {
  commandRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

@Component({
  selector: "kui-command-row",
  imports: [
    CodeBlock,
    CodeBlockContent,
    StackTrace,
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
    @if (part().state === "error") {
      <kui-stack-trace [stack]="errorText()" />
    } @else if (part().state === "complete") {
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
              [sx]="styles.commandRowCodeBlockContent"
              >{{ stdout() }}</pre>
          </div>
        </div>
      </div>
    } @else {
      <span kuiTraceLine [status]="streaming() ? 'running' : 'error'">
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
        <span kuiTraceTitle>
          {{ streaming() ? "Running" : "Failed to run" }}
          {{ command() }}
        </span>
      </span>
    }
  `,
})
export class CommandRow {
  readonly part = input.required<ToolPart>()
  /** Its `tool-result` part, which carries a failed call's error (LF-039). */
  readonly result = input<ToolResultPart>()
  readonly streaming = input.required<boolean>()
  protected readonly command = computed<string | undefined>(
    () => this.part().input?.command
  )
  protected readonly stdout = computed(() => {
    const part = this.part()
    return part.state === "complete" ? (part.output?.stdout ?? "") : ""
  })
  protected readonly errorText = computed(() => this.result()?.error ?? "")
  protected readonly styles = styles
}
