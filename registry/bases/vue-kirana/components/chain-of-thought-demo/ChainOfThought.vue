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
