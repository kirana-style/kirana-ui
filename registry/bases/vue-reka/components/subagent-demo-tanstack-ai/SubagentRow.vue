<script setup lang="ts">
import { computed } from "vue"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
} from "../../ui/trace"
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import StepRow from "./StepRow.vue"
import SubagentLine from "./SubagentLine.vue"
import type { ToolCall } from "./tools"

const styles = {
  subagentRowTraceCollapsibleContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
}

const { part, streaming } = defineProps<{
  part: ToolCall
  streaming: boolean
}>()
const done = computed(() => part.state === "complete")
const running = computed(
  () => !done.value && part.state !== "error" && streaming
)
const steps = computed(() => (done.value ? (part.output?.steps ?? []) : []))
const report = computed(() => (done.value ? (part.output?.report ?? "") : ""))
</script>

<template>
  <SubagentLine v-if="steps.length === 0" :done="done" :running="running" />
  <TraceCollapsible v-else default-open>
    <TraceCollapsibleTrigger>
      <SubagentLine :done="done" :running="running" />
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent
      keep-mounted
      :sx="styles.subagentRowTraceCollapsibleContent"
    >
      <Trace>
        <StepRow v-for="(step, index) in steps" :key="index" :step="step" />
      </Trace>
      <p v-if="report">{{ report }}</p>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
