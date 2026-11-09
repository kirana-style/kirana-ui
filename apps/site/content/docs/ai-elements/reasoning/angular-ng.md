# Reasoning

<!-- ::preview item="reasoning-demo" height="520" combinations="angular/ng" -->

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `TraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="angular/ng" -->

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

```ts showLineNumbers title="reasoning-row.ts"
import { Component, input, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

const styles = {
  reasoningRowTraceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

// Open while it runs, until the reader opens or closes it.

@Component({
  selector: "kui-reasoning-row",
  imports: [
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceLine,
    TraceTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (text().length === 0) {
      <span kuiTraceLine [status]="running() ? 'running' : undefined">
        <span kuiTraceTitle>{{
          running() ? "Thinking" : "Thought for 5s"
        }}</span>
      </span>
    } @else {
      <div
        kuiTraceCollapsible
        [open]="open() ?? running()"
        (openChange)="open.set($event)"
      >
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="running() ? 'running' : undefined">
            <span kuiTraceTitle>{{
              running() ? "Thinking" : "Thought for 5s"
            }}</span>
          </span>
        </button>
        <div
          kuiTraceCollapsibleContent
          [sx]="styles.reasoningRowTraceCollapsibleContent"
        >
          {{ text() }}
        </div>
      </div>
    }
  `,
})
export class ReasoningRow {
  readonly text = input.required<string>()
  readonly running = input.required<boolean>()
  readonly defaultOpen = input<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly styles = styles

  ngOnInit() {
    this.open.set(this.defaultOpen())
  }
}
```

## Duration

The AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `TraceDescription` after the title.

<!-- ::preview item="reasoning-duration" height="290" combinations="angular/ng" -->

## AI SDK

Render each `reasoning` part as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

Some models send several reasoning parts in one message. Each one is a line in the same `Trace`.

## API Reference

See [Trace](/docs/components/trace#api-reference).
