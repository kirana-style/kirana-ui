<script setup lang="ts">
import { computed } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { space } from "../../../../core/scales"
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
import type { Part } from "./types"

const props = defineProps<{
  part: Extract<Part, { type: "tool-runCommand" }>
  streaming: boolean
  defaultOpen?: boolean
}>()

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  codeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  spin: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

const command = computed(() => props.part.input?.command)
const done = computed(
  () =>
    props.part.state === "output-available" ||
    props.part.state === "output-error"
)
const failed = computed(() => props.part.state === "output-error")
const errorText = computed(() =>
  props.part.state === "output-error" ? props.part.errorText : ""
)
const stdout = computed(() =>
  props.part.state === "output-available" ? props.part.output.stdout : ""
)
</script>

<template>
  <TraceCollapsible v-if="done" :default-open="defaultOpen">
    <TraceCollapsibleTrigger>
      <TraceLine :status="failed ? 'error' : undefined">
        <TraceIcon>
          <IconPlaceholder
            v-if="failed"
            lucide="CircleAlertIcon"
            tabler="IconExclamationCircle"
            hugeicons="AlertCircleIcon"
            phosphor="WarningCircleIcon"
            remixicon="RiErrorWarningLine"
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
        <TraceTitle
          >{{ failed ? "Failed to run" : "Ran" }} {{ command }}</TraceTitle
        >
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock v-if="failed" size="sm" variant="destructive">
        <CodeBlockContent wrap :sx="styles.codeBlockContent">{{
          errorText
        }}</CodeBlockContent>
      </CodeBlock>
      <CodeBlock v-else size="sm">
        <CodeBlockContent wrap :sx="styles.codeBlockContent">{{
          stdout
        }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else :status="streaming ? 'running' : 'error'">
    <TraceIcon>
      <IconPlaceholder
        v-if="streaming"
        lucide="LoaderCircleIcon"
        tabler="IconLoader2"
        hugeicons="Loading03Icon"
        phosphor="CircleNotchIcon"
        remixicon="RiLoader4Line"
        :sx="styles.spin"
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
    <TraceTitle
      >{{ streaming ? "Running" : "Failed to run" }} {{ command }}</TraceTitle
    >
  </TraceLine>
</template>
