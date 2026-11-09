# Reasoning

<!-- ::preview item="reasoning-demo" height="520" combinations="vue/ark" -->

Reasoning is a line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking itself sits inside, and the line can show how long it took.

Reasoning is built with `Trace` with a `TraceCollapsible` for the thinking.

## Installation

Reasoning is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="vue/ark" -->

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

```vue showLineNumbers title="ReasoningRow.vue"
<script setup lang="ts">
import { ref } from "vue"

import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { css } from "@kirana-style/core"

const styles = {
  reasoningRowTraceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

const { defaultOpen } = defineProps<{
  text: string
  running: boolean
  defaultOpen?: boolean
}>()
// Open while it runs, until the reader opens or closes it.
const open = ref(defaultOpen)
</script>

<template>
  <TraceLine v-if="text.length === 0" :status="running ? 'running' : undefined">
    <TraceTitle>{{ running ? "Thinking" : "Thought for 5s" }}</TraceTitle>
  </TraceLine>
  <TraceCollapsible
    v-else
    :open="open ?? running"
    @open-change="(details: { open: boolean }) => (open = details.open)"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceTitle>{{ running ? "Thinking" : "Thought for 5s" }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent :sx="styles.reasoningRowTraceCollapsibleContent">{{
      text
    }}</TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

## Duration

The AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `TraceDescription` after the title.

<!-- ::preview item="reasoning-duration" height="290" combinations="vue/ark" -->

## AI SDK

Render each `reasoning` part as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives, so there is nothing to open before the model has written anything. It opens while the model thinks and closes when it finishes. If the person opens or closes it, their choice wins. See [Open State](/docs/components/trace#open-state).

Some models send several reasoning parts in one message. Each one is a line in the same `Trace`.

## API Reference

See [Trace](/docs/components/trace#api-reference).
