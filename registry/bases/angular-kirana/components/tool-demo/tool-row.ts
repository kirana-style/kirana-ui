import { Component, computed, input, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { ToolPart } from "./types"
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
  toolRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

@Component({
  selector: "kui-tool-row",
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
    @if (
      part().state === "output-available" || part().state === "output-error"
    ) {
      <div kuiTraceCollapsible [defaultOpen]="initiallyOpen()">
        <button kuiTraceCollapsibleTrigger>
          <span
            kuiTraceLine
            [status]="part().state === 'output-error' ? 'error' : undefined"
          >
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
              {{ part().state === "output-error" ? "Failed to run" : "Ran" }}
              {{ command() }}
            </span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <div kuiCodeBlock size="sm">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.toolRowCodeBlockContent"
              >{{
                part().state === "output-error" ? errorText() : stdout()
              }}</pre>
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
export class ToolRow {
  readonly part = input.required<ToolPart>()
  readonly streaming = input.required<boolean>()
  readonly defaultOpen = input<boolean>()
  // Read once, as Base UI's `defaultOpen` is: ng-primitives' follows it, and the chat's end would
  // open a failed call again.
  protected readonly initiallyOpen = signal<boolean | undefined>(undefined)
  protected readonly command = computed(() => this.part().input?.command)
  protected readonly stdout = computed(() => {
    const part = this.part()
    return part.state === "output-available" ? part.output.stdout : ""
  })
  protected readonly errorText = computed(() => {
    const part = this.part()
    return part.state === "output-error" ? part.errorText : ""
  })
  protected readonly styles = styles

  ngOnInit() {
    this.initiallyOpen.set(this.defaultOpen())
  }
}
