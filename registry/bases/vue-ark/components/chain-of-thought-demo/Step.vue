<script setup lang="ts">
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import StatusIcon from "./StatusIcon.vue"
import type { Status } from "./types"

/** A step: a line, or a collapsible line when it has `content` to show. */
defineProps<{
  title: string
  status?: Status
  defaultOpen?: boolean
  content: boolean
}>()
</script>

<template>
  <TraceCollapsible v-if="content" :default-open="defaultOpen">
    <TraceCollapsibleTrigger>
      <TraceLine :status="status">
        <TraceIcon>
          <StatusIcon :status="status" />
        </TraceIcon>
        <TraceTitle>{{ title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent><slot /></TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else :status="status">
    <TraceIcon>
      <StatusIcon :status="status" />
    </TraceIcon>
    <TraceTitle>{{ title }}</TraceTitle>
  </TraceLine>
</template>
