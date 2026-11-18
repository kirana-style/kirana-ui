<script setup lang="ts">
import { computed } from "vue"
import type { Todo } from "./types"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import TodoLine from "./TodoLine.vue"

const { todos } = defineProps<{ todos: Todo[]; streaming: boolean }>()
const pending = computed(() =>
  todos.filter((todo) => todo.status !== "completed")
)
const completed = computed(() =>
  todos.filter((todo) => todo.status === "completed")
)
</script>

<template>
  <Trace>
    <TraceCollapsible v-if="pending.length > 0" default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="ListTodoIcon"
              tabler="IconChecklist"
              hugeicons="TaskDone01Icon"
              phosphor="CheckSquareOffsetIcon"
              remixicon="RiTaskLine"
            />
          </TraceIcon>
          <TraceTitle> {{ pending.length }} to do </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TodoLine
            v-for="todo in pending"
            :key="todo.content"
            :todo="todo"
            :streaming="streaming"
          />
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
    <TraceCollapsible v-if="completed.length > 0" default-open>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder
              lucide="ListChecksIcon"
              tabler="IconListCheck"
              hugeicons="CheckListIcon"
              phosphor="ListChecksIcon"
              remixicon="RiListCheck3"
            />
          </TraceIcon>
          <TraceTitle> {{ completed.length }} completed </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <TodoLine
            v-for="todo in completed"
            :key="todo.content"
            :todo="todo"
            :streaming="streaming"
          />
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
