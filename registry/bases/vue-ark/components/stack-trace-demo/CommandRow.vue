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
import StackTrace from "./StackTrace.vue"
import type { ToolPart } from "./types"

const styles = {
  commandRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
}

const { part } = defineProps<{ part: ToolPart; streaming: boolean }>()
const command = computed(() => part.input?.command)
</script>

<template>
  <StackTrace v-if="part.state === 'output-error'" :stack="part.errorText" />
  <TraceCollapsible v-else-if="part.state === 'output-available'">
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder
            lucide="CommandIcon"
            tabler="IconCommand"
            hugeicons="CommandIcon"
            phosphor="CommandIcon"
            remixicon="RiCommandLine"
          />
        </TraceIcon>
        <TraceTitle>Ran {{ command }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap :sx="styles.commandRowCodeBlockContent">{{
          part.output.stdout
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
