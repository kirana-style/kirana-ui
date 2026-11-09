# Tool

<!-- ::preview item="tool-demo" height="490" combinations="angular/ng" -->

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `TraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="angular/ng" -->

## Usage

```ts showLineNumbers
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

The example draws each step with its own parts, which you copy beside it:

```ts showLineNumbers title="types.ts"
import type { UIDataTypes, UIMessage } from "ai"

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

export type ToolPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-runCommand" }
>
```

```ts showLineNumbers title="tool-row.ts"
import { Component, computed, input, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import type { ToolPart } from "./types"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

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
```

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

<!-- ::preview item="tool-states" height="300" combinations="angular/ng" -->

| Tool part state                                           | `status`                             | Title                                                                |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `input-streaming`, `input-available`                      | `"running"` while the chat streams   | Running …                                                            |
| `input-streaming`, `input-available` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                      | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                      | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `output-available`                                        | none                                 | Ran …                                                                |
| `output-error`                                            | `"error"`                            | Failed to run …                                                      |
| `output-denied`                                           | none                                 | Denied …                                                             |

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

## Output in a Sheet

<!-- ::preview item="tool-sheet" height="410" combinations="angular/ng" -->

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

<!-- ::preview item="tool-approval" height="410" combinations="angular/ng" -->

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to the `Chat` so the chat continues once every approval has an answer.

## API Reference

See [Trace](/docs/components/trace#api-reference).
