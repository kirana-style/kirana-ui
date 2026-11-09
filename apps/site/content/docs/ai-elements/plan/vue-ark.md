# Plan

<!-- ::preview item="plan-demo" height="470" combinations="vue/ark" -->

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `Trace` with a `TraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/docs/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/docs/components/trace) component.

<!-- ::installation name="trace" combinations="vue/ark" -->

## Usage

```ts showLineNumbers
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

The example draws each step with its own parts, which you copy beside it:

```vue showLineNumbers title="PlanRow.vue"
<script setup lang="ts">
import IconPlaceholder from "@/lib/kirana/icons/IconPlaceholder.vue"
import { computed } from "vue"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export type Plan = {
  title: string
  steps: { title: string; status: "done" | "running" | "pending" }[]
}

const { plan, streaming } = defineProps<{ plan: Plan; streaming: boolean }>()
const done = computed(
  () => plan.steps.filter((step) => step.status === "done").length
)
const running = computed(() => streaming && done.value < plan.steps.length)
</script>

<template>
  <TraceCollapsible default-open>
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="RouteIcon"
            tabler="IconRoute"
            hugeicons="Route01Icon"
            phosphor="PathIcon"
            remixicon="RiRouteLine"
          />
        </TraceIcon>
        <TraceTitle>
          {{ plan.title }}
        </TraceTitle>
        <TraceDescription>
          {{ done }} of {{ plan.steps.length }} done
        </TraceDescription>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine
          v-for="step in plan.steps"
          :key="step.title"
          :status="
            step.status === 'pending'
              ? 'pending'
              : streaming && step.status === 'running'
                ? 'running'
                : undefined
          "
        >
          <TraceIcon>
            <IconPlaceholder
              v-if="step.status === 'done'"
              lucide="CircleCheckIcon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle01Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleFill"
            />
            <template v-else>
              <IconPlaceholder
                v-if="step.status === 'running'"
                lucide="CircleDotIcon"
                tabler="IconCircleDot"
                hugeicons="RecordIcon"
                phosphor="RecordIcon"
                remixicon="RiRecordCircleLine"
              />
              <IconPlaceholder
                v-else
                lucide="CircleIcon"
                tabler="IconCircle"
                hugeicons="CircleIcon"
                phosphor="CircleIcon"
                remixicon="RiCheckboxBlankCircleLine"
              />
            </template>
          </TraceIcon>
          <TraceTitle>
            {{ step.title }}
          </TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
```

## Details

Put a description above the steps, inside `TraceCollapsibleContent`.

<!-- ::preview item="plan-description" height="350" combinations="vue/ark" -->

## AI SDK

Stream the plan as a data part with a fixed `id`. The AI SDK replaces a data part with the same `id`, so it updates in place.

```ts showLineNumbers title="app/api/chat/route.ts"
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: "data-plan", id: "plan", data: { title, steps } })
  },
})
```

```ts showLineNumbers
const plan = message.parts.find((part) => part.type === "data-plan")
```

## API Reference

See [Trace](/docs/components/trace#api-reference).
