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
} from "../../ui/trace"
import StatusIcon from "./StatusIcon.vue"
import type { Status, TaskPart } from "./types"

function getStepStatus(
  status: TaskPart["data"]["steps"][number]["status"],
  streaming: boolean
): Status {
  if (status === "done") {
    return undefined
  }

  return status === "running" && streaming ? "running" : "error"
}

const { task, streaming } = defineProps<{
  task: TaskPart["data"]
  streaming: boolean
}>()
const open = ref<boolean>()
const steps = computed(() =>
  task.steps.map((step) => ({
    title: step.title,
    status: getStepStatus(step.status, streaming),
  }))
)
const status = computed<Status>(() =>
  steps.value.some((step) => step.status === "error")
    ? "error"
    : steps.value.some((step) => step.status === "running")
      ? "running"
      : undefined
)
</script>

<template>
  <TraceCollapsible
    :open="open ?? status === 'running'"
    @open-change="(details: { open: boolean }) => (open = details.open)"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="status">
        <TraceIcon>
          <StatusIcon :status="status" />
        </TraceIcon>
        <TraceTitle>{{ task.title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keep-mounted>
      <Trace>
        <TraceLine
          v-for="step in steps"
          :key="step.title"
          :status="step.status"
        >
          <TraceTitle>{{ step.title }}</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
