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

defineProps<{ text: string; running: boolean }>()

// Tailwind's `spin`.
const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  spin: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
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
        v-if="running"
        lucide="LoaderCircleIcon"
        tabler="IconLoader2"
        hugeicons="Loading03Icon"
        phosphor="CircleNotchIcon"
        remixicon="RiLoader4Line"
        :sx="styles.spin"
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
    <TraceTitle>{{ running ? "Thinking" : "Thought for 5s" }}</TraceTitle>
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
            v-if="running"
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            :sx="styles.spin"
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
        <TraceTitle>{{ running ? "Thinking" : "Thought for 5s" }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent :sx="styles.content">{{
      text
    }}</TraceCollapsibleContent>
  </TraceCollapsible>
</template>
