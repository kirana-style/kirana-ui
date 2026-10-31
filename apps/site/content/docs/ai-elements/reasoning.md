---
title: Reasoning
description: Displays the agent's thinking as it streams.
section: ai-elements
variants: [react/base, react/aria]
keywords: [reasoning, ai elements, agent, chat]
---

# Reasoning

<!-- ::preview item="reasoning-demo" height="520" combinations="react/base,react/aria" -->

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `TraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="react/base,react/aria" -->

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
  thinking: css({ whiteSpace: "pre-wrap" }),
}

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Thought</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent sx={styles.thinking}>
      {text}
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Duration

The AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `TraceDescription` after the title.

<!-- ::preview item="reasoning-duration" height="290" combinations="react/base,react/aria" -->

```tsx showLineNumbers
<TraceLine>
  <TraceIcon>
    <CircleCheckIcon />
  </TraceIcon>
  <TraceTitle>Thought</TraceTitle>
  <TraceDescription>{seconds}s</TraceDescription>
</TraceLine>
```

## AI SDK

Render each `reasoning` part as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

<!-- ::start:only react/base -->

```tsx showLineNumbers
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  spinning: css({
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
  thinking: css({ whiteSpace: "pre-wrap" }),
}

function ReasoningLine({ text, running }: { text: string; running: boolean }) {
  const [open, setOpen] = React.useState<boolean>()

  const line = (
    <TraceLine status={running ? "running" : undefined}>
      <TraceIcon>
        {running ? (
          <LoaderCircleIcon {...styleProps(styles.spinning)} />
        ) : (
          <CircleCheckIcon />
        )}
      </TraceIcon>
      <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
    </TraceLine>
  )

  if (text.length === 0) {
    return line
  }

  return (
    <TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent sx={styles.thinking}>
        {text}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```tsx showLineNumbers
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  spinning: css({
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
  thinking: css({ whiteSpace: "pre-wrap" }),
}

function ReasoningLine({ text, running }: { text: string; running: boolean }) {
  const [open, setOpen] = React.useState<boolean>()

  const line = (
    <TraceLine status={running ? "running" : undefined}>
      <TraceIcon>
        {running ? (
          <LoaderCircleIcon {...styleProps(styles.spinning)} />
        ) : (
          <CircleCheckIcon />
        )}
      </TraceIcon>
      <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
    </TraceLine>
  )

  if (text.length === 0) {
    return line
  }

  return (
    <TraceCollapsible isExpanded={open ?? running} onExpandedChange={setOpen}>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent sx={styles.thinking}>
        {text}
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
```

<!-- ::end:only -->

```tsx showLineNumbers
<Trace>
  {message.parts
    .filter((part) => part.type === "reasoning")
    .map((part, index) => (
      <ReasoningLine
        key={index}
        text={part.text}
        running={streaming && part.state === "streaming"}
      />
    ))}
</Trace>
```

Some models send several reasoning parts in one message. Each one is a line in the same `Trace`.

## Migrating from AI SDK Elements

If you added Reasoning from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/reasoning.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Trace. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/reasoning.tsx from AI SDK Elements to kirana/ui's Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx kirana-style ui add trace
2. Read https://ui.kirana.style/docs/ai-elements/react/base/reasoning.md and build Reasoning the same way.
3. Rebuild each part:
   - Reasoning renders a Trace with a TraceCollapsible. Keep isStreaming, open, defaultOpen, onOpenChange and duration, and the useReasoning context.
   - ReasoningTrigger renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle. Set status="running" while isStreaming is true, instead of the Shimmer. The title reads "Thinking" while it streams, then the duration, like "Thought for 5s".
   - ReasoningContent renders a TraceCollapsibleContent. Keep Streamdown for the text.
   - Keep the open behavior: open while it streams, close when it finishes, unless the person opened or closed it.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/reasoning.tsx from AI SDK Elements to kirana/ui's Trace component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Trace: npx kirana-style ui add trace
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/reasoning.md and build Reasoning the same way.
3. Rebuild each part:
   - Reasoning renders a Trace with a TraceCollapsible. Keep isStreaming, open, defaultOpen, onOpenChange and duration, and the useReasoning context. Pass open, defaultOpen and onOpenChange to the TraceCollapsible as isExpanded, defaultExpanded and onExpandedChange.
   - ReasoningTrigger renders a TraceCollapsibleTrigger with a TraceLine, a TraceIcon and a TraceTitle. Set status="running" while isStreaming is true, instead of the Shimmer. The title reads "Thinking" while it streams, then the duration, like "Thought for 5s".
   - ReasoningContent renders a TraceCollapsibleContent. Keep Streamdown for the text.
   - Keep the open behavior: open while it streams, close when it finishes, unless the person opened or closed it.
4. Remove the imports the file no longer uses.
5. Run the type checker and fix any errors.
```

<!-- ::end:only -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
