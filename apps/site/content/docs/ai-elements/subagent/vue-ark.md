# Subagent

<!-- ::preview item="subagent-demo" height="710" combinations="vue/ark" -->

Subagent is a line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found.

Subagent is built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Installation

Subagent is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

<!-- ::installation name="trace code-block badge" combinations="vue/ark" -->

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

export type SubagentMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    runCommand: {
      input: { command: string }
      output: { stdout: string }
    }
  }
>

export type SubagentPart = SubagentMessage["parts"][number]

export type ChatMessage = UIMessage<
  unknown,
  UIDataTypes,
  {
    researchAgent: {
      input: { task: string }
      output: SubagentMessage
    }
  }
>

export type Part = ChatMessage["parts"][number]
```

```vue showLineNumbers title="SubagentRow.vue"
<script setup lang="ts">
import { computed } from "vue"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
} from "@/components/ui/trace"
import { css } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import StepRow from "./StepRow.vue"
import SubagentLine from "./SubagentLine.vue"
import type { Part } from "./types"

const styles = {
  subagentRowTraceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
}

const { part, streaming } = defineProps<{
  part: Extract<Part, { type: "tool-researchAgent" }>
  streaming: boolean
}>()
const done = computed(
  () => part.state === "output-available" && !part.preliminary
)
const running = computed(
  () => !done.value && part.state !== "output-error" && streaming
)
const parts = computed(() =>
  part.state === "output-available" ? part.output.parts : []
)
const report = computed(() =>
  parts.value
    .map((agentPart) => (agentPart.type === "text" ? agentPart.text : ""))
    .join("")
)
</script>

<template>
  <SubagentLine v-if="parts.length === 0" :done="done" :running="running" />
  <TraceCollapsible v-else default-open>
    <TraceCollapsibleTrigger>
      <SubagentLine :done="done" :running="running" />
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent
      keep-mounted
      :sx="styles.subagentRowTraceCollapsibleContent"
    >
      <Trace>
        <template
          v-for="agentPart in parts"
          :key="
            agentPart.type === 'tool-runCommand'
              ? agentPart.toolCallId
              : undefined
          "
        >
          <StepRow
            v-if="agentPart.type === 'tool-runCommand'"
            :part="agentPart"
            :running="running"
          />
        </template>
      </Trace>
      <p v-if="report">{{ report }}</p>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

```vue showLineNumbers title="SubagentLine.vue"
<script setup lang="ts">
import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import { TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import { css, keyframes } from "@kirana-style/core"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  subagentRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

defineProps<{ done: boolean; running: boolean }>()
</script>

<template>
  <TraceLine :status="done ? undefined : running ? 'running' : 'error'">
    <TraceIcon>
      <IconPlaceholder
        v-if="done"
        lucide="CircleCheckIcon"
        tabler="IconCircleCheckFilled"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleFill"
      />
      <IconPlaceholder
        v-else-if="running"
        lucide="LoaderCircleIcon"
        tabler="IconLoader2"
        hugeicons="Loading03Icon"
        phosphor="CircleNotchIcon"
        remixicon="RiLoader4Line"
        :sx="styles.subagentRowIconPlaceholder"
      />
      <IconPlaceholder
        v-else
        lucide="CircleAlertIcon"
        tabler="IconExclamationCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
      />
    </TraceIcon>
    <TraceTitle>
      {{ done ? "Ran" : running ? "Running" : "Failed to run" }} the research
      subagent
    </TraceTitle>
  </TraceLine>
</template>
```

```vue showLineNumbers title="StepRow.vue"
<script setup lang="ts">
import { computed } from "vue"

import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import { css, keyframes } from "@kirana-style/core"
import { space } from "@/lib/kirana/scales"
import type { SubagentPart } from "./types"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

const { part } = defineProps<{
  part: Extract<SubagentPart, { type: "tool-runCommand" }>
  running: boolean
}>()
const command = computed(() => part.input?.command)
</script>

<template>
  <TraceCollapsible v-if="part.state === 'output-available'">
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
        </TraceIcon>
        <TraceTitle>Ran {{ command }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent">{{
          part.output.stdout
        }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else :status="running ? 'running' : 'error'">
    <TraceIcon>
      <IconPlaceholder
        v-if="running"
        lucide="LoaderCircleIcon"
        tabler="IconLoader2"
        hugeicons="Loading03Icon"
        phosphor="CircleNotchIcon"
        remixicon="RiLoader4Line"
        :sx="styles.stepRowIconPlaceholder"
      />
      <IconPlaceholder
        v-else
        lucide="CircleAlertIcon"
        tabler="IconExclamationCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
      />
    </TraceIcon>
    <TraceTitle>
      {{ running ? "Running" : "Failed to run" }} {{ command }}
    </TraceTitle>
  </TraceLine>
</template>
```

## Running

While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when the subagent finishes.

<!-- ::preview item="subagent-running" height="200" combinations="vue/ark" -->

## Details

Put the task the subagent was given at the top of the content, with its model and tools as [Badge](/docs/components/badge) items. Show how long it ran in a `TraceDescription` after the title.

<!-- ::preview item="subagent-details" height="340" combinations="vue/ark" -->

## AI SDK

With the AI SDK, a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Map each nested tool part as in [Tool](/docs/ai-elements/tool#states).

Each yield is a preliminary output: the part is `output-available` with `preliminary: true`. The final output replaces it, so check `preliminary` before you show "Ran".

| Tool part state                                         | `TraceLine` status                 | Title           |
| ------------------------------------------------------- | ---------------------------------- | --------------- |
| `input-streaming`, `input-available`                    | `"running"` while the chat streams | Running …       |
| `output-available` with `preliminary: true`             | `"running"` while the chat streams | Running …       |
| `output-available`                                      | none                               | Ran …           |
| `output-error`, or a running state after the chat stops | `"error"`                          | Failed to run … |

## API Reference

See [Trace](/docs/components/trace#api-reference).
