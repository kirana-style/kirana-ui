<script lang="ts">

  import type { Todo } from "./types"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"


  let { todo, streaming }: { todo: Todo; streaming: boolean } = $props()
</script>

<TraceLine status={streaming && todo.status === 'in_progress' ? 'running' : undefined}>
  <TraceIcon>
    {#if todo.status === 'completed'}
      <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" />
    {:else}
      {#if todo.status === 'in_progress'}
        <IconPlaceholder lucide="CircleDotIcon" tabler="IconCircleDot" hugeicons="RecordIcon" phosphor="RecordIcon" remixicon="RiRecordCircleLine" />
      {:else}
        <IconPlaceholder lucide="CircleIcon" tabler="IconCircle" hugeicons="CircleIcon" phosphor="CircleIcon" remixicon="RiCheckboxBlankCircleLine" />
      {/if}
    {/if}
  </TraceIcon>
  <TraceTitle>
    {todo.content}
  </TraceTitle>
</TraceLine>
