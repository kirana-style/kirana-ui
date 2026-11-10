<script setup lang="ts">
import { ref } from "vue"

import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
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
