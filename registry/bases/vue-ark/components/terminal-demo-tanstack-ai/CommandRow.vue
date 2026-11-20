<script setup lang="ts">
import { computed, ref } from "vue"
import type { ToolCall } from "./tools"
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
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"

const styles = {
  commandRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

function getTitle(part: ToolCall, running: boolean) {
  const command = part.input?.command

  if (part.state === "complete") {
    return part.output?.exitCode === 0
      ? `Ran ${command}`
      : `${command} exited with code ${part.output?.exitCode}`
  }

  return running ? `Running ${command}` : `Failed to run ${command}`
}

const { part, streaming, defaultOpen } = defineProps<{
  part: ToolCall
  output: string
  streaming: boolean
  defaultOpen?: boolean
}>()
const open = ref(defaultOpen)
const running = computed(
  () => streaming && part.state !== "complete" && part.state !== "error"
)
const failed = computed(
  () =>
    !running.value && (part.state !== "complete" || part.output?.exitCode !== 0)
)
</script>

<template>
  <TraceCollapsible
    :open="open ?? (running && output.length > 0)"
    @open-change="(details: { open: boolean }) => (open = details.open)"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : failed ? 'error' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="CommandIcon"
            tabler="IconCommand"
            hugeicons="CommandIcon"
            phosphor="CommandIcon"
            remixicon="RiCommandLine"
          />
        </TraceIcon>
        <TraceTitle>
          {{ getTitle(part, running) }}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap :sx="styles.commandRowCodeBlockContent">{{
          part.state === "error" ? part.errorText : output
        }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
