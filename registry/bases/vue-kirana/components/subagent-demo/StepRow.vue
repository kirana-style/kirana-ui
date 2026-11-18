<script setup lang="ts">
import { computed } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css, keyframes } from "@kirana-style/core"
import { space } from "../../../../core/scales"
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
