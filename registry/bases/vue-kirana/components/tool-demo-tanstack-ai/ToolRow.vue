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
import { css } from "@kirana-style/core"
import { space } from "../../../../core/scales"
import type { ToolCall } from "./tools"

const styles = {
  toolRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

const { part } = defineProps<{
  part: ToolCall
  streaming: boolean
  defaultOpen?: boolean
}>()
const command = computed(() => part.input?.command)
</script>

<template>
  <TraceCollapsible
    v-if="part.state === 'complete' || part.state === 'error'"
    :default-open="defaultOpen"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="part.state === 'error' ? 'error' : undefined">
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
          {{ part.state === "error" ? "Failed to run" : "Ran" }}
          {{ command }}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap :sx="styles.toolRowCodeBlockContent">{{
          part.state === "error" ? part.errorText : part.output?.stdout
        }}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else :status="streaming ? 'running' : 'error'">
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
      {{ streaming ? "Running" : "Failed to run" }} {{ command }}
    </TraceTitle>
  </TraceLine>
</template>
