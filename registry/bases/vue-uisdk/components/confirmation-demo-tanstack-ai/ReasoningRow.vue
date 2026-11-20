<script setup lang="ts">
import { ref } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css, keyframes } from "@kirana-style/core"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  reasoningRowIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
  reasoningRowTraceCollapsibleContent: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

defineProps<{ text: string; running: boolean }>()
// Open while it runs, until the reader opens or closes it.
const open = ref<boolean>()
</script>

<template>
  <TraceCollapsible
    :open="open ?? running"
    @open-change="(details: { open: boolean }) => (open = details.open)"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceIcon>
          <IconPlaceholder
            v-if="running"
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            :sx="styles.reasoningRowIconPlaceholder"
          />
          <IconPlaceholder
            v-else
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
        </TraceIcon>
        <TraceTitle>{{ running ? "Thinking" : "Thought" }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent :sx="styles.reasoningRowTraceCollapsibleContent">{{
      text
    }}</TraceCollapsibleContent>
  </TraceCollapsible>
</template>
