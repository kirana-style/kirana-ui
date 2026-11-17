<script lang="ts" module>
  export type Todo = { title: string; description?: string; done: boolean }
</script>

<script lang="ts">
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import {
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"


  let { todo }: { todo: Todo } = $props()
</script>

{#if todo.description}
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          {#if todo.done}
            <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
          {:else}
            <IconPlaceholder lucide="CircleIcon" tabler="IconCircle" hugeicons="CircleIcon" phosphor="CircleIcon" remixicon="RiCheckboxBlankCircleLine" />
          {/if}
        </TraceIcon>
        <TraceTitle>
          {todo.title}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      {todo.description}
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine>
    <TraceIcon>
      {#if todo.done}
        <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
      {:else}
        <IconPlaceholder lucide="CircleIcon" tabler="IconCircle" hugeicons="CircleIcon" phosphor="CircleIcon" remixicon="RiCheckboxBlankCircleLine" />
      {/if}
    </TraceIcon>
    <TraceTitle>
      {todo.title}
    </TraceTitle>
  </TraceLine>
{/if}
