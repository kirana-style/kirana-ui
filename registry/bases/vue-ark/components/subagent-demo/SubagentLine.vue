<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
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
