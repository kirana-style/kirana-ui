---
title: Stack Trace
description: Displays a failed tool call and its stack frames.
section: ai-elements
variants: [react/base, react/aria]
keywords: [stack trace, ai elements, agent, chat]
---

# Stack Trace

<!-- ::preview item="stack-trace-demo" height="680" combinations="react/base,react/aria" -->

Stack Trace is a line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line.

Stack Trace is built with `Trace` with a `TraceCollapsible` for the frames.

## Installation

Stack Trace is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="react/base,react/aria" -->

## Usage

```tsx showLineNumbers
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

```tsx showLineNumbers
const styles = {
  frames: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    padding: space[3],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  error: css({ color: theme.destructive }),
  ownFrame: css({ color: theme.foreground }),
}

const [error, ...frames] = stack.split("\n").map((line) => line.trim())

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine status="error">
        <TraceIcon>
          <CircleXIcon />
        </TraceIcon>
        <TraceTitle>Failed: {error}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <div sx={styles.frames}>
        <p sx={styles.error}>{error}</p>
        <ol>
          {frames.map((frame, index) => (
            <li
              key={index}
              sx={!frame.includes("node_modules") && styles.ownFrame}
            >
              {frame}
            </li>
          ))}
        </ol>
      </div>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted, so your own frames stand out.

## Frame Links

Turn your own frames into links that open the file at the line. Fold the framework frames into a collapsible line of their own, so the frames you can fix come first.

<!-- ::preview item="stack-trace-frames" height="380" combinations="react/base,react/aria" -->

## AI SDK

When a tool throws, its part is `output-error`. By default `errorText` is only the error message, with no frames. Return `error.stack` from `onError` in `toUIMessageStreamResponse` to send them.

```ts showLineNumbers title="app/api/chat/route.ts"
return result.toUIMessageStreamResponse({
  onError: (error) =>
    error instanceof Error ? (error.stack ?? error.message) : String(error),
})
```

A stack shows file paths from your server, so only send it in development.

```tsx showLineNumbers
if (part.state === "output-error") {
  const [error, ...frames] = part.errorText
    .split("\n")
    .map((line) => line.trim())

  return <TraceCollapsible>…</TraceCollapsible>
}
```

Map the other tool states as in [Tool](/docs/ai-elements/tool#states).

## Migrating from AI SDK Elements

If you added Stack Trace from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/stack-trace.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/stack-trace.tsx from AI SDK Elements to kirana/ui's Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx kirana-style ui add trace
2. Read https://ui.kirana.style/docs/ai-elements/react/base/stack-trace.md and build Stack Trace the same way.
3. Rebuild each part:
   - StackTrace renders a Trace with a TraceCollapsible. Keep trace, open, defaultOpen, onOpenChange and onFilePathClick, and the parsing.
   - StackTraceHeader renders a TraceCollapsibleTrigger with a TraceLine with status="error" and a TraceIcon.
   - StackTraceError renders a TraceTitle, like "Failed: TypeError: …". Keep StackTraceErrorType and StackTraceErrorMessage as spans inside it.
   - StackTraceContent renders a TraceCollapsibleContent.
   - StackTraceFrames renders the frames as a list in a muted, monospace block. Dim the frames from node_modules, and keep the file path buttons.
   - StackTraceExpandButton renders nothing, since the whole line opens the frames.
   - Buttons cannot sit inside a trigger. Render StackTraceActions and StackTraceCopyButton next to the TraceCollapsibleTrigger, not inside it.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/stack-trace.tsx from AI SDK Elements to kirana/ui's Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx kirana-style ui add trace
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/stack-trace.md and build Stack Trace the same way.
3. Rebuild each part:
   - StackTrace renders a Trace with a TraceCollapsible. Keep trace, open, defaultOpen, onOpenChange and onFilePathClick, and the parsing. Pass open, defaultOpen and onOpenChange to the TraceCollapsible as isExpanded, defaultExpanded and onExpandedChange.
   - StackTraceHeader renders a TraceCollapsibleTrigger with a TraceLine with status="error" and a TraceIcon.
   - StackTraceError renders a TraceTitle, like "Failed: TypeError: …". Keep StackTraceErrorType and StackTraceErrorMessage as spans inside it.
   - StackTraceContent renders a TraceCollapsibleContent.
   - StackTraceFrames renders the frames as a list in a muted, monospace block. Dim the frames from node_modules, and keep the file path buttons.
   - StackTraceExpandButton renders nothing, since the whole line opens the frames.
   - Buttons cannot sit inside a trigger. Render StackTraceActions and StackTraceCopyButton next to the TraceCollapsibleTrigger, not inside it.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
