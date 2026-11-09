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
