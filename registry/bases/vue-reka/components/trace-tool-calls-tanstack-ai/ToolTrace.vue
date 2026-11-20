<script setup lang="ts">
import type { UIMessage } from "@tanstack/ai-vue"
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
import { css } from "@kirana-style/core"

type Part = UIMessage["parts"][number]

const props = defineProps<{
  part: Extract<Part, { type: "tool-call" }>
  // TanStack AI keeps a call's result, its error and whether it was denied, in a part of its own.
  result?: Extract<Part, { type: "tool-result" }>
  live: boolean
}>()

const styles = {
  codeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

const command = computed(
  () => (props.part.input as { command?: string } | undefined)?.command
)
const denied = computed(() => props.result?.outcome === "denied")
const done = computed(
  () =>
    !denied.value &&
    (props.part.state === "complete" || props.part.state === "error")
)
const failed = computed(() => props.part.state === "error")
const output = computed(() =>
  props.part.state === "error"
    ? props.result?.error
    : props.part.state === "complete"
      ? (props.part.output as { stdout: string }).stdout
      : ""
)
</script>

<template>
  <TraceCollapsible v-if="done">
    <TraceCollapsibleTrigger>
      <TraceLine :status="failed ? 'error' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="CommandIcon"
            tabler="IconCommand"
            hugeicons="CommandIcon"
            phosphor="CommandIcon"
            remixicon="RiCommandLine"
          />
        </TraceIcon>
        <TraceTitle
          >{{ failed ? "Failed to run" : "Ran" }} {{ command }}</TraceTitle
        >
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap :sx="styles.codeBlockContent">{{
          output
        }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else-if="denied">
    <TraceIcon>
      <IconPlaceholder
        lucide="CommandIcon"
        tabler="IconCommand"
        hugeicons="CommandIcon"
        phosphor="CommandIcon"
        remixicon="RiCommandLine"
      />
    </TraceIcon>
    <TraceTitle>Denied {{ command }}</TraceTitle>
  </TraceLine>
  <TraceLine v-else :status="live ? 'running' : 'error'">
    <TraceIcon>
      <IconPlaceholder
        lucide="CommandIcon"
        tabler="IconCommand"
        hugeicons="CommandIcon"
        phosphor="CommandIcon"
        remixicon="RiCommandLine"
      />
    </TraceIcon>
    <TraceTitle
      >{{ live ? "Running" : "Failed to run" }} {{ command }}</TraceTitle
    >
  </TraceLine>
</template>
