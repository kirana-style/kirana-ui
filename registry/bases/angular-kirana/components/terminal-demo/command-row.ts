import { Component, computed, input, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ToolPart } from "./types"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
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
  commandRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

function getTitle(part: ToolPart, running: boolean) {
  const command = part.input?.command

  if (part.state === "output-available") {
    return part.output.exitCode === 0
      ? `Ran ${command}`
      : `${command} exited with code ${part.output.exitCode}`
  }

  return running ? `Running ${command}` : `Failed to run ${command}`
}

@Component({
  selector: "kui-command-row",
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
    <div
      kuiTraceCollapsible
      [open]="open() ?? (running() && output().length > 0)"
      (openChange)="open.set($event)"
    >
      <button kuiTraceCollapsibleTrigger>
        <span
          kuiTraceLine
          [status]="running() ? 'running' : failed() ? 'error' : undefined"
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
          <span kuiTraceTitle>{{ getTitle(part(), running()) }}</span>
        </span>
      </button>
      <div kuiTraceCollapsibleContent>
        <div kuiCodeBlock size="sm">
          <pre
            kuiCodeBlockContent
            wrap
            [sx]="styles.commandRowCodeBlockContent"
            >{{ text() }}</pre>
        </div>
      </div>
    </div>
  `,
})
export class CommandRow {
  readonly part = input.required<ToolPart>()
  readonly output = input.required<string>()
  readonly streaming = input.required<boolean>()
  readonly defaultOpen = input<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly running = computed(() => {
    const part = this.part()
    return (
      this.streaming() &&
      (part.state === "input-streaming" || part.state === "input-available")
    )
  })
  protected readonly failed = computed(() => {
    const part = this.part()
    return (
      !this.running() &&
      (part.state !== "output-available" || part.output.exitCode !== 0)
    )
  })
  protected readonly text = computed(() => {
    const part = this.part()
    return part.state === "output-error" ? part.errorText : this.output()
  })
  protected readonly styles = styles
  protected readonly getTitle = getTitle

  ngOnInit() {
    this.open.set(this.defaultOpen())
  }
}
