<script lang="ts">

  import type { Todo } from "./types"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    Trace,
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import TodoLine from "./TodoLine.svelte"

  let { todos, streaming }: { todos: Todo[]; streaming: boolean } = $props()

  const pending = $derived.by(() => todos.filter((todo) => todo.status !== "completed")
  )
  const completed = $derived.by(() => todos.filter((todo) => todo.status === "completed")
  )
</script>

<Trace>
  {#if pending.length > 0}
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder lucide="ListTodoIcon" tabler="IconChecklist" hugeicons="TaskDone01Icon" phosphor="CheckSquareOffsetIcon" remixicon="RiTaskLine" />
          </TraceIcon>
          <TraceTitle>
            {pending.length} to do
          </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          {#each pending as todo (todo.content)}
            <TodoLine todo={todo} streaming={streaming} />
          {/each}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  {/if}
  {#if completed.length > 0}
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon>
            <IconPlaceholder lucide="ListChecksIcon" tabler="IconListCheck" hugeicons="CheckListIcon" phosphor="ListChecksIcon" remixicon="RiListCheck3" />
          </TraceIcon>
          <TraceTitle>
            {completed.length} completed
          </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          {#each completed as todo (todo.content)}
            <TodoLine todo={todo} streaming={streaming} />
          {/each}
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  {/if}
</Trace>
