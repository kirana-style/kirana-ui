# Chain of Thought

<!-- ::preview item="chain-of-thought-demo" height="610" combinations="angular/ng" -->

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `TraceCollapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

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

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    searchWeb: {
      input: { query: string }
      output: { results: { title: string; url: string }[] }
    }
    readBuildLog: {
      input: { deployment: string }
      output: { log: string }
    }
    searchCode: {
      input: { query: string }
      output: { files: string[] }
    }
  }
>

export type StepPart = Extract<
  ChatMessage["parts"][number],
  { type: "tool-searchWeb" | "tool-readBuildLog" | "tool-searchCode" }
>

export type Status = "running" | "error" | undefined
```

```ts showLineNumbers title="chain-of-thought.ts"
import { Component, computed, input, signal } from "@angular/core"
import type { Status, StepPart } from "./types"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { StatusIcon } from "./status-icon"
import { StepRow } from "./step-row"

@Component({
  selector: "kui-chain-of-thought",
  imports: [
    StatusIcon,
    StepRow,
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiTrace>
      <div
        kuiTraceCollapsible
        [open]="open() ?? running()"
        (openChange)="open.set($event)"
      >
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="status()">
            <span kuiTraceIcon>
              <kui-status-icon [status]="status()" />
            </span>
            <span kuiTraceTitle>
              {{
                running()
                  ? "Researching"
                  : \`Researched in \${steps().length} steps\${failed() > 0 ? \`, \${failed()} failed\` : ""}\`
              }}
            </span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent keepMounted>
          <div kuiTrace>
            @for (part of steps(); track part.toolCallId) {
              <kui-step-row [part]="part" [streaming]="streaming()" />
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChainOfThought {
  readonly steps = input.required<StepPart[]>()
  readonly streaming = input.required<boolean>()
  readonly answering = input.required<boolean>()
  protected readonly open = signal<boolean | undefined>(undefined)
  protected readonly running = computed(
    () => this.streaming() && !this.answering()
  )
  protected readonly failed = computed(
    () => this.steps().filter((part) => part.state === "output-error").length
  )
  protected readonly status = computed<Status>(() =>
    this.running() ? "running" : this.failed() > 0 ? "error" : undefined
  )
}
```

```ts showLineNumbers title="step-row.ts"
import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontFamily, space } from "@/lib/kirana/scales"
import type { Status, StepPart } from "./types"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import { Badge } from "@/components/ui/badge"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import { Step } from "./step"

const styles = {
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  stepRowCodeBlockContent2: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowDiv: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
  }),
  stepRowBadge: css({
    fontFamily: { "*": null, base: fontFamily.mono },
  }),
}

@Component({
  selector: "kui-step-row",
  imports: [
    Badge,
    CodeBlock,
    CodeBlockContent,
    Step,
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    @if (part().type === "tool-searchWeb") {
      <kui-step
        [status]="status()"
        [content]="content()"
        [title]="\`\${verb('Searching', 'Searched', 'Failed to search')} the web for \${query()}\`"
      >
        @if (part().state === "output-error") {
          <div kuiCodeBlock size="sm" variant="destructive">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent"
              >{{ errorText() }}</pre>
          </div>
        } @else if (part().state === "output-available") {
          <div kuiTrace>
            @for (result of results(); track result.url) {
              <a [attr.href]="result.url" target="_blank" rel="noreferrer">
                <span kuiTraceLine>
                  <span kuiTraceIcon>
                    <svg
                      iconPlaceholder
                      lucide="GlobeIcon"
                      tabler="IconGlobe"
                      hugeicons="Globe02Icon"
                      phosphor="GlobeIcon"
                      remixicon="RiGlobeLine"
                    ></svg>
                  </span>
                  <span kuiTraceTitle>
                    {{ result.title }}
                    <span [sx]="styles.stepRowSpan">(opens in a new tab)</span>
                  </span>
                  <span kuiTraceIcon>
                    <svg
                      iconPlaceholder
                      lucide="ArrowUpRightIcon"
                      tabler="IconArrowUpRight"
                      hugeicons="ArrowUpRightIcon"
                      phosphor="ArrowUpRightIcon"
                      remixicon="RiArrowRightUpLine"
                    ></svg>
                  </span>
                </span>
              </a>
            }
          </div>
        }
      </kui-step>
    } @else if (part().type === "tool-readBuildLog") {
      <kui-step
        [status]="status()"
        [content]="content()"
        [defaultOpen]="true"
        [title]="\`\${verb('Reading', 'Read', 'Failed to read')} the build log for \${deployment()}\`"
      >
        @if (part().state === "output-error") {
          <div kuiCodeBlock size="sm" variant="destructive">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent"
              >{{ errorText() }}</pre>
          </div>
        } @else if (part().state === "output-available") {
          <div kuiCodeBlock size="sm">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent2"
              >{{ log() }}</pre>
          </div>
        }
      </kui-step>
    } @else {
      <kui-step
        [status]="status()"
        [content]="content()"
        [title]="\`\${verb('Searching', 'Searched', 'Failed to search')} the code for \${query()}\`"
      >
        @if (part().state === "output-error") {
          <div kuiCodeBlock size="sm" variant="destructive">
            <pre
              kuiCodeBlockContent
              wrap
              [sx]="styles.stepRowCodeBlockContent"
              >{{ errorText() }}</pre>
          </div>
        } @else if (part().state === "output-available") {
          <div [sx]="styles.stepRowDiv">
            @for (file of files(); track file) {
              <span kuiBadge variant="secondary" [sx]="styles.stepRowBadge">{{
                file
              }}</span>
            }
          </div>
        }
      </kui-step>
    }
  `,
})
export class StepRow {
  readonly part = input.required<StepPart>()
  readonly streaming = input.required<boolean>()
  protected readonly status = computed<Status>(() => {
    const part = this.part()
    return part.state === "output-available"
      ? undefined
      : part.state === "output-error" || !this.streaming()
        ? "error"
        : "running"
  })
  protected readonly content = computed(() => {
    const part = this.part()
    return part.state === "output-error" || part.state === "output-available"
  })
  protected readonly query = computed(() => {
    const part = this.part()
    return part.type === "tool-readBuildLog" ? undefined : part.input?.query
  })
  protected readonly deployment = computed(() => {
    const part = this.part()
    return part.type === "tool-readBuildLog"
      ? part.input?.deployment
      : undefined
  })
  protected readonly errorText = computed(() => {
    const part = this.part()
    return part.state === "output-error" ? part.errorText : ""
  })
  protected readonly results = computed(() => {
    const part = this.part()
    return part.type === "tool-searchWeb" && part.state === "output-available"
      ? part.output.results
      : []
  })
  protected readonly log = computed(() => {
    const part = this.part()
    return part.type === "tool-readBuildLog" &&
      part.state === "output-available"
      ? part.output.log
      : ""
  })
  protected readonly files = computed(() => {
    const part = this.part()
    return part.type === "tool-searchCode" && part.state === "output-available"
      ? part.output.files
      : []
  })
  protected readonly styles = styles

