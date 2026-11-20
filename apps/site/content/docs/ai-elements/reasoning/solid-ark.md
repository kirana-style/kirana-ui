# Reasoning

<!-- ::preview item="reasoning-demo" runtimes="ai-sdk,tanstack-ai" height="520" combinations="solid/ark" -->

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `TraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="solid/ark" runtimes="ai-sdk,tanstack-ai" -->

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

<!-- ::demo-source item="reasoning-demo" parts="true" combinations="solid/ark" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="reasoning-demo-tanstack-ai" parts="true" combinations="solid/ark" -->

<!-- ::end:runtime -->

## Duration

Neither runtime times reasoning. Measure it on the server, send it with the message, and show it in a `TraceDescription` after the title.

<!-- ::preview item="reasoning-duration" height="290" combinations="solid/ark" -->

## In a Chat

<!-- ::start:runtime ai-sdk -->

Render each `reasoning` part as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

Some models send several reasoning parts in one message. Each one is a line in the same `Trace`.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Render each `thinking` part, TanStack AI's reasoning, as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. A `thinking` part has no state of its own: the model is thinking while it is the last part of the message that streams. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

```ts showLineNumbers
const thinking = (message: UIMessage, part: ThinkingPart) =>
  message.parts.at(-1) === part
```

Some models send several thinking parts in one message. Each one is a line in the same `Trace`.

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
