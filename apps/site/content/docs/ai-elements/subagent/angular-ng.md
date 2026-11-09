# Subagent

<!-- ::preview item="subagent-demo" height="710" combinations="angular/ng" -->

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="angular/ng" -->

## Usage

```ts showLineNumbers
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

export type SubagentMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

export type SubagentPart = SubagentMessage["parts"][number]

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    researchAgent: {
      input: { task: string }
      output: SubagentMessage
    }
  }
>

export type Part = ChatMessage["parts"][number]
```

```ts showLineNumbers title="subagent-row.ts"
import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import type { Part } from "./types"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
} from "@/components/ui/trace"
import { StepRow } from "./step-row"
import { SubagentLine } from "./subagent-line"

const styles = {
  subagentRowTraceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
}

@Component({
  selector: "kui-subagent-row",
  imports: [
    StepRow,
    SubagentLine,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (parts().length === 0) {
      <kui-subagent-line [done]="done()" [running]="running()" />
    } @else {
      <div kuiTraceCollapsible defaultOpen>
        <button kuiTraceCollapsibleTrigger>
          <kui-subagent-line [done]="done()" [running]="running()" />
        </button>
        <div
          kuiTraceCollapsibleContent
          keepMounted
          [sx]="styles.subagentRowTraceCollapsibleContent"
        >
          <div kuiTrace>
            @for (
              agentPart of parts();
              track agentPart.type === "tool-runCommand"
                ? agentPart.toolCallId
                : undefined
            ) {
              @if (agentPart.type === "tool-runCommand") {
                <kui-step-row [part]="agentPart" [running]="running()" />
              }
            }
          </div>
          @if (report()) {
            <p>{{ report() }}</p>
          }
        </div>
      </div>
    }
  `,
})
export class SubagentRow {
  readonly part =
    input.required<Extract<Part, { type: "tool-researchAgent" }>>()
  readonly streaming = input.required<boolean>()
  protected readonly done = computed(() => {
    const part = this.part()
    return part.state === "output-available" && !part.preliminary
  })
  protected readonly running = computed(
    () =>
      !this.done() && this.part().state !== "output-error" && this.streaming()
  )
  protected readonly parts = computed(() => {
    const part = this.part()
    return part.state === "output-available" ? part.output.parts : []
  })
  protected readonly report = computed(() =>
    this.parts()
      .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
      .join("")
  )
  protected readonly styles = styles
}
```

```ts showLineNumbers title="subagent-line.ts"
import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import { TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  subagentRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

@Component({
  selector: "kui-subagent-line",
  imports: [TraceIcon, TraceLine, TraceTitle, IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    <span
      kuiTraceLine
      [status]="done() ? undefined : running() ? 'running' : 'error'"
    >
      <span kuiTraceIcon>
        @if (done()) {
          <svg
            iconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          ></svg>
        } @else if (running()) {
          <svg
            iconPlaceholder
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            [sx]="styles.subagentRowIconPlaceholder"
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
        {{ done() ? "Ran" : running() ? "Running" : "Failed to run" }}
        the research subagent
      </span>
    </span>
  `,
})
export class SubagentLine {
  readonly done = input.required<boolean>()
  readonly running = input.required<boolean>()
  protected readonly styles = styles
}
```

```ts showLineNumbers title="step-row.ts"
import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import type { SubagentPart } from "./types"
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
```

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<!-- ::preview item="subagent-running" height="200" combinations="angular/ng" -->

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

<!-- ::preview item="subagent-details" height="340" combinations="angular/ng" -->

## AI SDK

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Map each nested tool part as in [Tool](/docs/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `TraceLine` status                 | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

## API Reference

See [Trace](/docs/components/trace#api-reference).
