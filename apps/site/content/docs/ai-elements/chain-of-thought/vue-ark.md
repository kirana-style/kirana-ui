# Chain of Thought

<!-- ::preview item="chain-of-thought-demo" height="610" combinations="vue/ark" -->

Chain of Thought is a summary line that expands into the steps an agent took. The summary says what happened, like "Researched in 3 steps". The steps sit inside it, each one a line of its own.

Chain of Thought is built with `Trace` with a `TraceCollapsible` for the summary.

## Installation

Chain of Thought is built with the [Trace](/docs/components/trace), [Code Block](/docs/components/code-block) and [Badge](/docs/components/badge) components.

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

```vue showLineNumbers title="ChainOfThought.vue"
<script setup lang="ts">
import { computed, ref } from "vue"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import StatusIcon from "./StatusIcon.vue"
import StepRow from "./StepRow.vue"
import type { Status, StepPart } from "./types"

const { steps, streaming, answering } = defineProps<{
  steps: StepPart[]
  streaming: boolean
  answering: boolean
}>()
const open = ref<boolean>()
const running = computed(() => streaming && !answering)
const failed = computed(
  () => steps.filter((part) => part.state === "output-error").length
)
const status = computed<Status>(() =>
  running.value ? "running" : failed.value > 0 ? "error" : undefined
)
</script>

<template>
  <Trace>
    <TraceCollapsible
      :open="open ?? running"
      @open-change="(details: { open: boolean }) => (open = details.open)"
    >
      <TraceCollapsibleTrigger>
        <TraceLine :status="status">
          <TraceIcon>
            <StatusIcon :status="status" />
          </TraceIcon>
          <TraceTitle>{{
            running
              ? "Researching"
              : `Researched in ${steps.length} steps${failed > 0 ? `, ${failed} failed` : ""}`
          }}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent keep-mounted>
        <Trace>
          <StepRow
            v-for="part in steps"
            :key="part.toolCallId"
            :part="part"
            :streaming="streaming"
          />
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

```vue showLineNumbers title="StepRow.vue"
<script setup lang="ts">
import { computed } from "vue"

import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import { Badge } from "@/components/ui/badge"
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace"
import { css } from "@kirana-style/core"
import { fontFamily, space } from "@/lib/kirana/scales"
import Step from "./Step.vue"
import type { Status, StepPart } from "./types"

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

const { part, streaming } = defineProps<{
  part: StepPart
  streaming: boolean
}>()
const status = computed<Status>(() =>
  part.state === "output-available"
    ? undefined
    : part.state === "output-error" || !streaming
      ? "error"
      : "running"
)
const verb = (running: string, done: string, failed: string) =>
  status.value === "running"
    ? running
    : status.value === "error"
      ? failed
      : done
const content = computed(
  () => part.state === "output-error" || part.state === "output-available"
)
</script>

<template>
  <Step
    v-if="part.type === 'tool-searchWeb'"
    :status="status"
    :content="content"
    :title="`${verb('Searching', 'Searched', 'Failed to search')} the web for ${part.input?.query}`"
  >
    <CodeBlock
      v-if="part.state === 'output-error'"
      size="sm"
      variant="destructive"
    >
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent">{{
        part.errorText
      }}</CodeBlockContent>
    </CodeBlock>
    <Trace v-else-if="part.state === 'output-available'">
      <a
        v-for="result in part.output.results"
        :key="result.url"
        :href="result.url"
        target="_blank"
        rel="noreferrer"
      >
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="GlobeIcon"
              tabler="IconGlobe"
              hugeicons="Globe02Icon"
              phosphor="GlobeIcon"
              remixicon="RiGlobeLine"
            />
          </TraceIcon>
          <TraceTitle>
            {{ result.title }}
            <span :sx="styles.stepRowSpan"> (opens in a new tab)</span>
          </TraceTitle>
          <TraceIcon>
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRightIcon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </TraceIcon>
        </TraceLine>
      </a>
    </Trace>
  </Step>
  <Step
    v-else-if="part.type === 'tool-readBuildLog'"
    :status="status"
    :content="content"
    default-open
    :title="`${verb('Reading', 'Read', 'Failed to read')} the build log for ${part.input?.deployment}`"
  >
    <CodeBlock
      v-if="part.state === 'output-error'"
      size="sm"
      variant="destructive"
    >
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent">{{
        part.errorText
      }}</CodeBlockContent>
    </CodeBlock>
    <CodeBlock v-else-if="part.state === 'output-available'" size="sm">
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent2">{{
        part.output.log
      }}</CodeBlockContent>
    </CodeBlock>
  </Step>
  <Step
    v-else
    :status="status"
    :content="content"
    :title="`${verb('Searching', 'Searched', 'Failed to search')} the code for ${part.input?.query}`"
  >
    <CodeBlock
      v-if="part.state === 'output-error'"
      size="sm"
      variant="destructive"
    >
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent">{{
        part.errorText
      }}</CodeBlockContent>
    </CodeBlock>
    <div v-else-if="part.state === 'output-available'" :sx="styles.stepRowDiv">
      <Badge
        v-for="file in part.output.files"
        :key="file"
        variant="secondary"
        :sx="styles.stepRowBadge"
      >
        {{ file }}
      </Badge>
    </div>
  </Step>
</template>
```

```vue showLineNumbers title="Step.vue"
<script setup lang="ts">
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
import StatusIcon from "./StatusIcon.vue"
import type { Status } from "./types"

/** A step: a line, or a collapsible line when it has `content` to show. */
defineProps<{
  title: string
  status?: Status
  defaultOpen?: boolean
  content: boolean
}>()
</script>

<template>
  <TraceCollapsible v-if="content" :default-open="defaultOpen">
    <TraceCollapsibleTrigger>
      <TraceLine :status="status">
        <TraceIcon>
          <StatusIcon :status="status" />
        </TraceIcon>
        <TraceTitle>{{ title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent><slot /></TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else :status="status">
    <TraceIcon>
      <StatusIcon :status="status" />
    </TraceIcon>
    <TraceTitle>{{ title }}</TraceTitle>
  </TraceLine>
</template>
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
