# Stack Trace

<!-- ::preview item="stack-trace-demo" height="680" combinations="angular/ng" -->

Stack Trace is a line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line.

Stack Trace is built with `Trace` with a `TraceCollapsible` for the frames.

## Installation

Stack Trace is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="angular/ng" -->

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

```ts showLineNumbers title="command-row.ts"
import { Component, computed, input } from "@angular/core"
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
    @if (part().state === "output-error") {
      <kui-stack-trace [stack]="errorText()" />
    } @else if (part().state === "output-available") {
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
  readonly streaming = input.required<boolean>()
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
}
```

```ts showLineNumbers title="stack-trace.ts"
import { Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "@/lib/kirana/tokens"
import { fontFamily, fontSize, lineHeight, space } from "@/lib/kirana/scales"
import { IconPlaceholder } from "@/lib/kirana/icons/angular"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

const styles = {
  stackTraceTraceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  stackTraceP: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.destructive,
  }),
  stackTraceOl: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    overflowX: "auto",
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    padding: space[3],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  stackTraceLi: css({
    whiteSpace: "nowrap",
  }),
}

function parseFrame(line: string) {
  const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/)

  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes("node_modules") || line.includes("node:"),
  }
}

@Component({
  selector: "kui-stack-trace",
  imports: [
    Trace,
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
    <div kuiTraceCollapsible defaultOpen>
      <button kuiTraceCollapsibleTrigger>
        <span kuiTraceLine status="error">
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
            Failed:
            {{ parsed().error }}
          </span>
        </span>
      </button>
      <div
        kuiTraceCollapsibleContent
        [sx]="styles.stackTraceTraceCollapsibleContent"
      >
        <p [sx]="styles.stackTraceP">{{ parsed().error }}</p>
        <div kuiTrace>
          @for (frame of parsed().appFrames; track frame.line) {
            <a [attr.href]="\`#\${frame.file}:\${frame.lineNumber}\`">
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <svg
                    iconPlaceholder
                    lucide="FileCodeIcon"
                    tabler="IconFileCode"
                    hugeicons="File01Icon"
                    phosphor="FileCodeIcon"
                    remixicon="RiFileCodeLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>
                  {{ frame.name }}
                  in
                  {{ frame.file }}:{{ frame.lineNumber }}
                </span>
              </span>
            </a>
          }
          <div kuiTraceCollapsible>
            <button kuiTraceCollapsibleTrigger>
              <span kuiTraceLine>
                <span kuiTraceIcon>
                  <svg
                    iconPlaceholder
                    lucide="LayersIcon"
                    tabler="IconStack2"
                    hugeicons="Layers01Icon"
                    phosphor="StackIcon"
                    remixicon="RiStackLine"
                  ></svg>
                </span>
                <span kuiTraceTitle>
                  {{ parsed().internalFrames.length }}
                  framework frames
                </span>
              </span>
            </button>
            <div kuiTraceCollapsibleContent>
              <ol [sx]="styles.stackTraceOl">
                @for (frame of parsed().internalFrames; track frame.line) {
                  <li [sx]="styles.stackTraceLi">{{ frame.line }}</li>
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StackTrace {
  readonly stack = input.required<string>()
  protected readonly parsed = computed(() => {
    const [error, ...lines] = this.stack()
      .split("\n")
      .map((line) => line.trim())
    const frames = lines.map(parseFrame)
    return {
      error,
      appFrames: frames.filter((frame) => !frame.internal),
      internalFrames: frames.filter((frame) => frame.internal),
    }
  })
  protected readonly styles = styles
}
```

The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted, so your own frames stand out.

## Frame Links

Turn your own frames into links that open the file at the line. Fold the framework frames into a collapsible line of their own, so the frames you can fix come first.

<!-- ::preview item="stack-trace-frames" height="380" combinations="angular/ng" -->

## AI SDK

When a tool throws, its part is `output-error`. By default `errorText` is only the error message, with no frames. Return `error.stack` from `onError` in `toUIMessageStreamResponse` to send them.

```ts showLineNumbers title="app/api/chat/route.ts"
return result.toUIMessageStreamResponse({
  onError: (error) =>
    error instanceof Error ? (error.stack ?? error.message) : String(error),
})
```

A stack shows file paths from your server, so only send it in development.

Map the other tool states as in [Tool](/docs/ai-elements/tool#states).

## API Reference

See [Trace](/docs/components/trace#api-reference).
