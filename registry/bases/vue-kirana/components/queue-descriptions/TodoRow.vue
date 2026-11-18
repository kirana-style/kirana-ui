<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

export type Todo = { title: string; description?: string; done: boolean }

defineProps<{ todo: Todo }>()
</script>

<template>
  <TraceCollapsible v-if="todo.description">
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder
            v-if="todo.done"
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
          <IconPlaceholder
            v-else
            lucide="CircleIcon"
            tabler="IconCircle"
            hugeicons="CircleIcon"
            phosphor="CircleIcon"
            remixicon="RiCheckboxBlankCircleLine"
          />
        </TraceIcon>
        <TraceTitle>{{ todo.title }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>{{ todo.description }}</TraceCollapsibleContent>
  </TraceCollapsible>
  <TraceLine v-else>
    <TraceIcon>
      <IconPlaceholder
        v-if="todo.done"
        lucide="CircleCheckIcon"
        tabler="IconCircleCheckFilled"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleFill"
      />
      <IconPlaceholder
        v-else
        lucide="CircleIcon"
        tabler="IconCircle"
        hugeicons="CircleIcon"
        phosphor="CircleIcon"
        remixicon="RiCheckboxBlankCircleLine"
      />
    </TraceIcon>
    <TraceTitle>{{ todo.title }}</TraceTitle>
  </TraceLine>
</template>
