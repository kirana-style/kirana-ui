# Reasoning

<!-- ::preview item="reasoning-demo" height="520" combinations="vue/reka" runtimes="ai-sdk,tanstack-ai" -->

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `TraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="vue/reka" -->

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

<!-- ::demo-source item="reasoning-demo" parts="true" combinations="vue/reka" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="reasoning-demo-tanstack-ai" parts="true" combinations="vue/reka" -->

<!-- ::end:runtime -->

## Duration

A reasoning part carries no duration, in the AI SDK or in TanStack AI. Measure it on the server, send it as message metadata, and show it in a `TraceDescription` after the title.

<!-- ::preview item="reasoning-duration" height="290" combinations="vue/reka" -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

Render each `reasoning` part as a line.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Render each `thinking` part as a line, its text in `content`. A `thinking` part has no state of its own: it is still streaming while it is the last part of the message the chat streams.

```ts showLineNumbers
const thinking = (message: UIMessage, part: UIMessage["parts"][number]) =>
  streaming(message) && message.parts.at(-1) === part
```

<!-- ::end:runtime -->

It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

Some models send several in one message. Each one is a line in the same `Trace`.

## API Reference

See [Trace](/docs/components/trace#api-reference).
