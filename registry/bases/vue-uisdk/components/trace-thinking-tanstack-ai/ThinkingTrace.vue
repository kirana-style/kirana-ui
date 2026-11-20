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
import { css } from "@kirana-style/core"

defineProps<{ text: string; running: boolean }>()

const styles = {
  content: css({
    whiteSpace: { "*": null, base: "pre-wrap" },
  }),
}

// Open while it runs, until the reader opens or closes it.
const open = ref<boolean>()
</script>

<template>
  <TraceLine v-if="text.length === 0" :status="running ? 'running' : undefined">
    <TraceIcon>
      <IconPlaceholder
        lucide="BrainIcon"
        tabler="IconBrain"
        hugeicons="AiBrainIcon"
        phosphor="BrainIcon"
        remixicon="RiBrainLine"
      />
    </TraceIcon>
    <TraceTitle>{{ running ? "Thinking" : "Thought" }}</TraceTitle>
  </TraceLine>
  <TraceCollapsible
    v-else
    :open="open ?? running"
    @open-change="(details: { open: boolean }) => (open = details.open)"
  >
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="BrainIcon"
            tabler="IconBrain"
            hugeicons="AiBrainIcon"
            phosphor="BrainIcon"
            remixicon="RiBrainLine"
          />
        </TraceIcon>
        <TraceTitle>{{ running ? "Thinking" : "Thought" }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent :sx="styles.content">{{
      text
    }}</TraceCollapsibleContent>
  </TraceCollapsible>
</template>
