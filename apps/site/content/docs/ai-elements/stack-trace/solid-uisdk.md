# Stack Trace

<!-- ::preview item="stack-trace-demo" runtimes="ai-sdk,tanstack-ai" height="680" combinations="solid/uisdk" -->

Stack Trace is a line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line.

Stack Trace is built with `Trace` with a `TraceCollapsible` for the frames.

## Installation

Stack Trace is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="solid/uisdk" runtimes="ai-sdk,tanstack-ai" -->

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

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="stack-trace-demo" parts="true" combinations="solid/uisdk" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="stack-trace-demo-tanstack-ai" parts="true" combinations="solid/uisdk" -->

<!-- ::end:runtime -->

The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted, so your own frames stand out.

## Frame Links

Turn your own frames into links that open the file at the line. Fold the framework frames into a collapsible line of their own, so the frames you can fix come first.

<!-- ::preview item="stack-trace-frames" height="380" combinations="solid/uisdk" -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

When a tool throws, its part is `output-error`. By default `errorText` is only the error message, with no frames. Return `error.stack` from `onError` in `toUIMessageStreamResponse` to send them.

```ts showLineNumbers title="app/api/chat/route.ts"
return result.toUIMessageStreamResponse({
  onError: (error) =>
    error instanceof Error ? (error.stack ?? error.message) : String(error),
})
```

A stack shows file paths from your server, so only send it in development.

Map the other tool states as in [Tool](/docs/ai-elements/tool#states).

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

When a server tool throws, its `tool-call` part is `error`, and the `tool-result` part after it carries `error.message` as its `error`, with no frames. To send them, throw again with the stack as the message.

```ts showLineNumbers
const runCommand = runCommandDef.server(async ({ command }) => {
  try {
    return await run(command)
  } catch (error) {
    if (error instanceof Error) throw new Error(error.stack ?? error.message)
    throw error
  }
})
```

A stack shows file paths from your server, so only send it in development.

Map the other tool states as in [Tool](/docs/ai-elements/tool#states).

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
