<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import TodoRow from "../components/queue-descriptions/TodoRow.vue"

const styles = {
  trace: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
}

const todos: { title: string; description?: string; done: boolean }[] = [
  {
    title: "Write the migration guide",
    description: "Cover the renamed props and the new data attributes.",
    done: true,
  },
  { title: "Add a changeset", done: true },
  {
    title: "Fix the focus ring on the select trigger",
    description: "It is clipped by overflow-hidden on the field.",
    done: false,
  },
  { title: "Update the registry snapshots", done: false },
  {
    title: "Add tests for the combobox",
    description: "Typing, clearing and keyboard selection.",
    done: false,
  },
]

const pending = todos.filter((todo) => !todo.done)
const completed = todos.filter((todo) => todo.done)
</script>

<template>
  <div :sx="page.example">
    <Trace :sx="styles.trace">
      <TraceCollapsible default-open>
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
        <TraceCollapsibleContent keep-mounted>
          <Trace>
            <TodoRow v-for="todo in pending" :key="todo.title" :todo="todo" />
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
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
        <TraceCollapsibleContent keep-mounted>
          <Trace>
            <TodoRow v-for="todo in completed" :key="todo.title" :todo="todo" />
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  </div>
</template>