  // What the template reads of the part, each narrowed here, as Angular's templates do not.

  protected verb(running: string, done: string, failed: string) {
    const status = this.status()
    return status === "running" ? running : status === "error" ? failed : done
  }
}
```

```ts showLineNumbers title="step.ts"
import { Component, input } from "@angular/core"
import type { Status } from "./types"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { StatusIcon } from "./status-icon"

/** A step: a line, or a collapsible line when it has `content` to show. */

@Component({
  selector: "kui-step",
  imports: [
    StatusIcon,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  ],
  host: { style: "display: contents" },
  template: `
    @if (content()) {
      <div kuiTraceCollapsible [defaultOpen]="defaultOpen()">
        <button kuiTraceCollapsibleTrigger>
          <span kuiTraceLine [status]="status()">
            <span kuiTraceIcon>
              <kui-status-icon [status]="status()" />
            </span>
            <span kuiTraceTitle>{{ title() }}</span>
          </span>
        </button>
        <div kuiTraceCollapsibleContent>
          <ng-content />
        </div>
      </div>
    } @else {
      <span kuiTraceLine [status]="status()">
        <span kuiTraceIcon>
          <kui-status-icon [status]="status()" />
        </span>
        <span kuiTraceTitle>{{ title() }}</span>
      </span>
    }
  `,
})
export class Step {
  readonly title = input.required<string>()
  readonly status = input<Status>()
  readonly defaultOpen = input<boolean>()
  readonly content = input.required<boolean>()
}
```

## Steps

Each step is a `TraceLine`. Set its `status` and write the title in the matching tense.

| Step              | `status`    | Title                         |
| ----------------- | ----------- | ----------------------------- |
| Running           | `"running"` | Searching for …               |
| Done, with detail | none        | Searched for …                |
| Done, links out   | none        | Read the Image component docs |
| Failed            | `"error"`   | Failed to search for …        |

## Search Results

When a step runs a web search, show the results as a `Badge` for each hostname in the step's content.

## AI SDK

Render each tool part as a step. `running` is true while tool parts stream and before the reply starts. Set the summary's status and title from the steps. The summary opens while the steps run, as in [Trace](/docs/components/trace#open-state).

`StepLine` renders one tool part as a `TraceLine`, as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
