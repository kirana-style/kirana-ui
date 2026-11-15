<script setup lang="ts">
import type { Todo } from "./types"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"

defineProps<{ todo: Todo; streaming: boolean }>()
</script>

<template>
  <TraceLine
    :status="streaming && todo.status === 'in_progress' ? 'running' : undefined"
  >
    <TraceIcon>
      <IconPlaceholder
        v-if="todo.status === 'completed'"
        lucide="CircleCheckIcon"
        tabler="IconCircleCheckFilled"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleFill"
      />
      <template v-else>
        <IconPlaceholder
          v-if="todo.status === 'in_progress'"
          lucide="CircleDotIcon"
          tabler="IconCircleDot"
          hugeicons="RecordIcon"
          phosphor="RecordIcon"
          remixicon="RiRecordCircleLine"
        />
        <IconPlaceholder
          v-else
          lucide="CircleIcon"
          tabler="IconCircle"
          hugeicons="CircleIcon"
          phosphor="CircleIcon"
          remixicon="RiCheckboxBlankCircleLine"
        />
      </template>
    </TraceIcon>
    <TraceTitle>
      {{ todo.content }}
    </TraceTitle>
  </TraceLine>
</template>
