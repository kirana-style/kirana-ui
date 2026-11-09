# Stack Trace

<!-- ::preview item="stack-trace-demo" height="680" combinations="solid/ark" -->

Stack Trace is a line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line.

Stack Trace is built with `Trace` with a `TraceCollapsible` for the frames.

## Installation

Stack Trace is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="solid/ark" -->

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

```tsx showLineNumbers title="command-row.tsx"
import { StackTrace } from "./stack-trace"
import { createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { css } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import type { Sx } from "@kirana-style/core"
import type { ToolPart } from "./types"

export function CommandRow(props: {
  part: ToolPart
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["part", "streaming", "sx", "class"])
  const styles = {
    commandRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = createMemo(() => local.part.input?.command)

  return (
    <>
      {local.part.state === "output-error" ? (
        <StackTrace stack={local.part.errorText} />
      ) : (
        <>
          {local.part.state === "output-available" ? (
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="CommandIcon"
                      tabler="IconCommand"
                      hugeicons="CommandIcon"
                      phosphor="CommandIcon"
                      remixicon="RiCommandLine"
                    />
                  </TraceIcon>
                  <TraceTitle>Ran {command()}</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                <CodeBlock size="sm">
                  <CodeBlockContent wrap sx={styles.commandRowCodeBlockContent}>
                    {local.part.output.stdout}
                  </CodeBlockContent>
                </CodeBlock>
              </TraceCollapsibleContent>
            </TraceCollapsible>
          ) : (
            <TraceLine status={local.streaming ? "running" : "error"}>
              <TraceIcon>
                <IconPlaceholder
                  lucide="CommandIcon"
                  tabler="IconCommand"
                  hugeicons="CommandIcon"
                  phosphor="CommandIcon"
                  remixicon="RiCommandLine"
                />
              </TraceIcon>
              <TraceTitle>
                {local.streaming ? "Running" : "Failed to run"} {command()}
              </TraceTitle>
            </TraceLine>
          )}
        </>
      )}
    </>
  )
}
```

```tsx showLineNumbers title="stack-trace.tsx"
import { For, createMemo, splitProps } from "solid-js"
import { IconPlaceholder } from "@/components/ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { css } from "@kirana-style/core"
import { radius, theme } from "@/lib/kirana/tokens"
import { fontFamily, fontSize, lineHeight, space } from "@/lib/kirana/scales"
import type { Sx } from "@kirana-style/core"

export function StackTrace(props: { stack: string; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["stack", "sx", "class"])
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

  const parsed = createMemo(() => {
    const [error, ...lines] = local.stack.split("\n").map((line) => line.trim())
    const frames = lines.map(parseFrame)
    return {
      error,
      appFrames: frames.filter((frame) => !frame.internal),
      internalFrames: frames.filter((frame) => frame.internal),
    }
  })

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine status="error">
          <TraceIcon>
            <IconPlaceholder
              lucide="CommandIcon"
              tabler="IconCommand"
              hugeicons="CommandIcon"
              phosphor="CommandIcon"
              remixicon="RiCommandLine"
            />
          </TraceIcon>
          <TraceTitle>Failed: {parsed().error}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent sx={styles.stackTraceTraceCollapsibleContent}>
        <p sx={styles.stackTraceP}>{parsed().error}</p>
        <Trace>
          <For each={parsed().appFrames}>
            {(frame) => (
              <a href={`#${frame.file}:${frame.lineNumber}`}>
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="FileCodeIcon"
                      tabler="IconFileCode"
                      hugeicons="File01Icon"
                      phosphor="FileCodeIcon"
                      remixicon="RiFileCodeLine"
                    />
                  </TraceIcon>
                  <TraceTitle>
                    {frame.name} in {frame.file}:{frame.lineNumber}
                  </TraceTitle>
                </TraceLine>
              </a>
            )}
          </For>
          <TraceCollapsible>
            <TraceCollapsibleTrigger>
              <TraceLine>
                <TraceIcon>
                  <IconPlaceholder
                    lucide="LayersIcon"
                    tabler="IconStack2"
                    hugeicons="Layers01Icon"
                    phosphor="StackIcon"
                    remixicon="RiStackLine"
                  />
                </TraceIcon>
                <TraceTitle>
                  {parsed().internalFrames.length} framework frames
                </TraceTitle>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <ol sx={styles.stackTraceOl}>
                <For each={parsed().internalFrames}>
                  {(frame) => <li sx={styles.stackTraceLi}>{frame.line}</li>}
                </For>
              </ol>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
```

The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted, so your own frames stand out.

## Frame Links

Turn your own frames into links that open the file at the line. Fold the framework frames into a collapsible line of their own, so the frames you can fix come first.

<!-- ::preview item="stack-trace-frames" height="380" combinations="solid/ark" -->

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
