<script lang="ts">
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
  import {
    TraceCollapsible,
    TraceCollapsibleContent,
    TraceCollapsibleTrigger,
    TraceIcon,
    TraceLine,
    TraceTitle,
  } from "../../ui/trace"
  import { css } from "@kirana-style/core"
  import { space } from "../../../../core/scales"
  import StackTrace from "./StackTrace.svelte"
  import type { ToolPart } from "./types"

  let { part, streaming }: {
    part: ToolPart; streaming: boolean
  } = $props()

  const styles = {
    commandRowCodeBlockContent: css({
      maxHeight: { "*": null, base: space[64] },
    }),
  }

  const command = $derived.by(() => part.input?.command)
</script>

{#if part.state === 'output-error'}
  <StackTrace stack={part.errorText} />
{:else if part.state === 'output-available'}
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
        </TraceIcon>
        <TraceTitle>
          Ran {command}
        </TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap sx={styles.commandRowCodeBlockContent}>{part.output.stdout}</CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
{:else}
  <TraceLine status={streaming ? 'running' : 'error'}>
    <TraceIcon>
      <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
    </TraceIcon>
    <TraceTitle>
      {streaming ? "Running" : "Failed to run"} {command}
    </TraceTitle>
  </TraceLine>
{/if}
