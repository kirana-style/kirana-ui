/**
 * Trace's tool-calls demo's step: a command the assistant ran, its output in a collapsible once it
 * finished, or a line while it runs or when it was denied. `<kui-tool-trace>` draws no box of its
 * own (`display: contents`), so its line or collapsible lays out as the trace's own.
 */
import { Component, computed, input } from "@angular/core"
import { css } from "@kirana-style/core"
import type { ToolCallPart, ToolResultPart } from "@tanstack/ai-client"

import { space } from "../../../core/scales"
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
  codeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

@Component({
  selector: "kui-tool-trace",
  imports: [
    CodeBlock,
    CodeBlockContent,
    IconPlaceholder,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  ],
  host: { style: "display: contents" },
  template: `
    @if (done()) {
      <div kuiTraceCollapsible>
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="failed() ? 'error' : undefined">
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
            <span kuiTraceTitle
              >{{ failed() ? "Failed to run" : "Ran" }} {{ command() }}</span
            >
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <div kuiCodeBlock size="sm">
            <pre kuiCodeBlockContent wrap [sx]="styles.codeBlockContent">{{
              output()
            }}</pre>
          </div>
        </div>
      </div>
    } @else if (denied()) {
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
        <span kuiTraceTitle>Denied {{ command() }}</span>
      </span>
    } @else {
      <span kuiTraceLine [status]="live() ? 'running' : 'error'">
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
        <span kuiTraceTitle
          >{{ live() ? "Running" : "Failed to run" }} {{ command() }}</span
        >
      </span>
    }
  `,
})
export class ToolTrace {
  readonly part = input.required<ToolCallPart>()
  /** Its `tool-result` part: a failed call's error, and whether it was denied. */
  readonly result = input<ToolResultPart>()
  readonly live = input(false)
  protected readonly styles = styles
  protected readonly command = computed(
    () => (this.part().input as { command?: string } | undefined)?.command
  )
  protected readonly denied = computed(
    () => this.result()?.outcome === "denied"
  )
  protected readonly done = computed(
    () =>
      !this.denied() &&
      (this.part().state === "complete" || this.part().state === "error")
  )
  protected readonly failed = computed(() => this.part().state === "error")
  protected readonly output = computed(() => {
    const part = this.part()
    return part.state === "error"
      ? (this.result()?.error ?? "")
      : part.state === "complete"
        ? (part.output as { stdout: string }).stdout
        : ""
  })
}
